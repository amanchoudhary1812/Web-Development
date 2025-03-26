const apiUrl = "http://localhost:3000/api/game";  
// API ka base URL define kar raha hai jo backend se connect karega

let currentWord = "";  
// Yeh variable current word ko store karega

// Start Game - Get a random starting word  
async function startGame() {  
  try {  
    const response = await fetch(`${apiUrl}/start`);  
    // Backend se ek random shuru hone wala word fetch kar raha hai

    if (!response.ok) throw new Error("Failed to start game");  
    // Agar response thik nahi aaya toh error throw karega

    const data = await response.json();  
    // Response ko JSON format mein convert kar raha hai

    currentWord = data.startWord;  
    // Backend se jo word aaya use store kar raha hai

    document.getElementById("startWord").innerText = `Start Word: ${currentWord}`;  
    // HTML mein start word update kar raha hai

    document.getElementById("status").innerText = "";  
    // Status message clear kar raha hai

  } catch (error) {  
    console.error("Error starting game:", error);  
    // Agar error aaye toh console mein print karega

    document.getElementById("status").innerText = "⚠️ Error starting game!";  
    // Agar error ho toh HTML mein error message dikhayega
  }  
}

// Validate User Word  
async function validateWord() {  
  const userWord = document.getElementById("userWord").value.trim().toLowerCase();  
  // User ke input ko le raha hai, trim kar raha hai aur lowercase mein convert kar raha hai

  if (!userWord) {  
    document.getElementById("status").innerText = "⚠️ Please enter a word!";  
    // Agar user ne kuch nahi likha toh warning message dikhayega
    return;  
  }  

  try {  
    const response = await fetch(`${apiUrl}/validate`, {  
      method: "POST",  
      // API ko POST request bhej raha hai

      headers: { "Content-Type": "application/json" },  
      // Request headers set kar raha hai JSON ke liye

      body: JSON.stringify({ currentWord, userWord, player: "Player 1" }),  
      // Server ko current word, user word aur player ka data bhej raha hai
    });  

    const data = await response.json();  
    // Response ko JSON mein convert kar raha hai

    if (response.ok) {  
      currentWord = data.nextWord;  
      // Agar response sahi hai toh next word update karega

      document.getElementById("startWord").innerText = `Next Word: ${currentWord}`;  
      // HTML mein next word show karega

      document.getElementById("status").innerText = "✅ Valid word!";  
      // Valid word ka confirmation message dikhayega

      loadLeaderboard();  
      // Leaderboard update karega
    } else {  
      document.getElementById("status").innerText = `❌ ${data.message}`;  
      // Agar word invalid hai toh error message dikhayega
    }  

  } catch (error) {  
    console.error("Error validating word:", error);  
    // Console mein error print karega

    document.getElementById("status").innerText = "⚠️ Error validating word!";  
    // Agar error aaye toh user ko dikhayega
  }  
}

// Load Leaderboard  
async function loadLeaderboard() {  
  try {  
    const response = await fetch(`${apiUrl}/leaderboard`);  
    // Leaderboard ke data ko backend se fetch karega

    if (!response.ok) throw new Error("Failed to load leaderboard");  
    // Agar response thik nahi aaya toh error throw karega

    const data = await response.json();  
    // Response ko JSON format mein convert kar raha hai

    const leaderboard = document.getElementById("leaderboard");  
    // Leaderboard ka HTML element access kar raha hai

    leaderboard.innerHTML = "";  
    // Pehle se existing leaderboard ko clear kar raha hai

    data.forEach((item) => {  
      leaderboard.innerHTML += `<li>${item.player}: ${item.score} points</li>`;  
      // Leaderboard mein har player ka naam aur score add kar raha hai
    });  

  } catch (error) {  
    console.error("Error loading leaderboard:", error);  
    // Console mein error print karega

    document.getElementById("status").innerText = "⚠️ Error loading leaderboard!";  
    // Agar error aaye toh HTML mein message dikhayega
  }  
}

// Load leaderboard on page load  
document.addEventListener("DOMContentLoaded", loadLeaderboard);  
// Jab page load hoga tab leaderboard automatically load karega
