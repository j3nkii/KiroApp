# Technology Stack

## Architecture
- **Frontend**: Next.js 16 with React 19, TypeScript
- **Backend**: NestJS with TypeScript
- **Database**: PostgreSQL (inferred from schema)
- **Styling**: Tailwind CSS v4

## Key Dependencies

### Frontend
- **Framework**: Next.js 16.0.8 with App Router
- **HTTP Client**: Axios for API communication
- **Styling**: Tailwind CSS v4 with PostCSS
- **Development**: ESLint, TypeScript 5

### Backend
- **Framework**: NestJS 11 (Node.js/Express)
- **Testing**: Jest with coverage support
- **Code Quality**: ESLint, Prettier
- **Development**: Hot reload with watch mode

## Common Commands

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Backend Development
```bash
cd backend
npm run start:dev    # Start with hot reload
npm run start:debug  # Start with debugging
npm run build        # Compile TypeScript
npm run test         # Run unit tests
npm run test:e2e     # Run end-to-end tests
npm run test:cov     # Run tests with coverage
npm run format       # Format code with Prettier
npm run lint         # Run ESLint with auto-fix
```

## Development Workflow
- Backend runs on development mode with hot reload
- Frontend connects to backend API (currently localhost:3000)
- Database schema managed via SQL files in `/database`
- TypeScript used throughout for type safety