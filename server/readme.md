# Drops of Change NGO - Backend API

This is the backend API for the Drops of Change NGO website, built with Node.js, Express, and MongoDB.

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Multer for local storage, AWS S3 for production
- **Email**: Nodemailer
- **Validation**: Express-validator
- **Payment Integration**: Razorpay

## Project Structure

```
/server
├── /config              # Configuration files and environment variables
├── /controllers         # Request handlers for different routes
│   ├── authController.js
│   ├── donationController.js
│   ├── publicController.js
│   ├── studentController.js
│   ├── userController.js
│   └── ...
├── /middleware          # Custom middleware functions
│   ├── auth.js          # Authentication middleware
│   ├── errorHandler.js  # Error handling middleware
│   ├── upload.js        # File upload middleware
│   └── ...
├── /models              # Mongoose schema definitions
│   ├── announcement.js
│   ├── donation.js
│   ├── student.js
│   ├── user.js
│   ├── volunteer.js
│   └── ...
├── /routes              # API route definitions
│   ├── authRoutes.js
│   ├── donationRoutes.js
│   ├── publicRoutes.js
│   ├── studentRoutes.js
│   └── ...
├── /utils               # Utility functions and helper methods
│   ├── email.js
│   ├── fileUpload.js
│   ├── paymentGateway.js
│   └── ...
├── /uploads             # Local file uploads (for development)
├── .env.example         # Example environment variables
├── package.json         # Project dependencies and scripts
└── server.js            # Entry point of the application
```

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login and get authentication token
- `GET /api/auth/me` - Get current user profile
- `POST /api/auth/logout` - Logout current user

### Admin Management

- `POST /api/admin/users` - Create a new admin user
- `GET /api/admin/users` - Get all admin users
- `GET /api/admin/users/:id` - Get admin user by ID
- `PUT /api/admin/users/:id` - Update admin user
- `DELETE /api/admin/users/:id` - Delete admin user
- `GET /api/admin/dashboard` - Get admin dashboard statistics

### Students Management

- `GET /api/hr/students` - Get all students
- `POST /api/hr/students` - Add a new student
- `GET /api/hr/students/:id` - Get student by ID
- `PUT /api/hr/students/:id` - Update student by ID
- `DELETE /api/hr/students/:id` - Delete student by ID

### Volunteers/Interns Management

- `GET /api/hr/volunteers` - Get all volunteers/interns
- `POST /api/hr/volunteers` - Add a new volunteer/intern
- `GET /api/hr/volunteers/:id` - Get volunteer/intern by ID
- `PUT /api/hr/volunteers/:id` - Update volunteer/intern by ID
- `DELETE /api/hr/volunteers/:id` - Delete volunteer/intern by ID
- `PUT /api/hr/volunteers/:id/status` - Update volunteer/intern status

### Announcement Management

- `GET /api/public/Announcement` - Get all public announcements
- `POST /api/public/Announcement` - Create an announcement (admin only)
- `PUT /api/public/Announcement/:id` - Update an announcement (admin only)
- `DELETE /api/public/Announcement/:id` - Delete an announcement (admin only)

### Contact Form

- `POST /api/public/contact` - Submit contact form
- `GET /api/hr/contact` - Get all contact form submissions (admin only)

### Donation Management

- `POST /api/public/donation` - Submit a donation (public)
- `GET /api/admin/donations` - Get all donations (admin only)
- `GET /api/admin/donations/:id` - Get donation by ID (admin only)
- `PUT /api/admin/donations/:id` - Update donation status (admin only)
- `GET /api/admin/donations/statistics` - Get donation statistics (admin only)

## Database Models

### User Model

```javascript
{
  name: String,
  email: String,
  password: String,
  role: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Student Model

```javascript
{
  name: String,
  DOB: Date,
  DOJ: Date,
  gender: String,
  fathersName: String,
  mothersName: String,
  address: String,
  contactNumber: String,
  admittedInSchool: Boolean,
  schoolName: String,
  grade: String,
  attendancePercentage: Number,
  isActive: Boolean,
  photo: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Volunteer/Intern Model

```javascript
{
  name: String,
  type: String, // volunteer or intern
  DOB: Date,
  DOJ: Date,
  DOL: Date,
  email: String,
  contactNumber: String,
  address: String,
  qualification: String,
  position: String,
  department: String,
  status: String,
  photo: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Announcement Model

```javascript
{
  Title: String,
  Announcement: String,
  order: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Donation Model

```javascript
{
  name: String,
  email: String,
  phone: String,
  amount: Number,
  purpose: String,
  paymentId: String,
  status: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Setup and Installation

### Prerequisites

- Node.js (v16 or later)
- MongoDB (local or Atlas)
- npm or yarn

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
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/drops-of-change
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   EMAIL_SERVICE=gmail
   EMAIL_USERNAME=your_email@gmail.com
   EMAIL_PASSWORD=your_email_app_password
   CLIENT_URL=http://localhost:3000
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. The API will be available at `http://localhost:5000/api`

## Running for Production

To start the server in production mode:

```bash
npm start
# or
yarn start
```

## Error Handling

The API uses a centralized error handling mechanism. All errors are passed through the errorHandler middleware which formats and returns appropriate HTTP responses.

## Authentication and Authorization

The API uses JWT for authentication. Protected routes require a valid JWT token to be included in the request header:

```
Authorization: Bearer {your_jwt_token}
```

## Data Validation

All incoming data is validated using express-validator before processing.

## File Uploads

Files are handled using Multer middleware. In development, files are stored locally in the `/uploads` directory. In production, files are uploaded to AWS S3.

## Environment Variables

For security reasons, sensitive information like API keys, database credentials, and JWT secrets are stored in environment variables.

## Contributing

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes

3. Run tests:
   ```bash
   npm test
   ```

4. Commit your changes:
   ```bash
   git commit -m "Add your commit message"
   ```

5. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```

6. Create a Pull Request

## Best Practices

- Follow RESTful API design principles
- Validate all input data
- Handle errors gracefully
- Use async/await for asynchronous operations
- Keep controllers lean by moving business logic to services
- Write clear and descriptive comments
- Secure sensitive routes with appropriate authentication

## Contact

For any questions or support regarding the backend API, please contact the development team.
