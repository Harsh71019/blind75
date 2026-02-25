# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm test              # Run all tests (vitest)
npm test <pattern>    # Run tests matching a pattern (e.g. npm test Contains-Duplicate)
npm run dev           # Start Vite dev server for algorithm visualizers
npm run review        # Interactive spaced repetition review CLI
```

## Architecture

This is a Blind 75 LeetCode practice repo using JavaScript (ESM). Each problem lives in its own directory under a category folder.

### Directory structure per problem

```
01-Arrays-Hashing/
  01-Contains-Duplicate/
    solution.js          # Exported function(s) — the only file to edit when solving
    solution.test.js     # Vitest tests; import from './solution'
    notes.md             # Problem statement + multiple approaches with Big-O analysis
    visualizer/
      script.js          # Browser-side animation using visualizer-utils.js
      index.html         # (implied) Vite entry for the visualizer
```

### Key conventions

- All solution files use **named exports** (`export function maxProfit(...)`).
- Tests import directly from `'./solution'` using Vitest's `describe/it/expect`.
- The project uses `"type": "module"` — all JS is ESM.
- Vitest is configured via `package.json` defaults (no separate config file).

### Shared utilities (`utils/`)

- `visualizer-utils.js` — DOM helpers (`createArrayElement`, `delay`, `logStatus`) used by visualizer scripts.
- `ListNode.js` / `TreeNode.js` — Standard linked list and binary tree node constructors for future problems.

### Spaced repetition (`scripts/review.js`)

Progress is stored in `progress.json` at the repo root (not committed). The review script uses Fibonacci-like intervals `[1, 3, 7, 14, 30, 90]` days based on a `masteryLevel` field per problem entry.

### VS Code debugging

F5 launches the currently open file via `node` (`launch.json`). Useful for stepping through a `solution.js` directly.
