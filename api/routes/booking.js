const express = require("express");
const router = express.Router();
const checkAuth = require('../config/check-auth');

const GuideBookingController = require('../controllers/booking');

router.get("/", GuideBookingController.all_bookings);
router.post("/", checkAuth, GuideBookingController.save_booking);
router.put("/:id", checkAuth, GuideBookingController.update_booking);
router.get("/pending/:id", GuideBookingController.pending_bookings);
router.get("/guide/:id", checkAuth, GuideBookingController.guide_booking_data);
router.get("/user/:id", checkAuth, GuideBookingController.user_booking_data);
router.delete("/:id", checkAuth, GuideBookingController.delete_booking);
// router.put("/:userId/detail", checkAuth, GuideController.update_guideDetail);
// router.get("/:userId", checkAuth, GuideController.get_guideDetail);


module.exports = router;
