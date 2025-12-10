# Project Structure

## Root Level
```
kiroapp/
├── frontend/          # Next.js React application
├── backend/           # NestJS API server
├── database/          # SQL schema and seed files
└── package.json       # Root package file
```

## Frontend Structure (`/frontend`)
```
frontend/
├── app/               # Next.js App Router
│   ├── layout.tsx     # Root layout component
│   ├── page.tsx       # Home page
│   └── globals.css    # Global styles
├── public/            # Static assets
├── package.json       # Frontend dependencies
└── next.config.ts     # Next.js configuration
```

## Backend Structure (`/backend`)
```
backend/
├── src/               # Source code
│   ├── app.controller.ts    # Main controller
│   ├── app.service.ts       # Main service
│   ├── app.module.ts        # Root module
│   └── main.ts              # Application entry point
├── test/              # E2E tests
├── dist/              # Compiled output
└── package.json       # Backend dependencies
```

## Database Structure (`/database`)
```
database/
├── schema.sql         # Database schema definition
└── seed.sql           # Initial data seeding
```

## Key Conventions

### File Organization
- Each major component (frontend/backend/database) is self-contained
- TypeScript configuration at component level
- Separate package.json for each component's dependencies

### Database Schema
- Uses PostgreSQL with ENUM types
- Foreign key relationships with CASCADE deletes
- Price caching strategy (cached_price in work_order_details)
- Separate tables for customers, work_orders, work_order_details, and line_items

### Code Style
- TypeScript throughout
- ESLint and Prettier configured for both frontend and backend
- Jest for testing in backend
- Consistent naming conventions (snake_case for database, camelCase for TypeScript)