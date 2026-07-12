#!/bin/sh

# Push database schema (creates tables if they don't exist)
echo "Running Prisma DB Push..."
npx prisma db push --accept-data-loss

# Start the Next.js standalone server
echo "Starting Next.js Server..."
exec node server.js
