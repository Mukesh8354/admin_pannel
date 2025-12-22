const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

mongoose.connect(
  "mongodb+srv://mukeshreck907_db_user:contactform@cluster0.y0luz1n.mongodb.net/adminpanel"
);

(async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await Admin.create({
    email: "admin@gmail.com",
    password: hashedPassword,
  });

  console.log("Admin Created");
  process.exit();
})();
