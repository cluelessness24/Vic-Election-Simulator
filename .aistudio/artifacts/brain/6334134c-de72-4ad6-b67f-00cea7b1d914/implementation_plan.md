# Implementation Plan: Section Guide Navigation & Full-Width 1280px Snapshot Export

## Objective
Enhance the Victorian State Election Simulator by:
1. Adding two standard action buttons to the header of every major section:
   - **Golden User Guide Button**: A compact, styled golden button with a book icon (`BookOpen`) that opens the User Guide modal navigated directly to that specific section's documentation tab.
   - **Camera Screenshot Button**: A matching button with a camera icon (`Camera`) that exports a clean, high-resolution PNG snapshot of the section at full desktop width (1280px) with custom watermark metadata.
2. Updating the app and screenshot header subtitles per user feedback:
   - In both the **app main subtitle** and the **screenshot header subtitle**:
     - Replace `2026` with `simulator` (e.g., `Victorian State Election Simulator`).
     - Replace the `88 seats` badge/text with `created by cluelessness.net`.
     - Remove the `45 majority threshold` text entirely from the subtitle line.

---

## 1. User Preferences & Clarifications Integrated
- **App Main Subtitle**: 
  - Change subtitle in `App.tsx` header to:
    `Interactive Model • created by cluelessness.net`
    (removing both `88 Seats Total` and `45 Majority Threshold`).
- **Screenshot Header & Subtitle**: Branded snapshot header bar:
  - Header badge line: `VICTORIAN STATE ELECTION SIMULATOR • created by cluelessness.net` (no `2026`, no `88 seats`, no `45 majority threshold`).
  - Section Title (e.g. `Electorate Cartogram Map`, `Legislative Assembly Hemicycle`, `Preference Flow Simulator`, etc.).
  - Timestamp (formatted local date/time).
  - Dark-mode background (`#0A0C10`) with crisp typography and high-contrast rendering.
- **Guide Navigation**: Deep-links directly to the relevant tab in the User Guide (`quickstart`, `map_and_paint`, `preference_flow`, `party_swing`, `swing_pad`, `seats`, or `export_share`).
- **Mobile/Narrow Screen Handling**: Off-screen full-width cloning at `1280px` desktop width so wide SVG maps, parliament hemicycle arcs, Sankey diagrams, and 88-seat tables are captured completely without horizontal cut-off or responsive squash.

---

## 2. Architecture & Components

### A. Library Installation
- Install `html-to-image` via `install_applet_package` for DOM-to-PNG generation. `html-to-image` supports SVG rendering, web fonts, CSS gradients, and offscreen cloned DOM nodes.

### B. Image Export Engine (`src/utils/exportSectionImage.ts`)
A dedicated export utility function:
```typescript
interface ExportSectionOptions {
  elementId: string;
  sectionTitle: string;
  filenamePrefix?: string;
  targetWidth?: number; // default: 1280
}
export async function exportSectionImage(options: ExportSectionOptions): Promise<void>;
```
**Mechanism**:
1. Locates the DOM element by `id`.
2. Creates an offscreen clone container at `width: 1280px` (`position: fixed; left: -9999px; top: 0; z-index: -9999`).
3. Prepends a branded header:
   - Badge line: `VICTORIAN STATE ELECTION SIMULATOR • created by cluelessness.net`
   - Section Title (e.g. "Electorate Cartogram Map")
   - Current formatted timestamp (e.g. "Captured: 28 Oct 2026, 4:45 PM")
4. Deep clones the section DOM into the container, ensuring SVG viewBox and canvas dimensions remain crisp.
5. Captures the clone using `toPng` from `html-to-image` at `pixelRatio: 2` (retina resolution).
6. Automatically triggers a browser download (`vic-simulator-[slug]-[timestamp].png`).
7. Cleans up the offscreen container from the DOM.

### C. Reusable Header Action Component (`src/components/SectionHeaderActions.tsx`)
A compact, uniform action group placed in each section's header:
- **Golden Book Button**:
  - Icon: `BookOpen` (size 13)
  - Styling: Golden/amber theme (`text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25`)
  - Tooltip: "Open User Guide for this section"
  - Action: Triggers `onOpenGuide(guideTab)`
- **Camera Snapshot Button**:
  - Icon: `Camera` (size 13) / `Loader2` during export / `Check` on success
  - Styling: Sleek slate theme (`text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:text-white`)
  - Tooltip: "Export 1280px image snapshot"
  - Action: Calls `exportSectionImage(...)` with immediate visual feedback (loading spinner & "Saved!" checkmark).

### D. User Guide Modal Enhancement (`src/components/UserGuideModal.tsx`)
- Add `initialTab?: GuideTab` prop to `UserGuideModalProps`.
- Sync `activeTab` state when `isOpen` opens or `initialTab` changes.
- Add support for dedicated sections (`seats` guide tab for the 88-seat margin breakdown and directory).
- Maintain all existing navigation tabs:
  - `quickstart` (Quick Start)
  - `party_swing` (Party Swing Sliders & Polling Scenarios)
  - `preference_flow` (Preference Flow Sankey Simulator)
  - `swing_pad` (3-Way Swing Pad & Statewide Presets)
  - `map_and_paint` (Cartogram Map, Hemicycle & Paintbrush Mode)
  - `seats` (Seat Margin Breakdown & Electorate Directory)
  - `export_share` (Sharing, Restoring & Code Strings)

### E. Section Integration Points
Embed `SectionHeaderActions` and add container IDs:
1. **Electorate Cartogram Map** (`#section-cartogram-map` in `ElectorateMap.tsx`) -> Guide tab: `map_and_paint`
2. **Legislative Assembly Hemicycle** (`#section-hemicycle` in `ParliamentHemicycle.tsx`) -> Guide tab: `map_and_paint`
3. **Preference Flow Simulator** (`#section-preference-flow` in `ScenarioControls.tsx` / `PreferenceSankey.tsx`) -> Guide tab: `preference_flow`
4. **Party Swings & Polling Controls** (`#section-party-swings` in `ScenarioControls.tsx` / `PartySwingBar.tsx`) -> Guide tab: `party_swing`
5. **Three-Way Swing Pad & Presets** (`#section-swing-pad` in `ScenarioControls.tsx`) -> Guide tab: `swing_pad`
6. **Seat Margin Breakdown Table** (`#section-electorate-list` in `ElectorateList.tsx`) -> Guide tab: `seats`
7. **Share & Restore Area** (`#section-share-restore` in `App.tsx`) -> Guide tab: `export_share`

---

## 3. Implementation Steps

1. **Header & Subtitle Branding Update**:
   - Update `App.tsx` main header subtitle:
     - Replace `2026 State Election Simulator` with `State Election Simulator` (or `Victorian State Election Simulator`).
     - Subtitle changed to `Interactive Model • created by cluelessness.net` (removing `88 Seats Total` and `45 Majority Threshold`).
2. **Package Installation**:
   - Install `html-to-image` via `install_applet_package`.
3. **Export Utility Creation**:
   - Create `src/utils/exportSectionImage.ts` with 1280px container cloning, watermark header (`VICTORIAN STATE ELECTION SIMULATOR • created by cluelessness.net`), timestamp, retina PNG generation, and download handling.
4. **UI Action Component Creation**:
   - Create `src/components/SectionHeaderActions.tsx` with Golden Guide button and Camera Snapshot button.
5. **User Guide Modal Updates**:
   - Update `src/components/UserGuideModal.tsx` to accept `initialTab` and add `seats` tab.
6. **Component Wiring**:
   - Connect `SectionHeaderActions` across all section headers in `ElectorateMap.tsx`, `ParliamentHemicycle.tsx`, `ScenarioControls.tsx`, `ElectorateList.tsx`, and `App.tsx`.
7. **Verification & Quality Checks**:
   - Run `compile_applet` and `lint_applet` to confirm zero compilation errors.
   - Verify modal opens directly to correct tabs.
   - Verify camera exports generate full 1280px images with `created by cluelessness.net` badge and no clipping.

---

## 4. Verification Plan
- **Subtitle Verification**: Check that `App.tsx` renders `created by cluelessness.net` with "2026" replaced with "simulator" and the "45 majority threshold" removed.
- **Guide Navigation Test**: Click golden book buttons across sections to confirm direct tab opening.
- **Export Snapshot Test**: Click camera icons across all sections to verify that the downloaded PNG has a 1280px width, clean header with `VICTORIAN STATE ELECTION SIMULATOR • created by cluelessness.net`, and no horizontal clipping.
