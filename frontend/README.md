Frontend folder mapping and notes

This folder documents the current frontend organization and where the active source files live.

Mapping (existing files are left in-place for now):

- CSS (original): ../css/*.css
  - core styles: ../css/core-styles.css
  - theme/colors: ../css/theme-colors.css
  - animations: ../css/animations.css
  - light-mode overrides: ../css/light-mode.css

- JS (original): ../js/**
  - core: ../js/core/*.js
  - ui: ../js/ui/*.js
  - api (client wrappers): ../js/api/*.js
  - features: ../js/features/*.js
  - utils: ../js/utils/*.js

- Config: ../config/*.json

How to use:
- The project currently keeps the canonical files in the root `css/`, `js/`, and `config/` folders to avoid breaking the existing `skillTwin.html` references.
- If you want to fully migrate the files under `frontend/`, move the files and update the `<link>`/`<script>` tags in `skillTwin.html` accordingly.

Recommended next steps:
- Move/copy the files into `frontend/` subfolders and update `skillTwin.html` imports.
- Use the backend proxy (../backend/server.js) for any requests that require secret API keys.

Created: frontend README for clarity.
