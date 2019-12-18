const mongoose = require("mongoose");

const User = require("../models/user");
const Guide = require("../models/guide");


exports.guide_detail = (req, res, next) => {
	Guide.find()
    .select()
    .populate('user_id')
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

exports.save_guideDetail = (req, res, next) => {
	var userId = req.body.user_id
	User.findById(userId)
	.then(user => {
		if(!user) {
			return res.status(404).json({
				message: "User not found"
			})	
		}
		
		const newGuide = new Guide({
              name: req.body.name,
              age: req.body.age,
              location: req.body.location,
              phone: req.body.phone,
              language: req.body.language,
              price: req.body.price,
              description: req.body.description,
              user_id: req.body.user_id
        });
        return newGuide.save();
	
	})
	.then(result => {
        console.log(result);
        return res.status(201).json({
			message: "Added User"
		})		
      })
    .catch(err => {
        res.status(500).json({
          error: err
        });
      });
	
	
}


exports.update_guideDetail = (req, res, next) => {
	var userId = req.params.userId
	User.findById(userId)
	.then(user => {
		if(!user) {
			return res.status(404).json({
				message: "User not found"
			})	
		}
		
		Guide.find({ user_id: userId })
		.exec()
		.then(guide => {
			
				var userData = {}
		        userData.name= req.body.name,
	            userData.age= req.body.age,
	            userData.location= req.body.location,
	            userData.phone= req.body.phone,
	            userData.language= req.body.language,
	            userData.price= req.body.price,
	            userData.description= req.body.description,

				Guide.updateOne({ _id: guide[0].id }, { $set: userData })
		        .exec()
		        .then(result => {
		          res.status(200).json({
		            message: "User updated"
		          });
		        })
		        .catch(err => {
		          res.status(500).json({
		            error: err
		          });
		        });

			
		})
		.catch(err => {
			return res.status(404).json({
				message: "Error while saving"
			})		
		})	
		
		
	})
	.catch(err => {
		return res.status(400).json({
			message: 'id not found'
		})
	})
	
	
}

exports.get_guideDetail = (req, res, next) => {
	var userId = req.params.userId
	
	Guide.findOne({ user_id: userId })
	.exec()
	.then(guide => {
		if(!guide) {
			return res.status(201).json({
				message: "User not found",
				status: false
			})	
		}
		return res.status(200).json({
			guide: guide,
			status: true
		})	
		
	})
	.catch(err => {
		return res.status(404).json({
			message: "Not Found!"
		})		
	})	
	
}