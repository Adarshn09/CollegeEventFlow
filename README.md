# CollegeEventFlow - Setup Guide

This guide provides step-by-step instructions for setting up and running the CollegeEventFlow project.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **PostgreSQL database** (or access to a Neon database)
- **Git** (for cloning the repository)

## Step 1: Clone the Repository

```bash
git clone <repository-url>
cd CollegeEventFlow
```

If you already have the project, navigate to the project directory:

```bash
cd CollegeEventFlow
```

## Step 2: Install Dependencies

Install all required Node.js packages:

```bash
npm install
```

Or if you prefer yarn:

```bash
yarn install
```

## Step 3: Set Up Environment Variables

Create a `.env` file in the root directory of the project:

```bash
# On Windows (PowerShell)
New-Item .env

# On macOS/Linux
touch .env
```

Add the following environment variables to your `.env` file:

```env
DATABASE_URL=postgresql://username:password@host:port/database_name
NODE_ENV=development
SESSION_SECRET=your-secret-key-here
```

Replace the `DATABASE_URL` with your actual PostgreSQL connection string. For example:
- Local PostgreSQL: `postgresql://postgres:password@localhost:5432/collegeeventflow`
- Neon Database: Use the connection string provided by Neon

## Step 4: Set Up the Database

Push the database schema to your PostgreSQL database:

```bash
npm run db:push
```

This command uses Drizzle Kit to create the necessary tables in your database.

## Step 5: Run the Development Server

Start the development server:

```bash
npm run dev
```

This will start both the backend (Express) and frontend (React with Vite) in development mode.

The application should now be running at:
- **Frontend**: http://localhost:5173 (default Vite port)
- **Backend API**: http://localhost:5000 (or the port specified in your server config)

## Step 6: Verify the Setup

1. Open your browser and navigate to http://localhost:5173
2. You should see the CollegeEventFlow application
3. Check the terminal for any errors

## Additional Commands

### Build for Production

To build the project for production:

```bash
npm run build
```

### Run Production Build

After building, start the production server:

```bash
npm run start
```

### Type Checking

To check for TypeScript errors:

```bash
npm run check
```

## Project Structure

```
CollegeEventFlow/
├── client/          # React frontend application
├── server/          # Express backend application
├── shared/          # Shared code (schemas, types, etc.)
├── migrations/      # Database migrations
├── dist/            # Production build output
└── node_modules/    # Dependencies
```

## Troubleshooting

### Database Connection Issues

- Verify your `DATABASE_URL` is correct
- Ensure your PostgreSQL server is running
- Check if the database exists and the user has proper permissions

### Port Already in Use

If the default port is already in use, you can specify a different port in your environment variables or server configuration.

### Module Not Found Errors

If you encounter module not found errors:

```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# On Windows (PowerShell)
Remove-Item -Recurse -Force node_modules, package-lock.json

# Reinstall dependencies
npm install
```

### Build Errors

If you encounter build errors, ensure:
- All dependencies are installed correctly
- Your Node.js version is compatible (16+)
- TypeScript types are properly configured

## Tech Stack

- **Frontend**: React 18, TypeScript, TailwindCSS, Radix UI, React Query
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js with session management
- **Build Tools**: Vite, esbuild
- **Styling**: TailwindCSS with custom animations

## Getting Help

If you encounter any issues not covered in this guide:
1. Check the error messages in the terminal
2. Review the application logs
3. Ensure all prerequisites are properly installed
4. Verify your environment variables are correctly set

## Next Steps

Once the application is running:
1. Create an admin account (if applicable)
2. Explore the event management features
3. Set up college/organization profiles
4. Start creating and managing events

---

**Happy coding! 🎉**
