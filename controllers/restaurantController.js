const RestaurantModel = require('../models/RestaurantModel');
const Razorpay = require('razorpay');
const sha256 = require('sha256');
const path = require('path');
var crypto = require('crypto');
const razorpay = new Razorpay({
  key_id:'rzp_live_XWLTIL7PmeGLye',
  key_secret:'nlkjAaQqEv7EiKpmi9474W09' ,
})
exports.createRestaurant = (req, res) => {
  res.render('payment.ejs')
}

exports.postRestaurant = (req, res) => {
  let options = {
    amount: 100,  // amount in the smallest currency unit
    currency: "INR",
    
  };

razorpay.orders.create(options, function (err, order){
    
    console.log(order)
    res.json(order)
})
}
exports.postcreateRestaurant = (req, res) => {
  razorpay.payments.fetch(req.body.razorpay_payment_id).then((paymentDocument) => {
    if(paymentDocument.status=='captured'){
        res.send("success")
    } else{
        res.send("fail")
    }
})
console.log('jagan',req.body)
const name = req.body.name;
const email_id = req.body.email_id;
const mobile_no = req.body.mobile_no;
const fssai_no = req.body.fssai_no;
const address1 = req.body.address1;
const address2 = req.body.address2;
const amount = req.body.amount;
const city = req.body.city;
const state = req.body.state;
const pincode = req.body.pincode;
const landmark = req.body.landmark;
const restaurant_name = req.body.restaurant_name;
console.log('hfthththth',name)
const password = sha256(req.body.password);
const Restaurant = new RestaurantModel(
    {   
        name: name,
        email_id:email_id,
        mobile_no:mobile_no,
        fssai_no: fssai_no,
        address1:address1,
        address2:address2,
        city: city,
        state:state,
        pincode:pincode,
        amount:amount,
        landmark: landmark,
        restaurant_name:restaurant_name,
        password:password,
        createdBy:'owner',
        usertype: 'owner',
        createdOn: new Date()
    });
    Restaurant
   .save().then(result =>{
        console.log(result)
    })
    .catch(err=>{
        console.log(err.message);
    })    

}
//for login
exports.postLogin=(req,res,next)=>{
  console.log(req.body);
  const email_id = req.body.email_id;
  const password = sha256(req.body.password);
  RestaurantModel.find({email_id:email_id,password:password,isDeleted:false},function(err,user){
          if(user.length>0)
          {
              req.session.userdetails ={
                                              userid: user[0]._id,
                                              name: user[0].name,
                                              email_id:user[0].email_id,
                                              usertype:user[0].usertype
                                        }
              // res.redirect('/user/view');
              res.json({message:"Login successfully",status:true})
          }
          else{
              res.redirect('/user/login');
          }
      });
  }
// // Delete restaurant
exports.Logout = (req, res) => {
  try{
   if(req.session.userdetails!=null|| req.session.userdetails != undefined){
    req.session.destroy(function(err){  
      if(err){  
          console.log(err);  
      }  
      else  
      {  
          res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
          // res.redirect('/user/login'); 
          console.json("logout success")

      }  
  });  
  
}

  }
  catch(error){
    // res.json({ message: "something went wrong",status:false,error: error.message});
    console.log(error);
  }
  
}