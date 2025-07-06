import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Applicant from "../models/Applicant.js";
import Contact from "../models/Contact.js";
import Student from "../models/Student.js";
import CoreTeam from "../models/CoreTeam.js";
import Donation from "../models/Donation.js";
import Announcement from "../models/announcement.js";
import bcrypt from "bcrypt";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Clear existing data
const clearData = async () => {
  try {
    await User.deleteMany({});
    // await Applicant.deleteMany({});
    // await Contact.deleteMany({});
    // await Student.deleteMany({});
    // await CoreTeam.deleteMany({});
    // await Donation.deleteMany({});
    // await Announcement.deleteMany({});
    console.log("Cleared existing data");
  } catch (error) {
    console.error("Error clearing data:", error);
  }
};

const seedAnnouncements = async () => {
  try {
    const announcements = [
      {
        "Title": "Sushiksha Pathshala",
        "Announcement": "Sushiksha Pathshala expands to new slum areas!",
        "order": 1
      },
      {
        "Title": "Volunteer drive",
        "Announcement": "Volunteer drive this weekend - Join us to teach!",
        "order": 2
      },
      {
        "Title": "Project Nayi Udaan",
        "Announcement": "Project Nayi Udaan adopts 5 more children this month!",
        "order": 3
      },
      {
        "Title": "Help us",
        "Announcement": "Help us collect books and stationery for underprivileged kids.",
        "order": 4
      },
      {
        "Title": "Education awareness",
        "Announcement": "Education awareness campaign launched in Delhi slums!",
        "order": 5
      }
    ]
    

    await Announcement.insertMany(announcements);
    console.log("Seeded Announcements");
    process.exit();
  } catch (error) {
    console.error("Error seeding announcements", error);
    process.exit(1);
  }
};


// Seed Users
const seedUsers = async () => {
  try {
    const users = [
      {
        email: "admin@dropsofchange.in",
        password: await bcrypt.hash("Admin.Raj@2025", 10),
        role: "admin",
      },
      {
        email: "hr@dropsofchange.in",
        password: await bcrypt.hash("Hr.Yogita@2025", 10),
        role: "hr",
      },
      {
        email: "teacher@dropsofchange.in",
        password: await bcrypt.hash("Teacher@2025", 10),
        role: "team",
      },
      // {
      //   email: "teamMember1@ngo.com",
      //   password: await bcrypt.hash("team123", 10),
      //   role: "team",
      // },
      // {
      //   email: "teamMember2@ngo.com",
      //   password: await bcrypt.hash("team123", 10),
      //   role: "team",
      // },
    ];

    await User.insertMany(users);
    console.log("Seeded users");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};

// Seed Applicants
const seedApplicants = async () => {
  try {
    const applicants = [
      {
        type: "volunteer",
        name: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
        gender: "male",
        dob: new Date("1990-01-01"),
        interests: "fund Raising",
        availability: "7",
        experience: "5 years in teaching",
        status: "pending",
        reference: "Facebook",
      },
      {
        type: "intern",
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "9876543210",
        gender: "female",
        dob: new Date("1995-05-15"),
        interests: "Graphics Designing",
        availability: "Weekends",
        course: "B.tech",
        college: "ABC college of Technology",
        duration: "6 months",
        reference: "instagram",
        status: "interview",
        interviewDate: new Date("2024-04-01"),
      },
    ];

    await Applicant.insertMany(applicants);
    console.log("Seeded applicants");
  } catch (error) {
    console.error("Error seeding applicants:", error);
  }
};

// Seed Contacts
const seedContacts = async () => {
  try {
    const contacts = [
      {
        name: "Alice Johnson",
        email: "alice@example.com",
        message: "Interested in volunteering opportunities",
      },
      {
        name: "Bob Wilson",
        email: "bob@example.com",
        message: "Would like to make a donation",
      },
      {
        name: "Carol Martinez",
        email: "carol@example.com",
        message: "Looking for internship opportunities",
      },
      {
        name: "Daniel Kim",
        email: "daniel@example.com",
        message: "Interested in partnership opportunities",
      },
      {
        name: "Eva Rodriguez",
        email: "eva@example.com",
        message: "Want to sponsor a child's education",
      },
    ];

    await Contact.insertMany(contacts);
    console.log("Seeded contacts");
  } catch (error) {
    console.error("Error seeding contacts:", error);
  }
};

// Seed Students
const seedStudents = async () => {
  try {
    const students = [
      {
        name: "Rahul Kumar",
        gender: "male",
        fatherName: "Rajesh Kumar",
        motherName: "Priya Kumar",
        dob: new Date("2010-06-15"),
        admissionDate: new Date("2024-01-01"),
        age: 14,
        address: "456 School St, City",
        area: "Urban",
        contactNumber: "9876543210",
        admittedInSchool: true,
        schoolName: "City Public School",
        classStudying: "9th",
      },
      {
        name: "Priya Sharma",
        gender: "female",
        fatherName: "Amit Sharma",
        motherName: "Neha Sharma",
        dob: new Date("2012-03-20"),
        admissionDate: new Date("2024-01-15"),
        age: 12,
        address: "789 Education St, City",
        area: "Urban",
        contactNumber: "5555555555",
        admittedInSchool: true,
        schoolName: "City Public School",
        classStudying: "7th",
      },
      {
        name: "Aryan Patel",
        gender: "male",
        fatherName: "Rahul Patel",
        motherName: "Anjali Patel",
        dob: new Date("2011-09-10"),
        admissionDate: new Date("2024-02-01"),
        age: 13,
        address: "321 Learning St, City",
        area: "Rural",
        contactNumber: "4444444444",
        admittedInSchool: true,
        schoolName: "Rural Public School",
        classStudying: "8th",
      },
      {
        name: "Neha Gupta",
        gender: "female",
        fatherName: "Sanjay Gupta",
        motherName: "Meera Gupta",
        dob: new Date("2013-12-25"),
        admissionDate: new Date("2024-02-15"),
        age: 11,
        address: "654 Knowledge St, City",
        area: "Urban",
        contactNumber: "3333333333",
        admittedInSchool: true,
        schoolName: "City Public School",
        classStudying: "6th",
      },
      {
        name: "Aditya Singh",
        gender: "male",
        fatherName: "Vikram Singh",
        motherName: "Pooja Singh",
        dob: new Date("2010-04-30"),
        admissionDate: new Date("2024-03-01"),
        age: 14,
        address: "987 Study St, City",
        area: "Rural",
        contactNumber: "2222222222",
        admittedInSchool: true,
        schoolName: "Rural Public School",
        classStudying: "9th",
      },
    ];

    await Student.insertMany(students);
    console.log("Seeded students");
  } catch (error) {
    console.error("Error seeding students:", error);
  }
};

// Seed Core Team
const seedCoreTeam = async () => {
  try {
    const coreTeam = [
      {
        profilePhotoPath:
          "https://res.cloudinary.com/your-cloud-name/image/upload/v1/core-team/director.jpg",
        name: "Dr. Amit Patel",
        position: "Director",
        linkedin: "https://linkedin.com/in/amit-patel",
        instagram: "https://instagram.com/amit-patel",
        active: true,
        joiningDate: new Date("2020-01-01"),
        order: 1,
      },
      {
        profilePhotoPath:
          "https://res.cloudinary.com/your-cloud-name/image/upload/v1/core-team/co-director.jpg",
        name: "Dr. Priya Sharma",
        position: "Co-Director",
        linkedin: "https://linkedin.com/in/priya-sharma",
        instagram: "https://instagram.com/priya-sharma",
        active: true,
        joiningDate: new Date("2020-02-01"),
        order: 2,
      },
      {
        profilePhotoPath:
          "https://res.cloudinary.com/your-cloud-name/image/upload/v1/core-team/head-education.jpg",
        name: "Rahul Verma",
        position: "Head of Education",
        linkedin: "https://linkedin.com/in/rahul-verma",
        instagram: "https://instagram.com/rahul-verma",
        active: true,
        joiningDate: new Date("2020-03-01"),
        order: 3,
      },
      {
        profilePhotoPath:
          "https://res.cloudinary.com/your-cloud-name/image/upload/v1/core-team/head-healthcare.jpg",
        name: "Dr. Neha Gupta",
        position: "Head of Healthcare",
        linkedin: "https://linkedin.com/in/neha-gupta",
        instagram: "https://instagram.com/neha-gupta",
        active: true,
        joiningDate: new Date("2020-04-01"),
        order: 4,
      },
      {
        profilePhotoPath:
          "https://res.cloudinary.com/your-cloud-name/image/upload/v1/core-team/head-environment.jpg",
        name: "Arun Kumar",
        position: "Head of Environment",
        linkedin: "https://linkedin.com/in/arun-kumar",
        instagram: "https://instagram.com/arun-kumar",
        active: true,
        joiningDate: new Date("2020-05-01"),
        order: 5,
      },
    ];

    await CoreTeam.insertMany(coreTeam);
    console.log("Seeded core team");
  } catch (error) {
    console.error("Error seeding core team:", error);
  }
};

// Seed Donations
const seedDonations = async () => {
  try {
    const donations = [
      {
        name: "David Wilson",
        screenshotPath:
          "https://res.cloudinary.com/your-cloud-name/image/upload/v1/donations/donation1.jpg",
        email: "david@example.com",
        amount: 5000,
        mode: "UPI",
        utr: "UPI123456789",
        date: new Date("2024-03-01"),
        receiptRequested: true,
        receiptGenerated: true,
      },
      {
        name: "Sarah Johnson",
        screenshotPath:
          "https://res.cloudinary.com/your-cloud-name/image/upload/v1/donations/donation2.jpg",
        email: "sarah@example.com",
        amount: 10000,
        mode: "Bank Transfer",
        utr: "BANK987654321",
        date: new Date("2024-03-05"),
        receiptRequested: true,
        receiptGenerated: true,
      },
      {
        name: "Michael Chen",
        screenshotPath:
          "https://res.cloudinary.com/your-cloud-name/image/upload/v1/donations/donation3.jpg",
        email: "michael@example.com",
        amount: 2500,
        mode: "UPI",
        utr: "UPI987654321",
        date: new Date("2024-03-10"),
        receiptRequested: false,
        receiptGenerated: false,
      },
      {
        name: "Emily Davis",
        screenshotPath:
          "https://res.cloudinary.com/your-cloud-name/image/upload/v1/donations/donation4.jpg",
        email: "emily@example.com",
        amount: 7500,
        mode: "Bank Transfer",
        utr: "BANK123456789",
        date: new Date("2024-03-15"),
        receiptRequested: true,
        receiptGenerated: true,
      },
      {
        name: "Robert Wilson",
        screenshotPath:
          "https://res.cloudinary.com/your-cloud-name/image/upload/v1/donations/donation5.jpg",
        email: "robert@example.com",
        amount: 15000,
        mode: "UPI",
        utr: "UPI456789123",
        date: new Date("2024-03-20"),
        receiptRequested: true,
        receiptGenerated: true,
      },
    ];

    await Donation.insertMany(donations);
    console.log("Seeded donations");
  } catch (error) {
    console.error("Error seeding donations:", error);
  }
};

// Main seeding function
const seedDatabase = async () => {
  try {
    await connectDB();
    await clearData();
    await seedUsers();
    // await seedApplicants();
    // await seedContacts();
    // await seedStudents();
    // await seedCoreTeam();
    // await seedDonations();
    // await seedAnnouncements();
    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seeder
seedDatabase();
