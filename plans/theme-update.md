# Plan: UI/UX Improvement & Theme Update

Improve the user interface of all organism components and implement a robust theme system with a dedicated dark mode (#0f0f0f) and standard light mode.

## Objective
- Implement CSS variables for all colors to support light/dark mode.
- Update Dark Mode background to `#0f0f0f`.
- Refactor all organisms in `components/organisms/` to use semantic tokens and follow `ui-ux-pro-max` design principles (Accessibility, Touch Targets, Spacing, Animation).

## Key Files & Context
- `app/globals.css`: Define CSS variables for light and dark modes.
- `tailwind.config.ts`: Update to reference CSS variables and fix content paths.
- `components/organisms/*.tsx`: Update styling to use improved theme tokens.

## Implementation Steps

### 1. Theme Configuration
- **Update `app/globals.css`**:
    - Define `:root` (Light mode) and `.dark` (Dark mode) variables.
    - Set `--background` to `#0f0f0f` in `.dark`.
    - Map Material-style names (`--surface`, `--on-surface`, etc.) to variables.
    - Standardize semantic colors (primary, secondary, accent, error).
- **Update `tailwind.config.ts`**:
    - Reference the new CSS variables.
    - Add `./app/**/*.{js,ts,jsx,tsx,mdx}` to `content`.
    - Update `borderRadius` to use more standard values if needed.

### 2. Component Refactoring (Organisms)
- **General UX Improvements**:
    - Ensure minimum touch targets of 44x44px for all buttons/links.
    - Improve contrast for readability (AA standard).
    - Use consistent spacing (4px/8px system).
    - Add hover/active/focus states using `ui-ux-pro-max` guidelines.
- **Specific Components**:
    - `Navbar.tsx`: Replace hardcoded `amber-900` and `slate-100` with tokens. Fix "glass" effect for both modes.
    - `Sidebar.tsx`: Ensure consistent background/active state styling.
    - `HomeHero.tsx`: Improve responsive typography and button interaction.
    - `LapLaSoForm.tsx`: Improve input contrast and focus states.
    - `LapLaSoPreview.tsx`: Enhance the SVG chart styling for better visibility in both modes.
    - `DataTable.tsx`: Ensure table rows have clear separation and hover states.
    - `ThuVien*`: Improve bento grid spacing and card interactions.

## Verification & Testing
- Test light and dark mode toggle.
- Verify color contrast meets WCAG AA standards using developer tools.
- Check responsive behavior on mobile, tablet, and desktop.
- Verify touch targets on mobile view.
