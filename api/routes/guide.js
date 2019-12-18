const express = require("express");
const router = express.Router();
const checkAuth = require('../config/check-auth');

const GuideController = require('../controllers/guide');

router.get("/detail", GuideController.guide_detail);
router.post("/detail", checkAuth, GuideController.save_guideDetail);
router.put("/:userId/detail", checkAuth, GuideController.update_guideDetail);
router.get("/:userId", checkAuth, GuideController.get_guideDetail);


module.exports = router;
