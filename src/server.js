import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";

import transactionsRoute from "./routes/transactionsRoute.js"
import job from "./config/cron.js";

dotenv.config();

const app = express();

if(process.env.NODE_ENV === "production") job.start();

//middleware
app.use(ratelimiter);
app.use(express.json());

const PORT = process.env.PORT || 5001;




//can use this code to check if my API is running
app.get("/api/health", (req, res) => {
    res.status(200).json({status: "ok"});
});


//routes to the transactionsRoute.js file, where all the api's are and also, 
//the /api/transactions now serves as a prefix for each endpoint 
//since it is common for all of them, so no need to add it in the endpoinst directly again  
app.use("/api/transactions", transactionsRoute);

initDB().then(() => {
    app.listen(PORT,() => {
        console.log("Server is up on PORT:", PORT);
    });
})
