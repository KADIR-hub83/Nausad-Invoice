# Naushad AC Solution Invoice Management

## Run locally
1. Install Node.js 18+.
2. Copy `.env.example` to `.env`.
3. Put your MongoDB Atlas connection string in `MONGODB_URI`.
4. In this folder run `npm install` then `npm start`.
5. Open http://localhost:3000.

## Included
- Responsive editor + live invoice preview
- Real appliance/brand image crop from the supplied bill reference
- Single item row by default, add/remove items
- Business, client, bank account, IFSC and UPI details
- Invoice number sequence based on saved history (INV/001, INV/002...)
- MongoDB save, history search, preview/edit, delete, edit count and timestamps
- Default terms and conditions, discount calculation, custom alerts
- Browser print / Save as PDF, A4 portrait and multi-page flow
- Software By Kadir.. footer

## MongoDB Atlas
Create a database user, allow your IP in Network Access, and paste the Atlas Node.js URI into `.env`. Never upload `.env` to GitHub. For best print output choose A4 and enable Background graphics. This starter uses browser printing for PDF output.
