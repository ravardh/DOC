import User from "../models/User.js";
import CoreTeam from "../models/CoreTeam.js";
import Gallery from "../models/gallery.js";
import cloudinary from "../config/cloudinary.js";
import Publication from "../models/Publication.js";

// User Management
export const createUser = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create(req.body);
    res.status(201).json({
      _id: user._id,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Core Team Management
export const addCoreTeamMember = async (req, res) => {
  try {
    console.log("adding core team member");

    let profilePhotoPath = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      profilePhotoPath = result.secure_url;
    }

    console.log("Photo Uploaded");
    console.log(req.body);

    const { name, position, linkedin, instagram, order } = req.body;

    const coreTeamData = {
      profilePhotoPath,
      name,
      position,
      linkedin,
      instagram,
      order: parseInt(order) || 1,
    };

    console.log("Processed Core Team Data:", coreTeamData);

    const coreTeam = await CoreTeam.create(coreTeamData);

    console.log("Core team member added:", coreTeam);

    res.status(201).json(coreTeam);
  } catch (error) {
    console.error("Error adding core team member:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getCoreTeamMembers = async (req, res) => {
  try {
    const coreTeam = await CoreTeam.find({ active: true }).sort("order");
    res.json(coreTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCoreTeamMember = async (req, res) => {
  try {
    let updateData = { ...req.body };
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.profilePhotoPath = result.secure_url;
    }

    const coreTeam = await CoreTeam.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );
    res.json(coreTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCoreTeamMember = async (req, res) => {
  try {
    await CoreTeam.findByIdAndUpdate(req.params.id, { active: false });
    res.json({ message: "Core team member deactivated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Gallery Management
export const addGalleryPicture = async (req, res) => {
  try {
    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const newGalleryImage = await Gallery.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      imageUrl: imageUrl,
    });

    res.status(201).json(newGalleryImage);
  } catch (error) {
    console.error("Error in addGalleryPicture:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getGalleryPicture = async (req, res) => {
  try {
    const images = await Gallery.find().sort("-createdAt");
    res.json(images);
  } catch (error) {
    console.error("Error in getGalleryPicture:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteGalleryPicture = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Extract public_id from Cloudinary URL if needed
    if (image.imageUrl) {
      const publicId = image.imageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error in deleteGalleryPicture:", error);
    res.status(500).json({ message: error.message });
  }
};

// Publication Controllers
export const createPublication = async (req, res) => {
  try {
    const { title, type, description, publishDate, fileUrl, flipbookUrl } = req.body;

    // Check for cover image in req.file (multer)
    if (!req.file) {
      return res.status(400).json({ message: "Cover image is required" });
    }

    if (!fileUrl) {
      return res.status(400).json({ message: "File URL is required" });
    }

    if (!flipbookUrl) {
      return res.status(400).json({ message: "Flipbook URL is required" });
    }

    console.log("Received file:", req.file);
    console.log("Request body:", req.body);

    // Upload cover image to Cloudinary
    const coverImageResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "publications/covers",
      resource_type: "image",
    });

    console.log("Cloudinary upload result:", coverImageResult);

    // Create new publication
    const publication = await Publication.create({
      title,
      type,
      description,
      publishDate,
      fileUrl,
      flipbookUrl,
      coverImage: coverImageResult.secure_url,
      isActive: true,
    });

    res.status(201).json(publication);
  } catch (error) {
    console.error("Error creating publication:", error);
    res.status(500).json({ message: "Error creating publication: " + error.message });
  }
};

export const getPublications = async (req, res) => {
  try {
    const publications = await Publication.find().sort({ publishDate: -1 });
    res.json(publications);
  } catch (error) {
    console.error("Error fetching publications:", error);
    res.status(500).json({ message: "Error fetching publications" });
  }
};

export const deletePublication = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) {
      return res.status(404).json({ message: "Publication not found" });
    }

    // Delete files from Cloudinary
    if (publication.coverImage) {
      const publicId = publication.coverImage.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    // Use findByIdAndDelete instead of remove()
    await Publication.findByIdAndDelete(req.params.id);
    res.json({ message: "Publication deleted successfully" });
  } catch (error) {
    console.error("Error deleting publication:", error);
    res.status(500).json({ message: "Error deleting publication" });
  }
};
