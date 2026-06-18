# Student Finance Tracker

Minimal vanilla HTML/CSS/JS app for tracking student expenses. Mobile-first, accessible, and uses localStorage.

## Features
- Add / edit / delete transactions
- Regex search (safe compiler) with highlights
- Sorting by date / description / amount
- Import / export JSON
- Simple stats and settings (manual currency rates)

## Regex catalog
- Description: `^\S(?:.*\S)?$` — no leading/trailing spaces
- Amount: `^(0|[1-9]\d*)(\.\d{1,2})?$` — whole or decimal with max 2 digits
- Date: `^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$`
- Category: `^[A-Za-z]+(?:[ -][A-Za-z]+)*$`
- Advanced example: `\b(\w+)\s+\1\b`

## Run
Open `index.html` in a browser or use VS Code Live Server.

## Accessibility
- Skip to content link
- Focus styles
- status region for ARIA announcements
