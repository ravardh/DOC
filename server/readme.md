Below is a detailed document outlining the backend structure for your Node.js server with MongoDB as the database. This document includes the project structure, API endpoints, database schema, and additional considerations for implementation.

---

# Backend Documentation for NGO Management System

## Overview
This backend is built using **Node.js** (JavaScript) with **MongoDB** as the database and integrates with **Cloudinary** for image storage. It provides APIs for managing an NGO's operations, including user authentication, HR functionalities, admin controls, team management, student records, and donation handling.

---

## Project Structure
Here’s a suggested folder structure for the backend:

```
ngo-backend/
├── config/                # Configuration files
│   ├── db.js              # MongoDB connection setup
│   └── cloudinary.js      # Cloudinary configuration
├── models/                # MongoDB schemas
│   ├── User.js            # Admin, HR, Team Member schema
│   ├── Applicant.js       # Volunteer and Intern applicants
│   ├── Gallery.js         # Gallery images
│   ├── Contact.js         # Contact form submissions
│   ├── Team.js            # Onboarded team members
│   ├── Student.js         # Student records
│   ├── CoreTeam.js        # Core team members
│   └── Donation.js        # Donation records
├── routes/                # API route definitions
│   ├── auth.js            # Authentication routes
│   ├── hr.js              # HR-specific routes
│   ├── admin.js           # Admin-specific routes
│   └── public.js          # Public-facing routes (e.g., contact, donation)
├── middleware/            # Middleware functions
│   ├── auth.js            # Authentication and role-based access control
│   └── upload.js          # File upload handling (e.g., Multer + Cloudinary)
├── controllers/           # Business logic for routes
│   ├── authController.js  # Login, logout, etc.
│   ├── hrController.js    # HR functionalities
│   ├── adminController.js # Admin functionalities
│   └── publicController.js# Public functionalities
├── utils/                 # Utility functions
│   └── errorHandler.js    # Centralized error handling
├── .env                   # Environment variables
├── server.js              # Entry point
└── package.json           # Dependencies and scripts
```

---

## Dependencies
Install the following npm packages:
```bash
npm install express mongoose bcrypt jsonwebtoken dotenv multer cloudinary cors
```

- **express**: Web framework for Node.js
- **mongoose**: MongoDB ODM
- **bcrypt**: Password hashing
- **jsonwebtoken**: JWT for authentication
- **dotenv**: Environment variable management
- **multer**: File upload handling
- **cloudinary**: Cloud storage for images
- **cors**: Enable CORS for frontend integration

---

## Environment Variables
Create a `.env` file in the root directory:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ngo_db
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## Database Schema (MongoDB)

### 1. User Schema (`models/User.js`)
For Admin, HR, and Team Members.
```javascript
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'hr', 'team'], required: true },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', userSchema);
```

### 2. Applicant Schema (`models/Applicant.js`)
Unified schema for Volunteers and Interns.
```javascript
const applicantSchema = new mongoose.Schema({
  type: { type: String, enum: ['volunteer', 'intern'], required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  dob: { type: Date, required: true },
  interests: [String],
  availability: { type: String, required: true },
  reference: { type: String },
  // Volunteer-specific
  experience: { type: String },
  // Intern-specific
  course: { type: String },
  college: { type: String },
  duration: { type: String },
  status: { type: String, enum: ['pending', 'interview', 'onboarded', 'rejected'], default: 'pending' },
  interviewDate: { type: Date },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Applicant', applicantSchema);
```

### 3. Gallery Schema (`models/Gallery.js`)
```javascript
const gallerySchema = new mongoose.Schema({
  imagePath: { type: String, required: true }, // Cloudinary URL
  category: { type: String, required: true },
  name: { type: String, required: true },
  uploadTimestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Gallery', gallerySchema);
```

### 4. Contact Schema (`models/Contact.js`)
```javascript
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Contact', contactSchema);
```

### 5. Team Schema (`models/Team.js`)
```javascript
const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true },
  whatsappNumber: { type: String },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  dob: { type: Date, required: true },
  reference: { type: String },
  availability: { type: String, required: true },
  ngoExperience: { type: Boolean, default: false },
  identityProofPath: { type: String }, // Cloudinary URL
  passportPhotoPath: { type: String }, // Cloudinary URL
  workMode: { type: String, enum: ['online', 'offline', 'hybrid'], required: true },
  teamType: { type: String, enum: ['volunteer', 'intern'], required: true },
  department: { type: String, required: true },
  joiningDate: { type: Date, required: true }
});
module.exports = mongoose.model('Team', teamSchema);
```

### 6. Student Schema (`models/Student.js`)
```javascript
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  dob: { type: Date, required: true },
  admissionDate: { type: Date, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  area: { type: String, required: true },
  contactNumber: { type: String, required: true },
  admittedInSchool: { type: Boolean, default: false },
  schoolName: { type: String },
  classStudying: { type: String },
  aadharCard: { type: String },
  endDate: { type: Date }
});
module.exports = mongoose.model('Student', studentSchema);
```

### 7. CoreTeam Schema (`models/CoreTeam.js`)
```javascript
const coreTeamSchema = new mongoose.Schema({
  profilePhotoPath: { type: String }, // Cloudinary URL
  name: { type: String, required: true },
  position: { type: String, required: true },
  linkedin: { type: String },
  instagram: { type: String },
  active: { type: Boolean, default: true },
  joiningDate: { type: Date, required: true },
  endingDate: { type: Date },
  order: { type: Number, required: true }
});
module.exports = mongoose.model('CoreTeam', coreTeamSchema);
```

### 8. Donation Schema (`models/Donation.js`)
```javascript
const donationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  screenshotPath: { type: String }, // Cloudinary URL
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  mode: { type: String, required: true },
  utr: { type: String, required: true },
  date: { type: Date, required: true },
  receiptRequested: { type: Boolean, default: true },
  receiptGenerated: { type: Boolean, default: false }
});
module.exports = mongoose.model('Donation', donationSchema);
```

---

## API Endpoints

### Authentication Routes (`routes/auth.js`)
| Method | Endpoint            | Role       | Description                     |
|--------|---------------------|------------|---------------------------------|
| POST   | `/api/auth/login`   | All        | Login with email and password   |
| POST   | `/api/auth/logout`  | All        | Logout (invalidate token)       |

### HR Routes (`routes/hr.js`)
| Method | Endpoint                          | Description                              |
|--------|-----------------------------------|------------------------------------------|
| POST   | `/api/hr/gallery`                 | Upload a new gallery image               |
| GET    | `/api/hr/gallery`                 | Get all gallery images                   |
| PUT    | `/api/hr/gallery/:id`             | Update gallery image details             |
| DELETE | `/api/hr/gallery/:id`             | Delete a gallery image                   |
| POST   | `/api/hr/applicants/volunteer`    | Submit volunteer application             |
| POST   | `/api/hr/applicants/intern`       | Submit intern application                |
| GET    | `/api/hr/applicants`              | Get all applicants                       |
| PUT    | `/api/hr/applicants/:id/interview`| Schedule interview for an applicant      |
| PUT    | `/api/hr/applicants/:id/onboard`  | Onboard an applicant to team             |
| GET    | `/api/hr/contact`                 | Get all contact form submissions         |
| GET    | `/api/hr/team`                    | Get all team members                     |
| PUT    | `/api/hr/team/:id`                | Update team member details               |
| GET    | `/api/hr/students`                | Get all student records                  |
| POST   | `/api/hr/students`                | Add a new student record                 |
| PUT    | `/api/hr/students/:id`            | Update student record                    |

### Admin Routes (`routes/admin.js`)
| Method | Endpoint                  | Description                          |
|--------|---------------------------|--------------------------------------|
| POST   | `/api/admin/users`        | Create a new user (Admin/HR)         |
| GET    | `/api/admin/users`        | Get all users                        |
| PUT    | `/api/admin/users/:id`    | Update user details                  |
| DELETE | `/api/admin/users/:id`    | Delete a user                        |
| POST   | `/api/admin/coreteam`     | Add a core team member               |
| GET    | `/api/admin/coreteam`     | Get all core team members            |
| PUT    | `/api/admin/coreteam/:id` | Update core team member details      |
| DELETE | `/api/admin/coreteam/:id` | Delete a core team member            |

### Public Routes (`routes/public.js`)
| Method | Endpoint              | Description                          |
|--------|-----------------------|--------------------------------------|
| POST   | `/api/public/contact` | Submit contact form                  |
| POST   | `/api/public/donate`  | Submit donation details              |

---

## Middleware

### Authentication (`middleware/auth.js`)
```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Access denied' });
  }
  next();
};

module.exports = { auth, restrictTo };
```

### File Upload (`middleware/upload.js`)
```javascript
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: 'ngo', allowed_formats: ['jpg', 'png', 'pdf'] }
});

const upload = multer({ storage });
module.exports = upload;
```

---

## Example Implementation (`server.js`)
```javascript
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const hrRoutes = require('./routes/hr');
const adminRoutes = require('./routes/admin');
const publicRoutes = require('./routes/public');
const { auth } = require('./middleware/auth');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/hr', auth, hrRoutes);
app.use('/api/admin', auth, adminRoutes);
app.use('/api/public', publicRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

## Additional Considerations
1. **Security**:
   - Hash passwords using `bcryptjs`.
   - Use JWT for session management.
   - Validate all inputs to prevent injection attacks.
   - Use HTTPS in production.

2. **Cloudinary Integration**:
   - Store images (gallery, identity proofs, etc.) on Cloudinary and save the URL in MongoDB.

3. **Scalability**:
   - Add pagination for GET requests (e.g., `/api/hr/team`, `/api/hr/students`).
   - Use indexing in MongoDB for frequently queried fields (e.g., `email`, `name`).

4. **Error Handling**:
   - Implement a centralized error handler in `utils/errorHandler.js`.

5. **Frontend Integration**:
   - Ensure APIs return JSON responses compatible with the frontend dashboard.

---

This document provides a comprehensive foundation for your backend. You can expand it by adding specific controller logic, input validation, and testing as needed. Let me know if you’d like help with any specific part of the implementation!