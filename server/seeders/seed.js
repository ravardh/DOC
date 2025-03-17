import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Applicant from "../models/Applicant.js";
import Gallery from "../models/Gallery.js";
import Contact from "../models/Contact.js";
import Team from "../models/Team.js";
import Student from "../models/Student.js";
import CoreTeam from "../models/CoreTeam.js";
import Donation from "../models/Donation.js";
import bcrypt from 'bcrypt';

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
    await Applicant.deleteMany({});
    await Gallery.deleteMany({});
    await Contact.deleteMany({});
    await Team.deleteMany({});
    await Student.deleteMany({});
    await CoreTeam.deleteMany({});
    await Donation.deleteMany({});
    console.log("Cleared existing data");
  } catch (error) {
    console.error("Error clearing data:", error);
  }
};

// Seed Users
const seedUsers = async () => {
  try {
    const users = [
      {
        email: "admin@ngo.com",
        password: await bcrypt.hash("admin123", 10),
        role: "admin",
      },
      {
        email: "hr@ngo.com",
        password: await bcrypt.hash("hr123", 10),
        role: "hr",
      },
      {
        email: "teamMember1@ngo.com",
        password: await bcrypt.hash("team123", 10),
        role: "team",
      },
      {
        email: "teamMember2@ngo.com",
        password: await bcrypt.hash("team123", 10),
        role: "team",
      },
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
        interests: ["Education", "Environment"],
        availability: "Weekends",
        experience: "5 years in teaching",
        status: "pending",
      },
      {
        type: "intern",
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "9876543210",
        gender: "female",
        dob: new Date("1995-05-15"),
        interests: ["Social Work", "Child Care"],
        availability: "Full Time",
        course: "Social Work",
        college: "University of Social Sciences",
        duration: "6 months",
        status: "interview",
        interviewDate: new Date("2024-04-01"),
      },
      {
        type: "volunteer",
        name: "Michael Chen",
        email: "michael@example.com",
        phone: "5555555555",
        gender: "male",
        dob: new Date("1988-08-20"),
        interests: ["Healthcare", "Elderly Care"],
        availability: "Evenings",
        experience: "3 years in healthcare",
        status: "pending",
      },
      {
        type: "intern",
        name: "Emily Davis",
        email: "emily@example.com",
        phone: "4444444444",
        gender: "female",
        dob: new Date("1997-12-10"),
        interests: ["Education", "Youth Development"],
        availability: "Full Time",
        course: "Education",
        college: "Teachers College",
        duration: "3 months",
        status: "interview",
        interviewDate: new Date("2024-04-05"),
      },
      {
        type: "volunteer",
        name: "David Wilson",
        email: "david@example.com",
        phone: "3333333333",
        gender: "male",
        dob: new Date("1992-03-25"),
        interests: ["Environment", "Community Development"],
        availability: "Weekends",
        experience: "2 years in environmental projects",
        status: "onboarded",
        joiningDate: new Date("2024-03-15"),
      },
    ];

    await Applicant.insertMany(applicants);
    console.log("Seeded applicants");
  } catch (error) {
    console.error("Error seeding applicants:", error);
  }
};

// Seed Gallery
const seedGallery = async () => {
  try {
    const gallery = [
      {
        imagePath:
          "https://res.cloudinary.com/your-cloud-name/image/upload/v1/gallery/event1.jpg",
        category: "Events",
        name: "Annual Fundraiser 2024",
      },
      {
        imagePath:
          "https://res.cloudinary.com/your-cloud-name/image/upload/v1/gallery/education1.jpg",
        category: "Education",
        name: "School Donation Drive",
      },
      {
        imagePath:
          "https://res.cloudinary.com/your-cloud-name/image/upload/v1/gallery/health1.jpg",
        category: "Healthcare",
        name: "Medical Camp 2024",
      },
      {
        imagePath:
          "https://res.cloudinary.com/your-cloud-name/image/upload/v1/gallery/environment1.jpg",
        category: "Environment",
        name: "Tree Plantation Drive",
      },
      {
        imagePath:
          "https://res.cloudinary.com/your-cloud-name/image/upload/v1/gallery/community1.jpg",
        category: "Community",
        name: "Community Clean-up Day",
      },
    ];

    await Gallery.insertMany(gallery);
    console.log("Seeded gallery");
  } catch (error) {
    console.error("Error seeding gallery:", error);
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

// Seed Team
const seedTeam = async () => {
  try {
    const team = [
      {
        name: "Sarah Brown",
        address: "123 Main St, City",
        email: "sarah@ngo.com",
        contactNumber: "1234567890",
        whatsappNumber: "1234567890",
        gender: "female",
        dob: new Date("1985-03-15"),
        availability: "Full Time",
        ngoExperience: true,
        workMode: "hybrid",
        teamType: "volunteer",
        department: "Education",
        joiningDate: new Date("2024-01-01"),
      },
      {
        name: "James Wilson",
        address: "456 Park Ave, City",
        email: "james@ngo.com",
        contactNumber: "9876543210",
        whatsappNumber: "9876543210",
        gender: "male",
        dob: new Date("1990-07-20"),
        availability: "Full Time",
        ngoExperience: true,
        workMode: "offline",
        teamType: "volunteer",
        department: "Healthcare",
        joiningDate: new Date("2023-12-01"),
      },
      {
        name: "Maria Garcia",
        address: "789 Oak St, City",
        email: "maria@ngo.com",
        contactNumber: "5555555555",
        whatsappNumber: "5555555555",
        gender: "female",
        dob: new Date("1988-11-30"),
        availability: "Part Time",
        ngoExperience: false,
        workMode: "online",
        teamType: "volunteer",
        department: "Environment",
        joiningDate: new Date("2024-02-15"),
      },
      {
        name: "Robert Chen",
        address: "321 Pine St, City",
        email: "robert@ngo.com",
        contactNumber: "4444444444",
        whatsappNumber: "4444444444",
        gender: "male",
        dob: new Date("1992-04-25"),
        availability: "Full Time",
        ngoExperience: true,
        workMode: "hybrid",
        teamType: "volunteer",
        department: "Community Development",
        joiningDate: new Date("2023-11-01"),
      },
      {
        name: "Lisa Anderson",
        address: "654 Maple St, City",
        email: "lisa@ngo.com",
        contactNumber: "3333333333",
        whatsappNumber: "3333333333",
        gender: "female",
        dob: new Date("1987-09-10"),
        availability: "Full Time",
        ngoExperience: true,
        workMode: "offline",
        teamType: "volunteer",
        department: "Education",
        joiningDate: new Date("2024-01-15"),
      },
    ];

    await Team.insertMany(team);
    console.log("Seeded team");
  } catch (error) {
    console.error("Error seeding team:", error);
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
    await seedApplicants();
    await seedGallery();
    await seedContacts();
    await seedTeam();
    await seedStudents();
    await seedCoreTeam();
    await seedDonations();
    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seeder
seedDatabase();
