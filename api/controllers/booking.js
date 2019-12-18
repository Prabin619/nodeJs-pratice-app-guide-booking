const mongoose = require("mongoose");

const User = require("../models/user");
const Guide = require("../models/guide");
const GuideBook = require("../models/booking");


exports.all_bookings = (req, res, next) => {
	GuideBook.find()
    .select()
    .populate(["guide_id", "user_id"])
    .exec()
    .then(docs => {
      res.status(200).json({
        data: docs
      });
      
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  
}

exports.pending_bookings = (req, res, next) => {
  console.log(req.params.id);
	let userId = req.params.id
	GuideBook.find({ status: "Pending", guide_id: userId})
    .select()
    .populate(["guide_id", "user_id"])
    .exec()
    .then(docs => {
      res.status(200).json({
        data: docs
      });
      
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  
}

exports.guide_booking_data = (req, res, next) => {
  let userId = req.params.id
  GuideBook.find({ guide_id: userId})
    .select()
    .populate(["guide_id", "user_id"])
    .exec()
    .then(docs => {
      res.status(200).json({
        data: docs
      });
      
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  
}

exports.user_booking_data = (req, res, next) => {
  let userId = req.params.id
  GuideBook.find({ user_id: userId})
    .select()
    .populate(["guide_id", "user_id"])
    .exec()
    .then(docs => {
      res.status(200).json({
        data: docs
      });
      
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  
}

exports.save_booking = (req, res, next) => {
  console.log(req.body);
	const newGuideBook = new GuideBook({
          name: req.body.name,
          address: req.body.address,
          phone: req.body.phone,
          start_date: req.body.startdate,
          end_date: req.body.enddate,
          status: req.body.status,
          guide_id: req.body.guide_id,
          user_id: req.body.user_id,
          created_at: new Date()
    });
    newGuideBook.save()
	.then(result => {
        console.log(result);
        return res.status(201).json({
			message: "Booking Successfull"
		})		
      })
    .catch(err => {
        res.status(500).json({
          error: err
        });
    });
	
	
}


exports.update_booking = (req, res, next) => {
	var bookingId = req.params.id
	
	GuideBook.updateOne({ _id: bookingId }, { status: req.body.status })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Booking updated"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });

}


// var bookingId = req.params.id
// 	console.log(req.body.status, bookingId)

// 	GuideBook.find({ _id: bookingId })
// 		.exec()
// 		.then(detail => {
		
// 		var bookData = {}
// 		bookData.status= req.body.status

// 		GuideBook.updateOne({ _id: detail[0]._id }, { $set: bookData })
// 	    .exec()
// 	    .then(result => {
// 	      res.status(200).json({
// 	        message: "Booking updated"
// 	      });
// 	    })
// 	    .catch(err => {
// 	      res.status(500).json({
// 	        error: "err1"
// 	      });
// 	    });

// 	})
// 	.catch(err => {
//       res.status(500).json({
//         error: "err2"
//       });
//     });

exports.delete_booking = (req, res, next) => {
  GuideBook.remove({ _id: req.params.id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Booking deleted",
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};