# Refactor Frontend - Standardization (React + Tailwind)

This plan outlines the steps to refactor the frontend of the Puri Bunda Queue Systems, migrating away from Next.js remnants and consolidating the tech stack to standard React JS and Tailwind CSS, as requested in issue #6.

## Objective
Standardize the frontend by removing unnecessary tools, tech, and configuration while preserving the current design and functionality. Focus on removing Radix UI and UI-related third-party helper tools.

## Key Files & Context
- **Frontend Core**: `frontend/package.json`, `frontend/vite.config.ts`, `frontend/tsconfig.json`
- **Styling**: `frontend/src/styles/app.css`, `frontend/tailwind.config.ts`
- **Routing**: `frontend/src/router/router.tsx`, `frontend/src/main.tsx`
- **Components**: `frontend/src/components/ui/*`, `frontend/src/components/app-sidebar.tsx`

## Implementation Steps

### 1. Git Management
- [ ] Ensure working on branch `refactor/puribunda-6-ui`.

### 2. Infrastructure Cleanup (Already partially completed)
- [x] **Remove** `frontend/tailwind.config.ts` (Redundant with Tailwind v4 CSS configuration).
- [x] **Cleanup** `frontend/package.json`:
    - Remove `@react-router/dev` (Framework-only dependency).
    - Update `clean` script to remove references to `.react-router`.
- [x] **Simplify** Configuration:
    - Update `frontend/vite.config.ts` to use only the `@` alias for `src/`.
    - Update `frontend/tsconfig.json` to match the simplified alias and remove framework-specific includes (like `.react-router/types`).

### 3. Code Refactoring - Standardizing Navigation & Imports
- [x] **Update Navigation**: Replace `<a>` tags with `<Link>` or `<NavLink>` from `react-router-dom` in `frontend/src/components/app-sidebar.tsx`.
- [x] **Consolidate Imports**: Update all files in `frontend/src` to consistently use the `@/` alias (e.g., replace `@pages/Dashboard` with `@/pages/Dashboard`).

### 4. Deep Cleanup - Removing Radix UI & UI-Related Tools
- [ ] **Refactor `src/lib/utils.ts`**: Replace `clsx` and `tailwind-merge` with standard template literals or a simple native JS utility.
- [ ] **Rewrite UI Components**: Manually rewrite Radix-dependent components in `src/components/ui/` to use pure React and Tailwind CSS:
    - [ ] `button.tsx` (Remove Radix Slot and CVA).
    - [ ] `tabs.tsx` (Remove Radix Tabs).
    - [ ] `sidebar.tsx` (Remove Radix and CVA).
    - [ ] `dialog.tsx`, `alert-dialog.tsx`, `dropdown-menu.tsx`, `sheet.tsx`, `select.tsx`, `tooltip.tsx`, `checkbox.tsx`, `label.tsx`, `separator.tsx`.
- [ ] **Remove UI Helper Tools**:
    - [ ] Remove `class-variance-authority` (CVA) usage and replace with standard Tailwind class strings.
    - [ ] Remove `tailwindcss-animate` and `tw-animate-css` if possible (use standard Tailwind classes).
- [ ] **Maintain Functional Tools**:
    - [ ] **KEEP** `@dnd-kit/*` for drag and drop functionality.
    - [ ] **KEEP** `@tanstack/react-query`, `axios`, `zustand`, `lucide-react`, `recharts`, `react-hook-form`, `zod`.

### 5. Verification & Testing
- [ ] Run `pnpm install` to update dependencies and the lockfile.
- [ ] Run `pnpm build` to ensure the project compiles correctly.
- [ ] Run `pnpm lint` to verify code quality standards.

## Verification
- [ ] Build succeeds without errors.
- [ ] Linting passes.
- [ ] Navigation works as an SPA (no full page reload).
- [ ] Visual design remains unchanged.
- [ ] No `@radix-ui/*` or `class-variance-authority` libraries remain in `package.json`.
