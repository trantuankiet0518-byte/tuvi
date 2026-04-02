# Design System: Tử Vi Alchemist

Master Source of Truth for visual design tokens and UI/UX principles.

## 1. Color System (HSL)

### Core Tokens
| Token | Light Mode (HSL) | Dark Mode (HSL) | Usage |
|-------|------------------|-----------------|-------|
| `--background` | `210 40% 98%` | `0 0% 6%` (#0f0f0f) | Main app background |
| `--foreground` | `222.2 84% 4.9%` | `210 40% 98%` | Primary text color |
| `--primary` | `221.2 83.2% 53.3%` | `217.2 91.2% 59.8%` | Brand color, primary CTAs |
| `--secondary` | `210 40% 96.1%` | `217.2 32.6% 17.5%` | Secondary elements |
| `--muted` | `210 40% 96.1%` | `217.2 32.6% 17.5%` | Muted backgrounds |
| `--border` | `214.3 31.8% 91.4%` | `217.2 32.6% 17.5%` | Component borders |
| `--card` | `0 0% 100%` | `0 0% 9%` | Card backgrounds |

### Material Legacy Support
Mapped to core tokens for consistency across existing components.

## 2. Typography
- **Primary Font**: 'Inter', sans-serif
- **Headline**: Font-black (900), tracking-tighter
- **Body**: Font-medium (500) to font-semibold (600)
- **Scale**: clamp() based responsive sizing for Hero sections.

## 3. UI/UX Principles (ui-ux-pro-max)
- **Accessibility**: All text meets WCAG AA contrast ratios.
- **Touch Targets**: All interactive elements (buttons, links) have a minimum size of 44x44px.
- **Visual Hierarchy**: Heavy emphasis on typography scale and weight (900 weight for headers).
- **Spacing**: Consistent use of 4px/8px incremental system.
- **Aesthetics**: High-end "Museum quality" look using large rounded corners (2.5rem), deep shadows, and subtle glassmorphism effects.

## 4. Components
- **Cards**: Large radius (`2.5rem`), subtle borders, deep shadows (`shadow-2xl`).
- **Buttons**: Full rounded, bold typography, scale feedback on active state.
- **Navigation**: Glassmorphism with `backdrop-blur-md` and semi-transparent borders.
