# Strategic Foresight Game Platform

## Overview

This is an enterprise-grade web application for Future Scenario, future retreats, and collaborative foresight gaming, designed for Dubai Police. It supports multiple user roles (Super Admin, Admin, Game Master, Future Designer, Expert) with role-based interfaces. The platform facilitates strategic foresight, Future Scenario, future retreats, and collaborative decision-making through gamified experiences. It aims to enhance organizational preparedness and strategic agility.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

- **Framework**: React 18 with TypeScript
- **Routing**: Wouter
- **State Management**: React Context API
- **Data Fetching**: TanStack React Query
- **Styling**: Tailwind CSS v4 with custom design tokens based on Dubai Police branding
- **UI Components**: Shadcn/ui (New York style) with Radix UI primitives
- **Build Tool**: Vite

### Backend Architecture

- **Runtime**: Node.js with Express
- **API Pattern**: RESTful endpoints
- **Session Management**: Express sessions with PostgreSQL storage

### Data Storage

- **Database**: PostgreSQL with Drizzle ORM
- **Schema Management**: Drizzle Kit for schema synchronization

### Application Structure

The application is structured into `client/src`, `server/`, and `shared/` directories.

- `client/src` contains UI components, contexts, role-specific pages, hooks, and utilities.
- `server/` includes the Express app entry, API routes, data access layer, and static file serving.
- `shared/` holds the Drizzle schema and Zod validation shared between client and server.

### Role-Based Navigation

The platform dynamically renders interfaces based on the logged-in user's role, providing tailored access and functionalities for Super Admins, Admins (SFD), Game Masters, Future Designers, and Experts.

### Design System

The UI adheres to the Dubai Police Design System v5.0, featuring a futuristic, glassmorphism-inspired aesthetic. It uses custom CSS variables for branding, Inter font for body text, and Rajdhani for headings. A design mode toggle supports normal, wireframe, and low-fidelity views.

### Feature Specifications

- **Game Master Flow**: A multi-stage process for game configuration, participant management, focal topics, themes, challenge definition and voting, theme scoring, theme selection, player report review, and consolidated strategic report submission.
- **Future Retreat Module**: Supports a new 'Future Designer' role for creating and managing retreat sessions, including table management, data entry across categories (Work Issues, Future Challenges, Opportunities, Risks), voting, and report generation. The module features a 12-stage gamified workshop experience with player submissions, coordinator consolidation, and voting.
- **Leaderboard & Analytics**: Provides department-wise leaderboards, overall analytics, and detailed participant performance, with expanded test data for development.

## External Dependencies

- **Database**: PostgreSQL, Drizzle ORM, connect-pg-simple
- **UI Libraries**: Radix UI, Recharts, Embla Carousel, Lucide React, date-fns
- **Build & Development**: Vite, esbuild, Tailwind CSS v4
- **Replit-Specific**: @replit/vite-plugin-runtime-error-modal, @replit/vite-plugin-cartographer, @replit/vite-plugin-dev-banner
- **Form & Validation**: React Hook Form, Zod, drizzle-zod
