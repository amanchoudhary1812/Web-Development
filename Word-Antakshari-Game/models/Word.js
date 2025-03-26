const mongoose = require("mongoose");  
// ✅ Mongoose ko import kar raha hai (MongoDB ke saath interact karne ke liye)

// ✅ Word Schema define kar raha hai  
const wordSchema = new mongoose.Schema({  
  word: {  
    type: String,  
    // ✅ Word ka data type String hoga  

    unique: true,  
    // ✅ Har word database me unique hoga (duplicate words allow nahi honge)  

    required: true,  
    // ✅ Yeh field required hai (bina word ke entry nahi hogi)  
  },  
});  

module.exports = mongoose.model("Word", wordSchema);  
// ✅ Word model ko export kar raha hai taaki ise backend ke kisi bhi part mein use kar sake
