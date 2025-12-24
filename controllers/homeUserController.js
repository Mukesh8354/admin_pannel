import HomeUser from "../models/HomeUser.js";

// CREATE USER
export const createHomeUser = async (req, res) => {
  try {
    const { username, name, profile, themeNo, password } = req.body;

    if (!username || !name || !profile || !password) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    // duplicate username check
    const exists = await HomeUser.findOne({ username });
    if (exists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const user = await HomeUser.create({
      username,
      name,
      profile,
      themeNo,
      password,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL USERS
export const getHomeUsers = async (req, res) => {
  try {
    const users = await HomeUser.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE USER
export const updateHomeUser = async (req, res) => {
  try {
    const updated = await HomeUser.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE USER
export const deleteHomeUser = async (req, res) => {
  try {
    await HomeUser.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
