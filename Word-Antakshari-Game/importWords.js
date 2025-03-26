const mongoose = require("mongoose");  
// ✅ Mongoose ko import kar raha hai (MongoDB se connect hone ke liye)

const fs = require("fs");  
// ✅ File system module ko import kar raha hai (file read/write karne ke liye)

const Word = require("./models/Word");  
// ✅ Word model ko import kar raha hai (jo MongoDB collection ke liye use hoga)

// ✅ MongoDB se connect ho raha hai  
mongoose  
  .connect("mongodb://localhost:27017/antakshari")  
  // ✅ "antakshari" database se connection establish kar raha hai

  .then(() => console.log("MongoDB Connected!"))  
  // ✅ Agar connection successful ho toh console mein message print karega

  .catch((err) => console.log(err));  
  // ✅ Agar connection fail ho jaye toh error print karega

// ✅ File se words read kar raha hai  
const words = fs.readFileSync("./data/words_alpha.txt", "utf-8").split("\n");  
// ✅ "words_alpha.txt" file ko read kar raha hai aur har line ko alag array element bana raha hai

// ✅ Words ko MongoDB mein import karne ka function  
const importWords = async () => {  
  try {  
    const wordList = words  
      .map((word) => word.trim())  
      // ✅ Har word ke extra spaces remove kar raha hai

      .filter((word) => word.length > 0);  
      // ✅ Empty words ko hata raha hai  

    if (wordList.length === 0) {  
      console.log("No valid words found in the file.");  
      // ✅ Agar file empty hai ya words nahi mile toh warning dega

      process.exit(1);  
      // ✅ Process ko error code (1) ke saath exit karega
    }  

    // ✅ Words MongoDB mein insert kar raha hai  
    await Word.insertMany(wordList.map((word) => ({ word })));  
    // ✅ Har word ko object format mein convert karke MongoDB collection mein insert karega

    console.log(`${wordList.length} words imported successfully!`);  
    // ✅ Agar successful ho gaya toh imported words ka count print karega  

    process.exit();  
    // ✅ Process ko successfully exit karega
  } catch (err) {  
    console.error("Error importing words:", err);  
    // ✅ Agar koi error aaye toh usko console mein print karega  

    process.exit(1);  
    // ✅ Process ko error code (1) ke saath exit karega
  }  
};  

importWords();  
// ✅ Function ko call kar raha hai taaki words MongoDB mein insert ho jaye
