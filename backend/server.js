import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import productRouts from "./routes/productRoutes.js"
import { sql } from "../config/db.js";

dotenv.config();

const app=express();
const PORT = process.env.PORT || 3000;

console.log(PORT);
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(morgan("dev"));

app.use(async(req,res,next) => {
    try {
        const decision = await aj.protect(req, {
            requested:1 // specifies that each request consumes 1 token
        })
        
        if (decision.isDenied()){
            if(decision.reason.isRateLimit()){
                res.status(429).json({error:"Too many Requests"});
            }else if (decision.reason.isBot()){
                res.status(403).json({error:"Bot access denied"});
            }else {
                res.status(403).json({error:"Forbidden"});
            }
        return;
        }

        // check for spoofed bots

        if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())){
            res.status(403).json({error: "spoofed bot detected"});
            return;
        }

        next()
    } catch (error) {
        console.log("Arcjet error",error);
        next(error);
    }
});

app.use("/api/products", productRouts);

async function initDB() {
    try {
        await sql` 
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY ,
                name VARCHAR(255) NOT NULL,
                price VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
    console.log("Database initialized successfully");
    } catch (error) {
        console.log("Error initDB", error);
    }
}

initDB().then(() => { 
    app.listen(PORT, () =>{
        console.log("server is running on port "+PORT);
    });
});