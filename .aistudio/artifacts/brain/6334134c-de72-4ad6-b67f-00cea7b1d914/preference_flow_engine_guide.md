# Preference Flow Engine: Architecture, Controls & Output Reference

This document provides a comprehensive technical and functional reference for the **Preference Flow Engine** implemented within the Victorian State Election Simulator. It details the underlying mathematical model of Australian preferential voting (instant-runoff voting), the scoping and hierarchy rules, the input control surfaces, and how simulation outcomes are rendered across the application's visual components.

---

## 1. Overview and Core Purpose

In Australian elections for the Victorian Legislative Assembly (the lower house consisting of 88 single-member districts), members are elected using **full preferential voting** (Instant-Runoff Voting / IRV). Voters rank candidates sequentially (1, 2, 3, etc.). If no candidate achieves an absolute majority (greater than 50% of formal votes) on first preferences (primary votes), the lowest-ranking candidate is systematically eliminated, and their ballots are transferred to the continuing candidates according to the next available preferences marked on those ballots. This process repeats until only two candidates remain—producing the final **Two-Candidate Preferred (2CP)** result.

The Preference Flow Engine models this multi-stage elimination process dynamically for every one of Victoria's 88 electorates, allowing users to:
1. Model primary vote shifts across political parties (ALP, Coalition, Greens, One Nation, Independents/Others).
2. Adjust party-to-party preference transfer rates (e.g., the proportion of Green voters who favor Labor over the Coalition, or where One Nation ballots flow upon elimination).
3. Observe live downstream effects on individual district outcomes, 2CP margins, and statewide seat tallies.

---

## 2. Mathematical and Algorithmic Model

### 2.1 The Baseline Data Set
The engine is grounded in official election data from the **Victorian Electoral Commission (VEC)** for the 2022 state election, supplemented by **Australian Electoral Commission (AEC)** Victorian Senate preference transfer benchmarks where state district data did not have active minor parties (e.g., One Nation).

Every electorate contains:
- Total formal votes cast.
- Baseline primary votes and percentages across 5 party groupings:
  - **ALP**: Australian Labor Party
  - **COALITION**: Liberal Party and National Party combined
  - **GRN**: Australian Greens
  - **ON**: Pauline Hanson's One Nation
  - **OTH**: Independents, minor parties, and non-aligned candidates
- Historical preference transfer matrices capturing the percentage flow from each excluded party to every continuing party.

Where official historic distribution data is unavailable (e.g. seats won with over 50% primary vote), the engine applies the **Victorian Statewide Default Transfer Matrix**:

| Excluded Party | To Labor (ALP) | To Coalition (LIB/NAT) | To Greens (GRN) | To One Nation (ON) | To Others (OTH) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **ALP** | - | 28.0% | 20.0% | 24.0% | 28.0% |
| **COALITION** | 24.0% | - | 18.0% | 42.0% | 16.0% |
| **GRN** | 68.0% | 16.0% | - | 6.0% | 10.0% |
| **ON** | 24.0% | 68.0% | 4.0% | - | 4.0% |
| **OTH** | 24.0% | 30.0% | 8.0% | 38.0% | - |

### 2.2 Instant-Runoff Simulation Algorithm (`runInstantRunoff`)

The engine executes the elimination simulation in deterministic rounds:

```
[Stage 0: 1st Preferences]
       │
       ▼
[Find candidate with lowest active votes]
       │
       ▼
[Is active candidate count > 2?]
  ├─► YES: [Exclude lowest candidate]
  │         │
  │         ├─► Extract outgoing transfer weights from matrix
  │         ├─► Filter weights to active continuing candidates only
  │         ├─► Normalize weights to sum to 100%
  │         ├─► Transfer votes = EliminatedVotes * (Weight / TotalActiveWeight)
  │         ├─► Add transferred votes to continuing candidate totals
  │         └─► Record elimination stage & flow ribbons ──► (Loop back)
  │
  └─► NO:  [Final Two Candidates (2CP)]
            │
            ├─► Candidate with highest vote = Winner
            ├─► Calculate 2CP winning margin
            └─► Return complete simulation stages and outcome
```

#### Detailed Step-by-Step Mechanics:
1. **Stage 0 (Primary Votes)**:
   - Aggregates current primary votes for active parties (those with greater than 0 votes).
   - Calculates first-preference percentages against the total formal vote count.
2. **Exclusion Loop**:
   - In each round, candidates are sorted in ascending order of current votes.
   - The lowest candidate is identified as the eliminated party (`eliminatedParty`).
   - The remaining active candidates form `remainingParties`.
3. **Dynamic Preference Normalization**:
   - Because ballots cannot flow to candidates who have already been eliminated in earlier rounds or who were not active, raw transfer flow percentages must be re-weighted.
   - If candidate E is eliminated, and candidates A, B, and C remain:
     - Raw weights: W(A), W(B), W(C).
     - Total surviving weight: TotalWeight = W(A) + W(B) + W(C).
     - Normalized transfer rate to A: TransferRate(A) = W(A) / TotalWeight.
     - Transferred votes to A: TransferredVotes(A) = EliminatedVotes(E) * TransferRate(A).
   - If TotalWeight equals 0 (e.g. no flows defined), the engine falls back to an equal distribution: 100% / number of remaining candidates.
4. **Ribbon & Stage Recording**:
   - For every remaining party, the engine tracks two distinct flows:
     - **Retained Votes**: The votes the candidate already accumulated entering this round (`isRetained: true`).
     - **Transferred Votes**: The new votes received from the excluded candidate (`isRetained: false`, with exact vote count and transfer percentage).
   - This metadata directly drives the interactive Sankey visualization.
5. **Final Two-Candidate Preferred (2CP) Resolution**:
   - When exactly two active candidates remain, the candidate with the highest progressive vote is declared the **Winner**, and the other is the **Runner-Up**.
   - The winning margin is calculated as:
     `Margin (%) = ((WinnerVotes - RunnerUpVotes) / (WinnerVotes + RunnerUpVotes)) * 100`

### 2.3 One Nation Dynamic Injection
In the 2022 state election, One Nation did not contest every district. If a user increases One Nation's primary vote in a district where One Nation had 0 historical votes in 2022:
- The engine detects `isOnActiveInSeat = true`.
- If an eliminated party's historical matrix has 0% flow to One Nation, the engine injects the AEC Victorian Senate preference benchmark rate for One Nation (e.g., 42% of Liberal preferences flow to One Nation, 38% of Other preferences flow to One Nation).
- Other outgoing rates from that party are proportionally scaled down by `(100 - OneNationBenchmark) / CurrentSum` so that the total outgoing flow remains exactly 100%.

---

## 3. Scope Hierarchy and Override Cascade

The simulator supports targeted adjustments at three different levels of granularity. The simulation engine resolves these deltas using a strict precedence cascade:

```
┌────────────────────────────────────────────────────────┐
│               1. MANUAL SEAT OVERRIDE                  │
│       (Locks seat directly to selected party)          │
└──────────────────────────┬─────────────────────────────┘
                           │ If not overridden
                           ▼
┌────────────────────────────────────────────────────────┐
│             2. DISTRICT-LEVEL DELTAS                   │
│   (Adjustments applied specifically to single seat)    │
└──────────────────────────┬─────────────────────────────┘
                           │ If zero / not set
                           ▼
┌────────────────────────────────────────────────────────┐
│              3. REGIONAL DELTAS                        │
│   (Adjustments applied to all seats in a region)       │
└──────────────────────────┬─────────────────────────────┘
                           │ Combined with
                           ▼
┌────────────────────────────────────────────────────────┐
│             4. STATEWIDE GLOBAL DELTAS                 │
│  (Adjustments applied across all 88 Victorian seats)   │
└────────────────────────────────────────────────────────┘
```

When calculating adjusted primary votes for any given party P in electorate E:
`Delta(P) = SeatDelta(P) + RegionDelta(P) + GlobalDelta(P)`
`AdjustedVotes(P) = max(0, BaselineVotes(P) + round((Delta(P) / 100) * TotalFormalVotes))`

For transfer flow overrides, the precedence is:
`ActiveFlow(From -> To) = SeatOverride ?? RegionOverride ?? GlobalOverride ?? BaselineFlow`

---

## 4. Control Interfaces: How the Engine Is Controlled

The user can steer and manipulate the Preference Flow Engine through multiple interactive control surfaces in the application:

### 4.1 Tab 1: Preference Flow Simulator (Sankey Diagram Interface)
Located under the **Pref Flow** tab in the top navigation of the controls panel:
- **Interactive Sankey Round 1 Primary Badges**:
  - Each party node in Round 1 has a draggable numerical percentage badge.
  - Clicking/touching and dragging vertically shifts that party's primary vote delta up or down at a sensitivity of 0.1% per pixel.
  - As primary votes change, the entire multi-stage elimination flow recomputes immediately in real time.
- **Draggable Transfer Ribbon Handles**:
  - The inter-stage ribbon connectors display circular percentage pills representing the flow from the excluded candidate to continuing candidates.
  - Dragging a transfer handle vertically adjusts that specific party-to-party transfer rate from 0% to 100%.
- **Party Restoration Buttons (+ ON, + GRN, etc.)**:
  - If a party has 0% primary vote in a district or drops to 0%, a restoration pill appears at the bottom of the Sankey canvas.
  - Clicking this button re-introduces the party with a 1.0% primary vote share, deducting that 1.0% evenly from active parties to maintain a balanced 100% total vote pool.
- **Reset Flows Button**:
  - Resets all primary deltas and custom transfer overrides in the active scope back to official VEC 2022 baselines.
- **Clear Selection**:
  - When editing a specific district or region, clicking "Clear Selection" returns the Sankey scope to Victoria State-Wide (All 88 Districts).

### 4.2 Tab 2: Party Primary Swings (Progress Bar Slider)
Located under the **Party Swings** tab:
- **Segmented Stacked Primary Vote Bar**:
  - Visualizes all 6 party groupings (GRN, ALP, IND, LIB, NAT, ON) in a single horizontal proportional bar totaling 100%.
  - Supports horizontal side-scrolling on narrow screens with touch pan.
- **Vertical Drag Handles**:
  - Clicking or touching any party segment and dragging upward increases that party's vote; dragging downward decreases it.
- **Auto-Rebalance Toggle (ON / OFF)**:
  - When **ON**: Adjusting any party automatically redistributes the difference proportionally across all other parties, guaranteeing that the total primary vote remains locked at exactly 100.0%.
  - When **OFF**: Parties can be tuned independently.
- **Published Polling and Quick Scenario Tiles**:
  - One-click presets calibrated against major published opinion polls and electoral hypotheses:
    - **Roy Morgan (October 2026)**: LNP 29.5%, ALP 22.5%, ON 22.0%, Greens 12.5%, Other 13.5%.
    - **Newspoll (October 2026)**: ALP 24.0%, L/NP 33.0%, GRN 14.0%, ON 20.0%, Ind/Other 9.0%.
    - **RedBridge / Herald Sun (Dec 2024)**: Coalition 40.0%, Labor 30.0%, Greens 13.0%, ON 6.0%.
    - **Resolve Strategic / The Age (Nov 2024)**: Coalition 38.0%, Labor 27.0%, Greens 13.0%, Ind/Other 16.0%, ON 6.0%.
    - **Freshwater Strategy / AFR (Oct 2024)**: Coalition 41.0%, Labor 31.0%, Greens 12.0%, ON 5.0%, Ind/Other 11.0%.
    - **Labor Rebound & Consolidation**: Labor 39.0%, Coalition 32.0%, Greens 12.0%.
    - **Greens & Community Ind Surge**: Progressive inner-metro surge with Greens and Teals gaining +4.0%.
    - **One Nation Regional Breakthrough**: +8.0% surge across regional Victoria and outer-metro mortgage belts.
- **"Load into Preference Flow" Button**:
  - Bridges the Party Primary Swings into Tab 1 by converting party deltas directly into `PreferenceModelDeltas` and switching the view to the Sankey engine.

### 4.3 Tab 3: Three-Way Swing Pad
Located under the **3-Way Swing** tab:
- **Barycentric Partisan Triangle**:
  - Allows simultaneous balancing of Labor (left vertex), Coalition (right vertex), and One Nation (top vertex).
  - Dragging the cursor calculates weighted two-party preferred and minor-party swing vectors across all electorates.
- **Independent Greens Swing Drag Handle**:
  - Adjusts progressive Greens leakage and independent minor party share.

### 4.4 Direct District-Level Paintbrush and Overrides
- Selecting a party from the "Paintbrush" selector allows the user to click any seat on the map or in the hemicycle to manually force that seat to a specific party, bypassing automated flow calculations.
- Overridden seats display an active override indicator and can be reset individually or cleared globally.

### 4.5 Shareable Serialization Strings (Codecs)
The engine supports exporting and importing the exact simulation state via compressed string formats:
- **Overrides String (`VIC2026:...`)**: 88-character string encoding the winning party of every seat in alphabetical order.
- **Preference Model String (`PREF1:...`)**: Encodes primary deltas and custom transfer matrix overrides for statewide, regional, and district scopes.
- **Party Swings Model String (`SWING1:...`)**: Encodes primary percentage swings and active presets.

---

## 5. Output Displays: How Results Are Rendered

The results calculated by the Preference Flow Engine are continuously and reactively propagated across the entire UI:

### 5.1 The Parliament Hemicycle
- **88-Seat Semi-Circular Layout**:
  - Electorates are mapped into 4 concentric semi-circular arches (16 seats inner, 20 seats second row, 24 seats third row, 28 seats outer row = 88 total).
  - Ordered ideologically from political left to right:
    `Greens (Green) -> Labor (Red) -> Independent/Others (Slate) -> Liberal (Blue) -> National (Teal) -> One Nation (Orange)`
- **Majority Threshold & Tally Indicator**:
  - Displays the 45-seat threshold required for a governing majority in the Victorian Legislative Assembly.
  - Shows live seat counts for each party alongside net seat gains or losses relative to the 2022 election baseline (e.g. `ALP: 37 (-19)`, `LIB: 33 (+14)`, `ON: 1 (+1)`).
- **Interactive Highlighting**:
  - Hovering over a dot highlights the seat on the map and displays a quick tooltip with seat name, winning party, and margin.
  - Clicking a dot focuses that electorate as the active target in the engine.

### 5.2 Interactive Geographic Electorate Map
- **Vector Choropleth of Victoria**:
  - Fully interactive SVG rendering of all 88 Legislative Assembly district boundaries.
  - Each district polygon is filled with the color of its projected winning party.
  - Visual opacity and border stylings reflect margin safety:
    - **Ultra-Marginal (<2%)**: High contrast outline, alert status.
    - **Marginal (2-6%)**: Moderate saturation.
    - **Fairly Safe (6-12%)**: Standard fill.
    - **Very Safe (>12%)**: Deep saturation.
- **Synchronized Tooltips**:
  - Hovering displays the district name, sitting member, projected winner, margin, and status (e.g., "Retained" or "Gain from Labor").

### 5.3 Interactive Sankey Flow Diagram (Detailed Visualization)
When viewing Tab 1, the Sankey diagram provides a full visual audit of the instant-runoff process:
- **Vertical Columns as Elimination Stages**:
  - Column 0: 1st Preferences (Primary votes).
  - Columns 1 through N-1: Elimination rounds displaying the exclusion of the lowest candidate (`Excl: Party`).
  - Final Column: Final Two-Candidate Preferred (2CP) showdown.
- **Cubic Bézier Flow Ribbons**:
  - Ribbons link continuing candidates from stage to stage, visually conveying vote flow.
  - Ribbons retain source party colors at their start and transition into recipient colors at their target.
  - Hovering over any ribbon reveals an information card detailing the source, destination, exact vote count, and percentage of the flow.
- **Embedded Percent Labels**:
  - Each node bar clearly displays its progressive vote percentage at every round.
- **Outcome Summary Card**:
  - Prominently announces the projected 2CP winner and margin percentage, with side-by-side vote shares of the final two candidates.

### 5.4 Electorate Detail and Demographics Panel
When an individual district is selected:
- **Projected Result Banner**:
  - Shows winning party badge, margin percentage, margin classification (e.g. "Marginal (2-6%)"), and status ("Labor Hold", "Coalition Gain", etc.).
- **Manual Override Controls**:
  - Allows locking or unlocking the seat to any party.
- **ABS Census Demographics Integration**:
  - Provides official demographic profiles (median age, weekly income, housing tenure, education, religion).
  - Identifies active demographic swing drivers based on local demographic variances from the Victorian state average.

### 5.5 Pendulum / Electorate List Table
- **Margin Pendulum**:
  - Displays all 88 electorates sorted by margin.
  - Divided into party columns (Labor seats, Coalition seats, Greens seats, Independent seats, One Nation seats).
  - Color-coded indicator tags mark flipped seats, defensive vulnerable seats, and safe strongholds.
- **Filtering & Search**:
  - Filterable by geographic region (Northern Metro, Western Victoria, etc.), party, or margin category.

---

## 6. Summary of Key Engine File Locations

| File | Purpose |
| :--- | :--- |
| `src/preferenceData.ts` | Complete 2022 VEC baseline dataset for all 88 electorates and statewide default transfer matrix. |
| `src/utils/preferenceEngine.ts` | Core instant-runoff logic (`runInstantRunoff`), scope aggregation, and electorate simulation. |
| `src/components/PreferenceSankey.tsx` | SVG Sankey visualization, draggable primary badges, draggable transfer handles, and party restoration. |
| `src/components/PartySwingBar.tsx` | Segmented primary swing slider, auto-rebalance math, and polling presets. |
| `src/data/partyWavePresets.ts` | Published polling presets (Newspoll, Roy Morgan, RedBridge, Resolve, Freshwater). |
| `src/utils/preferenceString.ts` | Serialization and deserialization of preference model deltas and transfer overrides. |
| `src/components/ParliamentHemicycle.tsx` | 88-seat semi-circular parliament visualization with majority line and seat counters. |
| `src/components/ElectorateMap.tsx` | Interactive SVG choropleth map with live district coloring and paintbrush support. |
| `src/components/ElectorateDetail.tsx` | District demographic breakdowns, margin badges, and manual override panel. |
