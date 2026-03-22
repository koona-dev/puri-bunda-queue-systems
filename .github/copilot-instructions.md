# Copilot instructions for `puri-bunda-queue-systems`

## Repository shape
- Use `pnpm` only. Do not switch to `npm` or `yarn`.
- This repository is a monorepo with two workspace apps:
  - `frontend/`: React 19 + Vite + TypeScript
  - `backend/`: NestJS 11 + Drizzle + PostgreSQL + Jest
- Reuse the existing module/page structure instead of introducing new frameworks or parallel patterns.

## Issue execution flow
1. Read the full issue description and comments before changing code.
2. Create a branch from `main` named `copilot/issue-<number>-<short-slug>`.
3. Determine whether the issue affects `frontend`, `backend`, or both.
4. Implement the smallest complete fix or feature that closes the issue.
5. Keep changes scoped. Do not refactor unrelated files just because you touched the area.

## Validation rules
- Backend changes must run:
  - `pnpm --filter backend lint`
  - `pnpm --filter backend test`
  - `pnpm --filter backend build`
- Frontend changes must run:
  - `pnpm --filter frontend lint`
  - `pnpm --filter frontend build`
- If a backend behavior changes, add or update Jest coverage in `backend/src/**/*.spec.ts`.
- Frontend does not have a test script yet. When UI behavior changes, include manual verification steps and screenshots in the PR.

## PR requirements
- Use Conventional Commits for commit messages.
- Open a pull request into `main`.
- The PR body must include:
  - the problem being solved
  - the root cause or requirement summary
  - the main code changes
  - validation commands and results
  - screenshots for UI changes
  - remaining risks or follow-up items
- Add `Closes #<issue-number>` when the issue is fully addressed.

## Merge and review safeguards
- Never commit directly to `main`.
- Do not merge unless CI is green.
- Do not merge without code owner approval.
- If repository permissions allow it, only enable auto-merge after approval and passing checks.
- If blocked by missing secrets, missing permissions, or broken repository settings, stop and document the blocker in the PR instead of guessing.
