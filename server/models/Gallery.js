import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  imagePath: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  uploadTimestamp: { 
    type: Date, 
    default: Date.now 
  }
});

const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery; 