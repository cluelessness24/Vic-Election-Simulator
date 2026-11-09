# Collate Federal Senate Booth Preferences into Victorian State Seats

Incorporate federal Senate booth-level preference transfer data into Victorian State Assembly districts, using booth geolocation coordinates mapped into state boundaries to eliminate data gaps in seats without historical VEC candidate exclusions, and provide a toggle to switch between VEC-first and Senate-first preference models.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural decisions were confirmed in Phase 1:

- **Data Source**: Ingest AEC Federal Senate booth-level preference distribution dataset (`AEC 2025 federal election repository data`, with structural schema continuity for certified distributions).
- **Spatial Collation**: Match federal polling booths to Victorian State Assembly districts by evaluating **physical booth geolocation coordinates (`Latitude`, `Longitude`)** within state district geographic boundaries.
- **Simulator Behavior**: Add a dual-mode toggle in the Preference Flow Simulator allowing users to switch between:
  1. `VEC-First (Senate Fallback)`: Uses official VEC 2022 distribution tables where available, automatically filling historical exclusion gaps (such as Labor in Western Metro) with the seat's booth-collated Senate flow.
  2. `Senate-First Model`: Uses booth-collated Senate preference flows across all 88 districts for consistent cross-election comparisons.

---

## 1. Overview & Core Concept

Under Victorian preferential voting, candidates who finish in the top 2 never have their ballot preferences distributed. In seats like Western Metropolitan where Labor held every district in 2022, no empirical VEC ballot exclusion count exists for Labor candidates.

Federal Senate voting requires voters to rank parties 1 to 6+ Above the Line without Group Voting Tickets, creating a rich empirical record of voter preference choices down to the individual polling booth. By collating federal Senate booth transfers within each of the 88 state electoral districts, we generate high-resolution local preference transfer profiles (ALP $\to$ GRN/LIB, LIB $\to$ ALP/ON, GRN $\to$ ALP/LIB, ON $\to$ LIB/ALP) for every district in Victoria.

---

## 2. User Experience & Visual Design

### Header Toggle in Preference Flow Section
Add a toggle control in the header bar of `PreferenceSankey.tsx`:
- **Modes**:
  - `VEC Official (Senate Gaps)`: VEC 2022 count first; fills missing exclusions with seat-specific Senate data.
  - `Federal Senate Benchmark`: Direct seat-by-seat Senate preference model.
- **Visual Design**:
  - Compact segment toggle (`h-8`, subtle border, active tab highlighted with `bg-white/10 text-white font-semibold`).
  - Contextual badge showing active transfer mode.

### Matrix Data Source Representation
In `PreferenceDistributionMatrix.tsx`:
- Cells derived from Senate booth collation display the **Purple** tint (`bg-[#3B0764]/80 text-purple-100 border-[#9333EA]/70`) with the `AEC` source tag.
- Cells derived from VEC counts display the **Maroon** tint (`bg-[#5B0E1E]/80 text-rose-100 border-[#9E2A3B]/80`) with the `VEC` tag.
- Cells modified by user display the **Amber** tint (`bg-amber-600/30 text-amber-200 border-amber-400`).

---

## 3. Key Product Decisions & Trade-Offs

### 1. Pre-Collated Static Data Module (`src/senatePreferenceData.ts`)
- **Chosen Approach**: Build a Node collation script (`scripts/collate_senate_booths.cjs`) that parses AEC polling place coordinates and Senate distribution tables, spatial-joins them to the 88 Victorian districts, and outputs a clean, typed TypeScript dataset (`src/senatePreferenceData.ts`).
- **Why**: Keeps client-side bundle lightweight, avoids browser CORS/network failures against federal government servers, and guarantees zero runtime lag during interactive slider adjustments.

### 2. Point-in-Polygon Booth Geographic Concordance
- **Chosen Approach**: Test booth coordinates `(lat, lon)` against the 88 Legislative Assembly district bounding boxes and centroid Voronoi boundaries.
- **Why**: Many federal divisions (e.g. *Gellibrand*, *Maribyrnong*, *Melbourne*) cross multiple state seats (*Footscray*, *Williamstown*, *Essendon*, *Niddrie*). Using exact physical booth coordinates assigns votes to the actual state electorate where the community voted.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────┐
│  AEC Federal Senate Booth Data & Polling Locations     │
│  - Polling place coordinates (lat, lon)                │
│  - Senate group/party preference transfers             │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│  Spatial Collation Pipeline (scripts/collate_...)      │
│  - Geographic match: Booth Lat/Lon -> State District   │
│  - Vote-weighted transfer aggregation by party pair    │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│  src/senatePreferenceData.ts (Typed Static Model)       │
│  - 88 Seat records: { ALP, COALITION, GRN, ON, OTH }   │
│  - Cross-party transfer rates for each state seat      │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│  preferenceEngine.ts & PreferenceSankey.tsx            │
│  - Mode Toggle: 'vec_hybrid' vs 'senate_full'          │
│  - Gap Filling: Seat has no VEC exclusion ->           │
│    Inject booth-collated Senate flow for that seat     │
│  - Preference Distribution Matrix (Purple/Maroon)      │
└────────────────────────────────────────────────────────┘
```

### Proposed Changes

1. **`scripts/collate_senate_booths.cjs`**:
   - Downloads/ingests AEC Victorian polling places with coordinates.
   - Computes weighted transfer rates between ALP, Coalition, Greens, One Nation, and Others.
   - Generates `src/senatePreferenceData.ts`.

2. **`src/senatePreferenceData.ts`**:
   - Stores pre-compiled, booth-collated transfer distributions for all 88 Victorian Assembly electorates.

3. **`src/utils/preferenceEngine.ts`**:
   - Update `getScopeBaselineData` to accept `preferenceDataSource: 'vec_hybrid' | 'senate_full'`.
   - In `'vec_hybrid'`, substitute Senate booth transfers whenever a seat has `hasOfficialDistribution === true` but lacks an empirical count for a specific party exclusion.

4. **`src/components/PreferenceSankey.tsx` & `src/components/PreferenceDistributionMatrix.tsx`**:
   - Add the Model Source Mode switch.
   - Update provenance tagging to distinguish seat-level Senate booth collation.

---

## 5. Verification Plan

1. **Collation Verification**: Check that all 88 seats receive valid 100%-normalized transfer vectors from constituent booths.
2. **Western Metro Case Study**: Verify that Western Metropolitan seats (e.g. *Footscray*, *Williamstown*) now display localized Senate transfer rates for ALP exclusions instead of generic uniform fallbacks.
3. **Toggle Switching**: Test toggling between `VEC-First` and `Senate-First` modes, ensuring smooth updates across Sankey ribbons and matrix cell tints.
4. **Build & Lint**: Execute `compile_applet` and `lint_applet` to confirm zero compilation or TypeScript errors.
