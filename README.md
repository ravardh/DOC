# Drops of Change NGO Website

This is the official repository for the Drops of Change NGO website, an organization dedicated to helping underprivileged children through education and skill development programs.

## Project Overview

The Drops of Change website is a comprehensive fullstack application built with modern web technologies:

### Technology Stack
- **Frontend**: React.js with Vite, Tailwind CSS, React Router
- **Backend**: Node.js, Express.js, JWT Authentication
- **Database**: MongoDB with Mongoose ODM
- **File Storage**: Cloudinary integration
- **Email Service**: Nodemailer with Gmail SMTP
- **UI Components**: Custom responsive components with Tailwind

### Key Features
- 🎯 **Multi-role Authentication**: Admin, HR, and Team member dashboards
- 📧 **Automated Email Notifications**: Professional emails for all form submissions
- 📱 **Mobile-Responsive Design**: Auto-collapsing navigation and responsive layouts
- 🔒 **Secure File Management**: Cloudinary integration for images and documents
- 📊 **Comprehensive Data Management**: Students, volunteers, interns, donations
- 🎨 **Dynamic Content**: Year-wise publications, gallery, announcements
- 👥 **Role-based Access Control**: Hierarchical permission system

## Repository Structure

This project is organized into two main directories:

- [`/client`](./client/README.md) - Frontend React application with Vite
- [`/server`](./server/README.md) - Backend Express API with MongoDB

## Quick Start

### Prerequisites
- Node.js (v16 or later)
- MongoDB (local or Atlas)
- Cloudinary account
- Gmail account with App Password

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/drops-of-change.git
   cd drops-of-change
   ```

2. **Setup Backend:**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Configure your .env file with database and API keys
   npm run dev
   ```

3. **Setup Frontend:**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

4. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4500

## Documentation

For detailed setup and usage instructions:

- [Frontend Documentation](./client/README.md) - React app setup, components, and features
- [Backend Documentation](./server/README.md) - API endpoints, models, and configuration
- [Email Setup Guide](./EMAIL_SETUP.md) - Complete email notification setup

## Recent Updates (v2.1.0)

- ✅ **Enhanced Publications**: Dynamic year-wise filtering for newsletters
- ✅ **Role-based Routing**: Team members now access dedicated member dashboard  
- ✅ **Student Management**: Migrated from HR to Team member dashboard
- ✅ **Mobile UX**: Auto-collapsing navigation for better mobile experience
- ✅ **Email System**: Rich HTML notifications to dual HR addresses
- ✅ **Documentation**: Comprehensive setup and API documentation

## Contributing

1. Create a feature branch from `main`
2. Make your changes following existing patterns
3. Test thoroughly in both development environments
4. Submit a pull request with descriptive commit messages

## Project Architecture

```
DOC/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components and dashboards
│   │   ├── config/         # API configuration
│   │   └── assets/         # Images and static files
│   └── ...
├── server/                 # Express backend
│   ├── controllers/        # Request handlers
│   ├── models/            # Database schemas
│   ├── routes/            # API routes
│   ├── middleware/        # Authentication & authorization
│   ├── utils/             # Helper functions (email service)
│   └── ...
├── EMAIL_SETUP.md         # Email configuration guide
└── README.md              # This file
```

## License

This project is proprietary and belongs to Drops of Change NGO. 