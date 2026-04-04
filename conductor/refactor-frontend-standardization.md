# Refactor Frontend - Standardization (React + Tailwind)

This plan outlines the steps to refactor the frontend of the Puri Bunda Queue Systems, migrating away from Next.js remnants and consolidating the tech stack to standard React JS and Tailwind CSS, as requested in issue #6.

## Objective
Standardize the frontend by removing unnecessary tools, tech, and configuration while preserving the current design and functionality.

## Key Files & Context
- **Frontend Core**: `frontend/package.json`, `frontend/vite.config.ts`, `frontend/tsconfig.json`
- **Styling**: `frontend/src/styles/app.css`, `frontend/tailwind.config.ts`
- **Routing**: `frontend/src/router/router.tsx`, `frontend/src/main.tsx`
- **Components**: `frontend/src/components/app-sidebar.tsx`

## Implementation Steps

### 1. Git Management
- [ ] Checkout `main` and pull latest changes.
- [ ] Create a new branch `refactor/puribunda-6-ui`.

### 2. Infrastructure Cleanup
- [ ] **Remove** `frontend/tailwind.config.ts` (Redundant with Tailwind v4 CSS configuration).
- [ ] **Cleanup** `frontend/package.json`:
    - Remove `@react-router/dev` (Framework-only dependency).
    - Update `clean` script to remove references to `.react-router`.
- [ ] **Simplify** Configuration:
    - Update `frontend/vite.config.ts` to use only the `@` alias for `src/`.
    - Update `frontend/tsconfig.json` to match the simplified alias and remove framework-specific includes (like `.react-router/types`).

### 3. Code Refactoring
- [ ] **Update Navigation**: Replace `<a>` tags with `<Link>` or `<NavLink>` from `react-router-dom` in `frontend/src/components/app-sidebar.tsx`.
- [ ] **Consolidate Imports**: Update all files in `frontend/src` to consistently use the `@/` alias (e.g., replace `@pages/Dashboard` with `@/pages/Dashboard`).
- [ ] **Cleanup**: Perform a final audit of the `frontend` directory to remove any unused or redundant files.

### 4. Verification & Testing
- [ ] Run `pnpm install` to update dependencies and the lockfile.
- [ ] Run `pnpm build` to ensure the project compiles correctly.
- [ ] Run `pnpm lint` to verify code quality standards.

## Verification
- [ ] Build succeeds without errors.
- [ ] Linting passes.
- [ ] Navigation works as an SPA (no full page reload).
- [ ] Visual design remains unchanged.
