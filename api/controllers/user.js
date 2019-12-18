const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.user_signup = (req, res, next) => {
  console.log(req.body)
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists",
          status: false
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: "password hash"
            });
          } else {
            const user = new User({
              username: req.body.username,
              email: req.body.email,
              password: hash,
              role: req.body.role
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created",
                  status: true
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: "save error",
                  status: false
                });
              });
          }
        });
      }
    });
};

exports.user_login = (req, res, next) => {
  console.log(req.body);
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
          status: false
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed",
            status: false
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            'jwtsecretkey',
            {
              expiresIn: "10h"
            }
          );
          
          return res.status(200).json({
            // username: user[0].username,  
            role: user[0].role,
            message: "Auth successful",
            token: token,
            userId: user[0]._id,
            user: user[0],
            status: true
          });
          
        }
        res.status(401).json({
          message: "Auth failed",
          status: false
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
        status: false
      });
    });
};

exports.update_user = (req, res, next) => {
  const id = req.params.userId
  User.findById(id)
  .populate("user")
  .exec()
  .then(user => {
    if(!user) {
      return res.status(404).json({
        message: "User not found"
      });    
    }
    else {
      console.log("here", req.body)
      let data = req.body.data;
      let parseData = JSON.parse(data)
      console.log(req.file)
      
      var userData = {}
      userData.username= parseData.username
      userData.email = parseData.email
      if(req.file) {
        userData.userImage = req.file.path  
      }
      
      
      if(parseData.password != '') {
        bcrypt.hash(parseData.password, 10, (err, hash) => {
            userData.password = hash 
            console.log("hash " + userData.password)
            User.updateOne({ _id: id }, { $set: userData })
            .exec()
            .then(result => {
              res.status(200).json({
                message: "User updated",
                user: userData
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: err
              });
            });
        });
      }

      else {
        User.updateOne({ _id: id }, { $set: userData })
        .exec()
        .then(result => {
          res.status(200).json({
            message: "User updated",
            user: userData
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
      }
      

      // User.updateOne({ _id: id }, userData, function(err){
      //     if(err) {
      //       console.log(err)
      //       error: err
      //     }
      //     else {
      //       res.status(200).json({
      //         message: "User updated"
      //       });  
      //     }
      // })

      
    }

  })
  .catch(err => {
    res.status(500).json({
      error: err
    })
  })
  
}

exports.get_userDetail = (req, res, next) => {
  User.findById(req.params.userId)
  .select("username email userImage")
  .exec()
  .then(user => {
    if(!user) {
      return res.status(404).json({
        message: "User not found!"
      })  
    }
      return res.status(200).json({
        user: user
      });  
  })
  .catch(err => {
    return res.status(404).json({
      error: err
    })
  })
}
