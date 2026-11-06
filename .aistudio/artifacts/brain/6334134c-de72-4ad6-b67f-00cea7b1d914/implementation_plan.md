# Implementation Plan: Collapsible Preference Distribution Matrix

Add a collapsible reference matrix beneath the Sankey diagram in the Preference Flow section. The matrix displays the baseline preference transfer distributions between all Victorian political parties for the currently active scope (Statewide, Region, or specific Electorate), color-coded by empirical data source with visual indicators for active flows and manual user overrides.

---

## User Review & Confirmed Clarifications
Based on user feedback:
1. **Positioning**: Placed below the Sankey diagram and transfer flow sliders, defaulted to hidden (`isOpen: false`).
2. **Color Coding**: Cell background tints reflect the provenance of each preference flow (Official VEC 2022 count, AEC Senate benchmark fallback, Statewide model average, and User Overrides).
3. **Interactivity**: Clean, view-only reference table displaying transfer percentages (`%`), highlighting active flows participating in the current Sankey elimination rounds, with an override indicator/tint whenever the user has customized that specific transfer flow.

---

## Architecture & Layout

```
+-------------------------------------------------------------------------------+
|  PREFERENCE FLOW SIMULATOR (Sankey Diagram & Step-by-Step Flow)              |
+-------------------------------------------------------------------------------+
|  [Transfer Flow Sliders / Manual Overrides]                                  |
+-------------------------------------------------------------------------------+
|  ▼ [BUTTON] Baseline Preference Distribution Matrix (Scope: Electorate / State)|
+-------------------------------------------------------------------------------+
|  [COLLAPSIBLE PANEL - Default Closed]                                         |
|                                                                               |
|  Source Legend:                                                               |
|  [■ Emerald] VEC 2022 Official Count   [■ Blue] AEC Senate Benchmark Fallback  |
|  [■ Slate] Model Regional/State Average [■ Amber] Active User Override         |
|  [● Ring/Badge] Active in current Sankey elimination                          |
|                                                                               |
|  +--------------------+-------+-------+-------+-------+-------+               |
|  | From Party \ To    |  ALP  |  COA  |  GRN  |  ONP  |  OTH  |               |
|  +--------------------+-------+-------+-------+-------+-------+               |
|  | Greens (GRN)       | 78.4% | 12.1% |   —   |  2.5% |  7.0% |               |
|  | One Nation (ONP)   | 18.2% | 61.5% |  4.3% |   —   | 16.0% |               |
|  | Other / Ind (OTH)  | 42.0% | 38.0% | 12.0% |  8.0% |   —   |               |
|  | Coalition (COA)    | 22.1% |   —   |  8.4% | 35.2% | 34.3% |               |
|  | Labor (ALP)        |   —   | 19.5% | 58.2% |  5.1% | 17.2% |               |
|  +--------------------+-------+-------+-------+-------+-------+               |
|                                                                               |
|  * Note: Rows sum to 100% of preferences distributed when that party is       |
|    excluded. Percentages reflect baseline flows; overridden flows show both   |
|    baseline and active values.                                                |
+-------------------------------------------------------------------------------+
```

---

## Data Source Classification Hierarchy

For each cell `[fromParty][toParty]`:

| Source ID | Provenance | UI Tint Style | Trigger Condition |
| :--- | :--- | :--- | :--- |
| **`USER_OVERRIDE`** | User manual adjustment | `bg-amber-950/40 border-amber-500/50 text-amber-200` | User has touched the transfer slider in `preferenceDeltas.transferOverrides[fromParty][toParty]` |
| **`VEC_OFFICIAL`** | 2022 Full VEC Count | `bg-emerald-950/30 border-emerald-500/30 text-emerald-200` | Seat scope active AND `PREFERENCE_DATA[seatId].hasOfficialDistribution === true` AND seat has recorded flow |
| **`AEC_BENCHMARK`** | 2022 AEC Vic Senate | `bg-sky-950/30 border-sky-500/30 text-sky-200` | One Nation flows (`ONP`) or synthetic benchmark injection where VEC had no 2022 candidate |
| **`MODEL_AVERAGE`** | Statewide / Regional Avg | `bg-slate-800/40 border-slate-700/40 text-slate-300` | Regional / Statewide aggregate scope OR unrecorded minor party baseline fallback |

---

## Proposed Changes

### 1. `src/components/PreferenceDistributionMatrix.tsx` (New Component)
Create a dedicated, modular component:
- **Props**:
  - `seatId: string | null` (current selected seat if any)
  - `regionName: string | null` (current selected region if any)
  - `activeFlows: Set<string>` (flows currently active in the Sankey visualization, e.g. `"GRN->ALP"`, `"ONP->COA"`)
  - `transferOverrides: Record<string, Record<string, number>>` (active manual overrides)
  - `seatDistributionData?: ElectoratePreferenceData`
- **Features**:
  - Collapsible trigger with clear arrow toggle, seat/region scope label, and summary badge.
  - Interactive Legend with count of how many flows derive from each source.
  - Clean HTML `table` with sticky header, row headers colored by party theme, diagonal cells muted (`—`), tabular numbers (`tabular-nums font-mono font-medium`).
  - Active flow indicator: subtle halo or badge indicating this flow is currently executing in the active round of preference exclusions.
  - Tooltips or subtitles showing baseline vs overridden percentage.

### 2. Integration into `src/components/PreferenceSankey.tsx`
- Import `PreferenceDistributionMatrix`.
- Place the matrix directly below the Sankey SVG and transfer controls container.
- Compute the set of currently active elimination transfer pairs from `sankeyData.links` (e.g. `source.party -> target.party`) to pass to `activeFlows`.
- Pass current `selectedElectorateId`, `selectedRegion`, and `preferenceDeltas.transferOverrides`.

### 3. Verification & Testing
- Test across all three scopes:
  1. **Single Seat with VEC Official data** (e.g. Pascoe Vale, Northcote, Hawthorn): Verify `VEC_OFFICIAL` tags.
  2. **Single Seat with AEC benchmark** (e.g. seats where One Nation ran or didn't run in 2022): Verify `AEC_BENCHMARK` tags.
  3. **Region / Statewide scope**: Verify `MODEL_AVERAGE` default tags.
- Test manual override sliders: Adjust a transfer flow slider and verify the cell updates to `USER_OVERRIDE` (amber tint) with clear baseline vs new value display.
- Run `compile_applet` and `lint_applet` to guarantee type safety and zero linter warnings.
