import multer from "multer";
import path from "path";

// 1️⃣ Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/raw-materials"); // ✅ specific folder
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const safeName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, safeName + ext);
  },
});

// 2️⃣ File filter (only images)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// 3️⃣ Multer instance
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // ✅ 2MB limit
  },
});
