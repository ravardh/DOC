import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|webp|pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG, PNG, PDF and WebP files are allowed'));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload; 