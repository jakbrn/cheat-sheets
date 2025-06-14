# School Cheat Sheets Manager

A modern web application for managing and organizing cheat sheets for general purpose classes in school. Built with Next.js, TypeScript, and PayloadCMS, this application provides an intuitive interface for students to create, organize, and access their study materials efficiently.

## Features

- 📝 Create and manage cheat sheets for different subjects
- 🤖 AI-powered cheat sheet generation using OpenAI API
- 📱 Responsive design for all devices
- 🌙 Dark/Light mode support
- 📊 Rich text editing capabilities
- 🗄️ MongoDB database for reliable data storage

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: TailwindCSS 4
- **CMS**: PayloadCMS
- **Database**: MongoDB
- **Authentication**: Built-in PayloadCMS auth
- **UI Components**: Shadcn
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: TanStack Query
- **AI Integration**: OpenAI API

## Prerequisites

- Node.js (^18.20.2 || >=20.9.0)
- PNPM (^10)
- MongoDB instance
- OpenAI API key (for AI features)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Set up your environment variables (create a `.env` file based on `.env.example`)
4. Start the development server:
   ```bash
   pnpm dev
   ```

## Docker Support

The project includes Docker configuration for both development and production environments:

- `docker-compose.yml` - Development environment
- `docker-compose.prod.yml` - Production environment (for [Coolify](https://coolify.io))
- `Dockerfile` - Production build configuration