# Copilot Instructions for Password Manager Dashboard

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a Next.js web dashboard for managing usernames and passwords for multiple modems. The application includes:

- User authentication (login/register)
- Modem management (add, edit, delete)
- User profile settings
- Integration with Supabase database using Prisma ORM

## Technology Stack
- **Frontend**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Authentication**: NextAuth.js with Supabase provider
- **Language**: TypeScript

## Project Structure
- Use `src/` directory structure
- App Router pattern with `app/` directory
- Components in `src/components/`
- Database schema in `prisma/schema.prisma`
- API routes in `src/app/api/`

## Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling with responsive design
- Implement proper error handling and validation
- Use server components where possible for better performance
- Implement proper authentication and authorization
- Follow Next.js 15 conventions and best practices

## Key Features to Implement
1. Authentication system (login/register)
2. Dashboard for viewing all modems
3. Add/Edit/Delete modem functionality
4. User profile management
5. Responsive design for mobile and desktop
6. Search and filter functionality for modems
7. Export functionality for modem data
