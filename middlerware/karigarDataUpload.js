import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads/karigar",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + "-" + file.fieldname + ext);
  },
});

export const karigarUpload = multer({ storage });
