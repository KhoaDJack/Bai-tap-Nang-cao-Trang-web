# Hotel Menu Web App with Backend

A simple hotel menu website with a backend API for room data, reviews, staff, and availability checks.

## Setup

1. Open a terminal in the project folder.
2. Run `npm install`.
3. Start the backend with `npm start`.
4. Open `http://localhost:3000` in your browser.

## What it includes

- static frontend served from `public/index.html`
- API endpoints in `server/server.js`
- data persistence in `server/data.json`
- add reviews and staff using the page forms

## Notes

The backend uses Express and serves the frontend from `public/`. Any new review or staff entry is saved to `server/data.json`.
