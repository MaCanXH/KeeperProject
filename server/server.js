import express from 'express';
import cors from 'cors';
import path from 'path';
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const corsOption = {
    origin: "http://localhost:5173"
};

app.use(express.static(path.join(__dirname, "../my-app/dist")));

app.use(cors(corsOption));

// in express v5, The wildcard * must have a name, matching the behavior of parameters :, use /*splat instead of /*
app.get("/{*splat}", (req, res) =>{
    res.sendFile(path.join(__dirname, "../my-app/dist/index.html"));
});

app.listen(port, (req, res) => {
    console.log("server started ar port:", port);
});