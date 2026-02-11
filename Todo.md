# Todo

This roadmap outlines the development of the personal chess analysis tool.

## Phase 1: Authentication & Data Storage
- [x] **Add Google Authentication**
  - [x] Integrate Firebase Auth foundation.
  - [x] Implement login/logout UI and logic.
  - [x] Configure Firebase Project.
- [ ] **Data Storage (Firebase)**
  - Set up Firestore or Realtime Database to store user game data.
  - Implement basic save/load functionality for analysis results.

## Phase 2: Analysis & Mistake Aggregation
- [ ] **Personal Analysis Tool**
  - Enhance `AnalysisGenerator` to systematically identify "mistakes" by comparing player moves to Stockfish's top recommendations.
  - Define thresholds for what constitutes a mistake/inaccuracy/blunder.
- [ ] **Mistake Aggregation**
  - Track mistakes by:
    - Piece type
    - Board location (squares/files/ranks)
    - Move number (opening/middlegame/endgame)
  - Create a dashboard or view to visualize these patterns.

## Phase 3: Game Importing & Scraping
- [ ] **chess.com Integration**
  - Implement a way to import/scrape past games directly from chess.com via their API or other means.
- [ ] **Gmail Integration**
  - Scrape chess.com game links/PGNs from automated emails sent to Gmail.

## Completed
- [x] Sync with upstream master.
- [x] Rebase and merge feature branches:
  - `feat/github-pages-hosting` (CDN support)
  - `feat/stockfish-analysis-dataset` (Initial analysis logic)
  - `feature/fix-imports-and-add-version` (Import fixes and versioning)
- [x] Resolve cross-origin Worker issues for GitHub Pages hosting.
