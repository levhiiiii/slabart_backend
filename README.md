# SlabArt Backend

NestJS API backend for SlabArt Finance app.

## Tech Stack

- NestJS
- TypeScript
- PostgreSQL (NeonDB)
- JWT Authentication
- Passport.js

## Getting Started

```bash
# Install dependencies
npm install

# Development
npm run start:dev

# Production
npm run start:prod
```

## API Endpoints

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile
- `POST /auth/firebase-login` - Firebase token verification
