# Todo App Frontend

A modern, responsive React TypeScript application for managing todos with a beautiful UI.

## Features

- ✅ **Modern UI/UX** - Clean, responsive design with smooth animations
- ✅ **CRUD Operations** - Create, read, update, and delete todos
- ✅ **Advanced Filtering** - Filter by status, priority, category, and sort options
- ✅ **Priority Levels** - Low, medium, and high priority with color coding
- ✅ **Due Dates** - Set and track due dates with visual indicators
- ✅ **Categories** - Organize todos by categories
- ✅ **Real-time Updates** - Instant UI updates without page refresh
- ✅ **Error Handling** - Comprehensive error handling and user feedback
- ✅ **Loading States** - Smooth loading indicators
- ✅ **Progress Tracking** - Visual progress bar and completion stats
- ✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API calls
- **React Router** - Client-side routing

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App

## Project Structure

```
src/
├── components/          # React components
│   ├── TodoItem.tsx    # Individual todo item
│   ├── TodoForm.tsx    # Add/edit todo form
│   ├── TodoFilters.tsx # Filtering and sorting
│   └── TodoList.tsx    # Main todo list component
├── hooks/              # Custom React hooks
│   └── useTodos.ts     # Todo state management
├── services/           # API services
│   └── api.ts          # HTTP client and API calls
├── types/              # TypeScript type definitions
│   └── todo.ts         # Todo-related interfaces
├── utils/              # Utility functions
│   └── dateUtils.ts    # Date formatting and validation
└── App.tsx             # Main application component
```

## API Integration

The frontend connects to the backend API at `http://localhost:5000/api`. Make sure the backend server is running before using the frontend.

## Styling

The app uses Tailwind CSS for styling with custom components and utilities. The design is modern, clean, and follows best UX practices.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
