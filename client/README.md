# Drops of Change NGO - Frontend Application

This is the frontend application for the Drops of Change NGO website, built with React.js.

## Technology Stack

- **Framework**: React.js
- **Styling**: Tailwind CSS, Framer Motion for animations
- **Routing**: React Router v6
- **State Management**: React Hooks and Context API
- **HTTP Client**: Axios
- **UI Components**: Custom components with Tailwind CSS

## Project Structure

```
/client
├── /public             # Static files like favicon, logo
├── /src
│   ├── /assets         # Images, fonts and other static assets
│   ├── /components     # Reusable components
│   │   ├── /layouts    # Layout components
│   │   ├── /ui         # UI components (buttons, inputs, etc.)
│   │   └── ...         # Other components
│   ├── /config         # Configuration files
│   ├── /context        # React Context providers
│   ├── /hooks          # Custom React hooks
│   ├── /pages          # Page components for each route
│   │   ├── /About      # About page
│   │   ├── /Admin      # Admin section pages
│   │   ├── /Auth       # Authentication pages
│   │   ├── /Campaigns  # Campaign-specific pages
│   │   ├── /Dashboards # Dashboard pages
│   │   ├── /Support    # Support and donation pages
│   │   └── ...         # Other pages
│   ├── /utils          # Utility functions
│   ├── App.jsx         # Main App component
│   ├── index.css       # Global CSS
│   └── index.jsx       # App entry point
└── package.json        # Project dependencies and scripts
```

## Features

### Public Features

- **Home Page**: Showcase initiatives, impact statistics, and latest updates
- **About Page**: Information about the organization and its mission
- **Campaign Pages**: Detailed information about each initiative
- **Support Pages**: Donation and sponsorship options
- **Breaking News**: Dynamic news ticker with announcements
- **Contact**: Contact form and information

### Admin Features

- **Authentication**: Secure login for administrators
- **HR Dashboard**: Manage volunteers, interns, and students
- **Announcements**: Create and manage breaking news items
- **Content Management**: Update website content
- **Donation Tracking**: Track and manage donations

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
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. The application will be available at `http://localhost:3000`

## Build for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `build` directory.

## Main Components

### BreakingNews

A dynamic news ticker that displays announcements fetched from the API.

### Initiatives Section

Showcases the four main initiatives of the NGO with animated cards:
- Kids Education
- Support Homeless
- Sponsor a Child
- Skill Development

### Social Media Integration

Embedded feeds from Facebook and Instagram to display recent posts and updates.

### Responsive Design

The website is fully responsive and provides an optimal viewing experience across devices of all sizes.

## Contributing

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes

3. Commit your changes:
   ```bash
   git commit -m "Add your commit message"
   ```

4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```

5. Create a Pull Request

## Best Practices

- Follow the component structure and naming conventions
- Use Tailwind CSS for styling
- Ensure responsive design for all components
- Write clean, reusable, and well-documented code
- Use React hooks appropriately
- Handle errors gracefully

## Contact

For any questions or support regarding the frontend application, please contact the development team. 