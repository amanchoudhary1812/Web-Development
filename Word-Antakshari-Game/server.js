const express = require("express");  
//  Express.js ko import kar raha hai (server banane ke liye)

const mongoose = require("mongoose");  
//  Mongoose ko import kar raha hai (MongoDB se connect hone ke liye)

const cors = require("cors");  
//  CORS ko import kar raha hai (different origins se request allow karne ke liye)

const path = require("path");  
//  Path module ko import kar raha hai (file aur directory paths handle karne ke liye)

const gameRoutes = require("./routes/gameRoutes");  
//  Game ke related API routes ko import kar raha hai

const app = express();  
//  Express ka ek instance bana raha hai (server create karne ke liye)

app.use(express.json());  
//  Request body ko JSON format mein parse karne ke liye middleware use kar raha hai

//  Allow both localhost:3000 and 127.0.0.1:5500  
app.use(cors({  
    origin: ["http://localhost:3000", "http://127.0.0.1:5500"],  
    //  Yeh dono origins se request allow karega

    methods: "GET, POST, PUT, DELETE",  
    //  Allowed HTTP methods define kar raha hai

    allowedHeaders: "Content-Type"  
    //  Sirf "Content-Type" header allow karega
}));  

// Serve frontend files  
app.use(express.static(path.join(__dirname, "frontend")));  
//  "frontend" folder ke static files (HTML, CSS, JS) serve karega

app.get("/", (req, res) => {  
    res.sendFile(path.join(__dirname, "frontend", "index.html"), (err) => {  
        if (err) {  
            res.status(500).send("Error loading index.html");  
            // Agar koi error aaye toh 500 status ke saath error message bhejega
        }  
    });  
});  

// MongoDB Connection  
mongoose  
  .connect("mongodb://localhost:27017/antakshari")  
  //  MongoDB ke "antakshari" database se connect ho raha hai

  .then(() => console.log("MongoDB Connected!"))  
  //  Agar connection successful ho toh console mein message print karega

  .catch((err) => console.log("MongoDB Connection Error:", err));  
  //  Agar connection fail ho jaye toh error print karega

//  API Routes  
app.use("/api/game", gameRoutes);  
//  "/api/game" URL ke liye gameRoutes ko use kar raha hai

const PORT = process.env.PORT || 3000;  
//  Server ka port define kar raha hai (agar env variable set hai toh use karega, warna 3000)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  
//  Server ko start kar raha hai aur console pe port number print karega
