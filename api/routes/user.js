const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../config/check-auth');

const UserController = require('../controllers/user');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);

router.post("/:userId", checkAuth, upload.single('userImage'), UserController.update_user);
router.get("/:userId", checkAuth, UserController.get_userDetail);

module.exports = router;
