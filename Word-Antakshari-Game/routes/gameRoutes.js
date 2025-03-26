const express = require("express");  
// ✅ Express module ko import kar raha hai (Routing ke liye)

const { startGame, validateWord, getLeaderboard } = require("../controllers/gameController");  
// ✅ gameController se functions ko import kar raha hai (jo request handle karenge)

const router = express.Router();  
// ✅ Express Router ka instance bana raha hai (jo API routes define karega)

router.get("/start", startGame);  
// ✅ Jab client "/start" endpoint hit karega toh `startGame` function call hoga  
// (Game start karne ke liye ek random word bhejega)

router.post("/validate", validateWord);  
// ✅ Jab client "/validate" endpoint par POST request bhejega toh `validateWord` function call hoga  
// (User ke word ko validate karega)

router.get("/leaderboard", getLeaderboard);  
// ✅ Jab client "/leaderboard" endpoint hit karega toh `getLeaderboard` function call hoga  
// (Leaderboard ka data bhejega)

module.exports = router;  
// ✅ Router ko export kar raha hai taaki ise `app.js` ya `server.js` me use kiya ja sake
