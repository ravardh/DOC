# Drops of Change NGO - Backend API

This is the backend API for the Drops of Change NGO website, built with Node.js, Express, and MongoDB.

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Cloudinary for image/file uploads
- **Email**: Nodemailer with Gmail SMTP
- **Password Hashing**: bcrypt
- **Logging**: Morgan
- **CORS**: Cross-Origin Resource Sharing enabled

## Project Structure

```
/server
├── /config              # Configuration files
│   ├── cloudinary.js    # Cloudinary configuration
│   └── db.js           # MongoDB connection
├── /controllers         # Request handlers for different routes
│   ├── adminController.js    # Admin management
│   ├── authController.js     # Authentication
│   ├── hrController.js       # HR operations (volunteers, interns, students)
│   └── publicController.js   # Public operations (contact, donations, announcements)
├── /middleware          # Custom middleware functions
│   ├── auth.js          # Authentication & authorization middleware
│   └── upload.js        # File upload middleware (Multer + Cloudinary)
├── /models              # Mongoose schema definitions
│   ├── announcement.js  # Public announcements
│   ├── Applicant.js     # Volunteer/Intern applications
│   ├── Contact.js       # Contact form submissions
│   ├── CoreTeam.js      # Core team members
│   ├── Donation.js      # Donation records
│   ├── gallery.js       # Gallery images
│   ├── Publication.js   # Publications (newsletters, reports)
│   ├── Student.js       # Student records
│   ├── User.js          # User accounts (admin, hr, team)
│   ├── Visitor.js       # Website visitors
│   └── volunteer.js     # Volunteer records
├── /routes              # API route definitions
│   ├── admin.js         # Admin routes
│   ├── auth.js          # Authentication routes
│   ├── hr.js            # HR routes
│   ├── public.js        # Public routes
│   └── team.js          # Team member routes
├── /utils               # Utility functions and helper methods
│   └── emailService.js  # Email notification service
├── /seeders             # Database seeders
│   └── seed.js          # Sample data seeder
├── .env.example         # Example environment variables
├── .env                 # Environment variables (not in repo)
├── package.json         # Project dependencies and scripts
└── server.js            # Entry point of the application
```

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login and get authentication token
- `POST /api/auth/logout` - Logout current user

### Admin Management

- `POST /api/admin/users` - Create a new user
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/gallery` - Get gallery images
- `POST /api/admin/gallery` - Upload gallery image
- `DELETE /api/admin/gallery/:id` - Delete gallery image
- `GET /api/admin/coreteam` - Get core team members
- `POST /api/admin/coreteam` - Add core team member
- `PUT /api/admin/coreteam/:id` - Update core team member
- `DELETE /api/admin/coreteam/:id` - Delete core team member
- `GET /api/admin/donations` - Get all donations
- `PUT /api/admin/donations/:id` - Update donation status
- `GET /api/admin/publications` - Get publications
- `POST /api/admin/publications` - Create publication
- `PUT /api/admin/publications/:id` - Update publication
- `DELETE /api/admin/publications/:id` - Delete publication

### HR Management

- `GET /api/hr/applicants` - Get all applicants (volunteers & interns)
- `PUT /api/hr/applicants/:id` - Update applicant status
- `POST /api/hr/applicants/volunteer` - Submit volunteer application (with email notification)
- `POST /api/hr/applicants/intern` - Submit intern application (with email notification)
- `GET /api/hr/contact` - Get contact form submissions

### Team Member Management

- `GET /api/team/students` - Get all students (team access)
- `POST /api/team/students` - Add a new student (team access)
- `PUT /api/team/students/:id` - Update student (team access)

### Public Endpoints

- `GET /api/public/Announcement` - Get all public announcements
- `POST /api/public/contact` - Submit contact form (with email notification)
- `POST /api/public/donation` - Submit a donation (with email notification)
- `GET /api/public/gallery` - Get public gallery
- `GET /api/public/coreteam` - Get core team (public view)
- `GET /api/public/publications` - Get publications (public view)
- `GET /api/public/visitors` - Get visitor count
- `POST /api/public/visitors` - Update visitor count

## Database Models

### User Model

```javascript
{
  email: String (required, unique),
  password: String (required, hashed with bcrypt),
  role: String (enum: ['admin', 'hr', 'team'], required),
  createdAt: Date (default: Date.now)
}
```

### Student Model

```javascript
{
  name: String (required),
  gender: String (enum: ['male', 'female', 'other']),
  fatherName: String,
  motherName: String,
  dob: Date,
  admissionDate: Date,
  age: Number,
  address: String,
  area: String,
  contactNumber: String,
  admittedInSchool: Boolean (default: false),
  schoolName: String,
  classStudying: String,
  aadharCard: String,
  endDate: Date,
  createdAt: Date (default: Date.now)
}
```

### Applicant Model (Volunteers & Interns)

```javascript
{
  type: String (enum: ['volunteer', 'intern'], required),
  name: String (required),
  email: String (required),
  phone: String (required),
  gender: String (required),
  dob: Date (required),
  interests: [String],
  availability: String (required),
  experience: String (required for volunteers),
  reference: String,
  // Intern-specific fields
  course: String (required for interns),
  college: String (required for interns),
  duration: String (required for interns),
  // Status tracking
  status: String (enum: ['pending', 'reviewed', 'approved', 'rejected', 'onboarded']),
  assignedPosition: String,
  assignedTeam: String,
  interviewDate: Date,
  doj: Date,
  dol: Date,
  createdAt: Date (default: Date.now)
}
```

### Contact Model

```javascript
{
  name: String (required),
  email: String (required),
  phone: String,
  subject: String,
  message: String (required),
  createdAt: Date (default: Date.now)
}
```

### Donation Model

```javascript
{
  donorName: String,
  email: String,
  phone: String,
  amount: Number (required),
  paymentMethod: String,
  transactionId: String,
  screenshotPath: String (Cloudinary URL),
  message: String,
  status: String (default: 'pending'),
  date: Date (default: Date.now),
  createdAt: Date (default: Date.now)
}
```

### Publication Model

```javascript
{
  title: String (required),
  description: String,
  type: String (enum: ['newsletter', 'annual_report'], required),
  publishDate: Date (required),
  fileUrl: String (Cloudinary URL, required),
  flipbookUrl: String,
  coverImage: String (Cloudinary URL),
  createdAt: Date (default: Date.now)
}
```

### CoreTeam Model

```javascript
{
  name: String (required),
  position: String (required),
  image: String (Cloudinary URL),
  bio: String,
  socialLinks: {
    linkedin: String,
    twitter: String,
    email: String
  },
  order: Number (default: 0),
  createdAt: Date (default: Date.now)
}
```

### Gallery Model

```javascript
{
  title: String (required),
  description: String,
  imageUrl: String (Cloudinary URL, required),
  category: String,
  createdAt: Date (default: Date.now)
}
```

## Setup and Installation

### Prerequisites

- Node.js (v16 or later)
- MongoDB (local or Atlas)
- npm or yarn
- Cloudinary account (for file storage)
- Gmail account with App Password (for email notifications)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/drops-of-change.git
   cd drops-of-change/server
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the `/server` directory with the following variables:
   ```env
   PORT=4500
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
   JWT_SECRET=your_jwt_secret_key_here
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   
   # Email Configuration (Gmail SMTP)
   EMAIL_USER=hr.dropsofchange@gmail.com
   EMAIL_PASS=your_gmail_app_password_here
   
   # Frontend URL
   FRONTEND_URL=http://localhost:5173
   ```

4. Seed the database (optional):
   ```bash
   npm run seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or for production:
   npm start
   ```

6. The API will be available at `http://localhost:4500/api`

## Email Notification System

The API includes an automated email notification system that sends emails to both `hr.dropsofchange@gmail.com` and `Dropsofchange4@gmail.com` when:

- Volunteer applications are submitted
- Internship applications are submitted  
- Donations are made
- Contact forms are submitted

### Email Features

- **Rich HTML Templates**: Professional, branded email designs
- **Complete Data**: All form information included in organized tables
- **Dual Delivery**: Automatically sends to both HR email addresses
- **Error Handling**: Graceful failure management
- **Image Support**: Payment screenshots included in donation emails

### Email Setup

1. Enable 2-Step Verification on Gmail
2. Generate an App Password in Google Account settings
3. Add the App Password to your `.env` file as `EMAIL_PASS`

For detailed setup instructions, see `EMAIL_SETUP.md` in the project root.

## Authentication and Authorization

The API uses JWT for authentication with role-based access control:

- **Admin**: Full access to all endpoints
- **HR**: Access to HR operations (volunteers, interns, contacts, announcements)  
- **Team**: Limited access to student management only

### User Roles

### User Roles

```javascript
// Role hierarchy and access levels
admin: {
  access: ['all endpoints', 'user management', 'system configuration'],
  dashboard: '/admin-dashboard',
  description: 'Full system access and user management'
},
hr: {
  access: ['volunteers', 'interns', 'contacts', 'announcements'],
  dashboard: '/hr-dashboard', 
  description: 'Human resources and applicant management'
},
team: {
  access: ['students management only'],
  dashboard: '/member-dashboard',
  description: 'Limited access for team members to manage students'
}

// Access inheritance: admin > hr > team
```

### Protected Routes

Include JWT token in request header:
```
Authorization: Bearer {your_jwt_token}
```

## File Upload System

The API uses Cloudinary for file storage with the following features:

- **Image Optimization**: Automatic compression and format optimization
- **Secure Storage**: Cloud-based file storage with CDN delivery
- **Multiple File Types**: Support for images, PDFs, and documents
- **Organized Folders**: Files organized by type (donations, gallery, publications, etc.)

### Supported File Types

- **Images**: JPG, PNG, WEBP, GIF
- **Documents**: PDF files for publications
- **Screenshots**: Payment proof images for donations

## Database Seeding

The project includes a comprehensive seeder for development and testing:

```bash
npm run seed
```

This creates sample data for:
- Admin and HR users
- Students, volunteers, and interns
- Announcements and publications
- Gallery images and core team members
- Sample donations and contacts

## Development Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run seed       # Seed database with sample data
```

## Error Handling

- Centralized error handling with descriptive messages
- Proper HTTP status codes for all responses
- Validation errors returned with field-specific messages
- Email notification failures don't block form submissions

## Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Role-Based Access**: Hierarchical permission system
- **CORS Configuration**: Proper cross-origin setup
- **Environment Variables**: Sensitive data protection
- **App Passwords**: Gmail SMTP with App Password security

## API Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

## Recent Updates

### v2.1.0 (Latest)
- ✅ **Enhanced Year-wise Publications**: Dynamic year filtering for newsletters with automatic newest year selection
- ✅ **Role-based Dashboard Routing**: Team members now access dedicated member dashboard
- ✅ **Student Management Migration**: Moved all student operations from HR to Team member dashboard
- ✅ **Auto-collapsing Mobile Navigation**: Improved mobile UX with automatic navbar collapse
- ✅ **Comprehensive Email Notifications**: Rich HTML emails for all form submissions to dual HR addresses
- ✅ **Enhanced Documentation**: Complete setup guides and API documentation

### v2.0.0 
- ✅ **Email Notification System**: Automated emails for all form submissions
- ✅ **Team Member Dashboard**: Dedicated dashboard for team role with student management
- ✅ **Enhanced Security**: Role-based access control with proper middleware
- ✅ **Cloudinary Integration**: Professional file storage and optimization
- ✅ **Student Management**: Complete CRUD operations for student records
- ✅ **Publication System**: Newsletter and annual report management
- ✅ **Gallery Management**: Dynamic image gallery with admin controls
- ✅ **Core Team Management**: Team member profiles with social links

### Key Features
- 🎯 **Multi-role Authentication**: Admin, HR, and Team member access levels with proper routing
- 📧 **Automatic Email Notifications**: Professional HTML emails for all submissions to dual HR addresses
- 📱 **Mobile-Responsive**: API designed for mobile and desktop applications with auto-collapsing navigation
- 🔒 **Secure File Uploads**: Cloudinary integration with organized folder structure
- 📊 **Comprehensive Analytics**: Visitor tracking and donation management
- 🎨 **Rich Content Management**: Publications with year-wise filtering, announcements, and gallery systems
- 👥 **Role-based Dashboards**: Separate dashboards for Admin, HR, and Team members with tailored functionality
- 📅 **Dynamic Publication Filtering**: Year-wise newsletter filtering with automatic newest year selection

## Contributing

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following the existing patterns

3. Test your changes:
   ```bash
   npm test
   ```

4. Commit your changes:
   ```bash
   git commit -m "Add your descriptive commit message"
   ```

5. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```

6. Create a Pull Request

## Best Practices

- ✅ Follow RESTful API design principles
- ✅ Validate all input data at controller level
- ✅ Handle errors gracefully with proper HTTP status codes
- ✅ Use async/await for asynchronous operations
- ✅ Keep controllers lean and focused
- ✅ Use meaningful variable and function names
- ✅ Write descriptive commit messages
- ✅ Secure sensitive routes with appropriate middleware
- ✅ Test email functionality in development environment

## Support & Documentation

- **Email Setup Guide**: See `EMAIL_SETUP.md` for detailed email configuration
- **API Documentation**: All endpoints documented with request/response examples
- **Environment Setup**: Complete `.env.example` file provided
- **Database Models**: Comprehensive schema documentation included

For technical support or questions, please contact the development team.
