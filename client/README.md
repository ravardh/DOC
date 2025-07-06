# Drops of Change NGO - Frontend Application

This is the frontend application for the Drops of Change NGO website, built with React.js and modern web technologies.

## Technology Stack

- **Framework**: React.js 18 with Vite for fast development
- **Styling**: Tailwind CSS for responsive design
- **Routing**: React Router v6 with role-based routing
- **State Management**: React Hooks and Context API
- **HTTP Client**: Axios for API communication
- **Animations**: Smooth transitions and interactions
- **Build Tool**: Vite for fast builds and hot module replacement

## Project Structure

```
/client
├── /public                    # Static files (favicon, images)
├── /src
│   ├── /assets               # Images, logos, and static resources
│   ├── /components           # Reusable UI components
│   │   ├── /admin           # Admin-specific components
│   │   │   ├── Contacts.jsx          # Contact management
│   │   │   ├── CoreTeamForm.jsx      # Core team management
│   │   │   ├── DonationRecords.jsx   # Donation tracking
│   │   │   ├── Gallery.jsx           # Gallery management
│   │   │   ├── PublicationManager.jsx # Publications management
│   │   │   └── UserForm.jsx          # User management
│   │   ├── /campaigns       # Campaign layout components
│   │   ├── /common          # Shared components (Modal, ScrollTop)
│   │   ├── /hr              # HR dashboard components
│   │   │   ├── InternsSection.jsx    # Intern management
│   │   │   ├── StudentsSection.jsx   # Student management (moved to member)
│   │   │   └── VolunteersSection.jsx # Volunteer management
│   │   ├── breakingNews.jsx         # Dynamic news ticker
│   │   ├── FlipbookViewer.jsx       # Publication flipbook viewer
│   │   ├── Footer.jsx               # Site footer
│   │   ├── imageCurtain.jsx         # Image overlay component
│   │   ├── Navbar.jsx               # Navigation (with auto-collapse)
│   │   └── TopHeader.jsx            # Top header section
│   ├── /config               # API configuration and endpoints
│   │   └── api.jsx          # Axios configuration and API base URL
│   ├── /pages               # Page components for each route
│   │   ├── /campaigns       # Individual campaign pages
│   │   │   ├── AooBatenKarein.jsx   # Mental health campaign
│   │   │   ├── Basta.jsx            # Education initiative
│   │   │   ├── GreenEarth.jsx       # Environmental campaign
│   │   │   ├── JagrukataAbhiyan.jsx # Awareness campaign
│   │   │   ├── Khushhaali.jsx       # Happiness initiative
│   │   │   ├── MehfilEMuskaan.jsx   # Community events
│   │   │   ├── NariShakti.jsx       # Women empowerment
│   │   │   ├── nayisambhawnayein.jsx # New possibilities
│   │   │   ├── NayiUdaan.jsx        # New flight initiative
│   │   │   ├── StreetAnimalCare.jsx # Animal welfare
│   │   │   └── SuSikshaPathshala.jsx # Quality education
│   │   ├── /Dashboards      # Role-based dashboards
│   │   │   ├── adminDashboard.jsx   # Admin management panel
│   │   │   ├── hrDashboard.jsx      # HR management panel
│   │   │   └── memberDashboard.jsx  # Team member panel (student mgmt)
│   │   ├── /support         # Support and donation pages
│   │   │   ├── Donation.jsx         # Donation form
│   │   │   └── internship.jsx       # Internship application
│   │   ├── About.jsx        # About page
│   │   ├── Campaigns.jsx    # Campaigns overview
│   │   ├── Contact.jsx      # Contact form
│   │   ├── Gallery.jsx      # Image gallery
│   │   ├── Home.jsx         # Homepage
│   │   ├── login.jsx        # Authentication page
│   │   ├── NotFound.jsx     # 404 error page
│   │   ├── Publications.jsx # Publications with year filtering
│   │   └── Support.jsx      # Support options
│   ├── App.jsx              # Main App component with routing
│   ├── index.css            # Global CSS and Tailwind imports
│   └── main.jsx             # App entry point
├── eslint.config.js         # ESLint configuration
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.js           # Vite build configuration
└── package.json             # Dependencies and scripts
```

## Features

### Public Features

- **Dynamic Homepage**: Showcase initiatives, impact statistics, and latest updates with animated components
- **Campaign Pages**: 11 detailed campaign pages with unique designs and information
- **Publications**: Newsletter and annual report viewing with year-wise filtering (defaults to newest year)
- **Gallery**: Dynamic image gallery with category-based filtering
- **Breaking News**: Real-time news ticker with announcements from the admin panel
- **Contact System**: Contact form with automated email notifications
- **Support Pages**: Donation and sponsorship forms with payment screenshot upload
- **Mobile-Responsive**: Auto-collapsing navigation and responsive design across all devices

### Role-Based Dashboard System

#### Admin Dashboard (`/admin-dashboard`)
- **User Management**: Create, update, and delete user accounts for HR and Team members
- **Gallery Management**: Upload, organize, and delete gallery images
- **Core Team Management**: Manage team member profiles with social links and bios
- **Donation Tracking**: View and update donation statuses, track payment screenshots
- **Publication Management**: Upload newsletters and annual reports with flipbook integration
- **Complete System Access**: Full administrative control over all platform features

#### HR Dashboard (`/hr-dashboard`)
- **Volunteer Management**: Review applications, update statuses, schedule interviews
- **Intern Management**: Process internship applications, assign positions and teams
- **Contact Management**: View and respond to contact form submissions
- **Announcement System**: Create and manage breaking news announcements
- **Application Workflow**: Complete applicant lifecycle management from submission to onboarding

#### Member Dashboard (`/member-dashboard`)
- **Student Management**: Complete CRUD operations for student records
- **Student Tracking**: Monitor admission status, school enrollment, and progress
- **Data Management**: Add, edit, and update student information and academic details
- **Focused Access**: Specialized interface for team members working directly with students

### Authentication & Security

- **JWT-based Authentication**: Secure token-based login system
- **Role-based Access Control**: Different access levels for Admin, HR, and Team members
- **Protected Routes**: Automatic redirection based on user roles
- **Session Management**: Secure logout and token expiration handling

### Modern UI/UX Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Auto-collapsing Navigation**: Mobile navbar automatically closes after link selection
- **Smooth Animations**: Enhanced user interactions and transitions
- **Modal Components**: Reusable modal system for forms and confirmations
- **Loading States**: User feedback during API operations
- **Error Handling**: Graceful error display and user guidance

## Setup and Installation

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/drops-of-change.git
   cd drops-of-change/client
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the `/client` directory with the following variables:
   ```env
   VITE_API_URL=http://localhost:4500/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. The application will be available at `http://localhost:5173`

## Build for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist` directory (Vite default).

## Available Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Create production build
npm run preview      # Preview production build locally
npm run lint         # Run ESLint for code quality
```

## Key Components

### Navbar Component
- **Auto-collapsing Mobile Menu**: Automatically closes after link selection on mobile devices
- **Role-based Navigation**: Different menu items based on user authentication status
- **Responsive Design**: Hamburger menu for mobile, full navigation for desktop

### Dashboard Components
- **adminDashboard.jsx**: Complete administrative interface with user, gallery, and content management
- **hrDashboard.jsx**: HR-focused interface for managing volunteers, interns, and announcements
- **memberDashboard.jsx**: Team member interface dedicated to student management operations

### Form Components
- **Dynamic Forms**: Volunteer, intern, donation, and contact forms with validation
- **File Upload**: Image upload functionality for donations and gallery
- **Real-time Validation**: User-friendly form validation and error handling

### Publication Features
- **FlipbookViewer.jsx**: Interactive PDF viewer for newsletters and reports
- **Year-wise Filtering**: Dynamic filtering system that defaults to the newest publication year
- **Download Integration**: Direct download links for publications

### Mobile Optimization
- **Auto-collapsing Navigation**: Mobile navbar automatically closes when user clicks any link
- **Touch-friendly Interface**: Optimized touch targets and gesture support
- **Progressive Enhancement**: Works seamlessly across all device sizes

## API Integration

The frontend communicates with the backend API using Axios:

```javascript
// API configuration in src/config/api.jsx
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4500/api';
```

### Authentication Flow
1. User logs in through `/login` page
2. JWT token stored in localStorage
3. Token included in all authenticated requests
4. Automatic redirection based on user role:
   - `admin` → `/admin-dashboard`
   - `hr` → `/hr-dashboard`
   - `team` → `/member-dashboard`

### Role-based Routing
- **Protected Routes**: Automatically redirect unauthorized users
- **Role Validation**: Backend validates user permissions for each request
- **Dashboard Access**: Each role has access to specific dashboard features

## Recent Updates (v2.1.0)

- ✅ **Enhanced Publications**: Dynamic year-wise filtering with automatic newest year selection
- ✅ **Mobile Navigation**: Auto-collapsing navbar for improved mobile UX
- ✅ **Dashboard Migration**: Moved student management from HR to Member dashboard
- ✅ **Role-based Routing**: Improved authentication flow and dashboard access
- ✅ **Component Organization**: Better separation of concerns across dashboard components
- ✅ **API Integration**: Enhanced error handling and loading states

## Best Practices

- ✅ Follow React component best practices and naming conventions
- ✅ Use Tailwind CSS for consistent styling and responsive design
- ✅ Implement proper error boundaries and error handling
- ✅ Write clean, reusable, and well-documented code
- ✅ Use React hooks appropriately (useState, useEffect, custom hooks)
- ✅ Handle loading states and user feedback effectively
- ✅ Maintain proper separation of concerns between components
- ✅ Follow role-based access patterns for secure functionality
- ✅ Test components across different screen sizes and devices
- ✅ Optimize performance with proper component structure

## Development Guidelines

### Component Structure
```javascript
// Example component structure
import { useState, useEffect } from 'react';
import axios from 'axios';

const ComponentName = () => {
  // State management
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API calls
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/endpoint');
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Render with proper error handling
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="responsive-container">
      {/* Component JSX */}
    </div>
  );
};

export default ComponentName;
```

### Styling Guidelines
- Use Tailwind CSS utility classes for styling
- Maintain consistent spacing and color schemes
- Implement responsive design from mobile-first approach
- Use semantic HTML elements for accessibility

## Contact

For any questions or support regarding the frontend application, please contact the development team. 