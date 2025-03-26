const mongoose = require("mongoose");  
// ✅ Mongoose ko import kar raha hai (MongoDB ke saath kaam karne ke liye)

// ✅ Score Schema define kar raha hai  
const scoreSchema = new mongoose.Schema({  
  player: {  
    type: String,  
    // ✅ Player ka naam String format mein hoga  

    required: true,  
    // ✅ Ye field required hai (bina player naam ke entry nahi hogi)  
  },  

  score: {  
    type: Number,  
    // ✅ Score ek number format mein hoga  

    default: 0,  
    // ✅ Default value 0 hoga agar koi score na diya jaye  
  },  
});  

module.exports = mongoose.model("Score", scoreSchema);  
// ✅ Score model ko export kar raha hai taaki ise backend ke kisi bhi part mein use kar sake
