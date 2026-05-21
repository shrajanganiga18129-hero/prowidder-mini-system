Prowidder Mini Lead Distribution System

Full Stack Developer Assignment Project

Live Demo:
https://prowidder-mini-system.vercel.app

GitHub Repository:
https://github.com/shrajanganiga18129-hero/prowidder-mini-system

Features

- Lead request form
- PostgreSQL database integration
- Prisma ORM
- Mandatory provider assignment
- Fair lead distribution
- Monthly provider quota handling
- Duplicate lead prevention
- Real-time dashboard updates
- Webhook simulation
- Concurrency testing

Routes

/request-service
/dashboard
/test-tools

Tech Stack

- Next.js
- TypeScript
- Prisma
- PostgreSQL Neon
- Vercel

Setup Instructions

1. Clone repository

git clone https://github.com/shrajanganiga18129-hero/prowidder-mini-system

2. Install dependencies

npm install

3. Add DATABASE_URL in .env file

4. Push database schema

npx prisma db push

5. Seed database

npx prisma db seed

6. Run project

npm run dev

Allocation Algorithm

Mandatory providers are assigned first depending on service type.

Remaining providers are selected using fair rotation logic while respecting monthly quota limits.

Concurrency Handling

Prisma database transactions are used to maintain consistency during simultaneous lead creation requests.

Webhook Idempotency

Webhook requests are handled safely to avoid duplicate quota reset operations.
