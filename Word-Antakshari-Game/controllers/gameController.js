const Word = require("../models/Word");  
// ✅ Word model ko import kar raha hai (jo MongoDB se words fetch karega)

const Score = require("../models/Score");  
// ✅ Score model ko import kar raha hai (jo player ke scores handle karega)

// ✅ Start Game - Ek random word return karega  
const startGame = async (req, res) => {  
  const word = await Word.aggregate([{ $sample: { size: 1 } }]);  
  // ✅ MongoDB aggregation ka use karke ek random word fetch kar raha hai  

  res.json({ startWord: word[0].word });  
  // ✅ Jo word mila usko JSON response ke roop mein bhej raha hai
};  

// ✅ Validate Word function (user ke word ko check karega)  
const validateWord = async (req, res) => {  
  const { currentWord, userWord, player } = req.body;  
  // ✅ Client se aaya data destructure kar raha hai (currentWord, userWord, player name)

  // ✅ Check kar raha hai ki word correct letter se shuru ho raha hai ya nahi  
  if (userWord[0].toLowerCase() !== currentWord.slice(-1).toLowerCase()) {  
    return res.status(400).json({ message: "Word does not start with the correct letter!" });  
    // ✅ Agar word galat letter se start ho raha hai toh error return karega  
  }  

  // ✅ Check kar raha hai ki word database me exist karta hai ya nahi  
  const validWord = await Word.findOne({ word: userWord.toLowerCase() });  
  if (!validWord) {  
    return res.status(400).json({ message: "Invalid word!" });  
    // ✅ Agar word database me nahi mila toh error return karega  
  }  

  // ✅ Score update kar raha hai  
  let score = await Score.findOne({ player });  
  // ✅ Player ka existing score database se fetch kar raha hai  

  if (!score) {  
    score = new Score({ player, score: 0 });  
    // ✅ Agar player ka score exist nahi karta toh naya score entry create karega  
  }  

  score.score += userWord.length;  
  // ✅ Word jitna lamba hoga, utne zyada points milenge  

  await score.save();  
  // ✅ Updated score ko database me save kar raha hai  

  res.json({ message: "Valid word!", nextWord: userWord, score: score.score });  
  // ✅ JSON response bhej raha hai jo next word aur updated score batayega  
};  

// ✅ Get Leaderboard function (top players ka data bhejega)  
const getLeaderboard = async (req, res) => {  
  const leaderboard = await Score.find().sort({ score: -1 }).limit(5);  
  // ✅ Database se sabse highest score wale top 5 players fetch karega  

  res.json(leaderboard);  
  // ✅ Leaderboard ka data JSON format me response me bhej raha hai  
};  

module.exports = { startGame, validateWord, getLeaderboard };  
// ✅ Sare functions ko export kar raha hai taaki inhe routes me use kar sake  
