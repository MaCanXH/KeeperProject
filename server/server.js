import express from 'express';
import cors from 'cors';
import path from 'path';
import { dirname } from "path";
import { fileURLToPath } from "url";
import { Client } from 'pg';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 3000;
const corsOption = {
    origin: "http://localhost:5173"
};

const db = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'KeeperBackEnd',
    password: 'Chwmax743',
    port: 5432,
});

let isLoggedIn = false;

db.connect();

app.use(express.static(path.join(__dirname, "../my-app/dist")));
app.use(express.json());
app.use(cors(corsOption));

// in express v5, The wildcard * must have a name, matching the behavior of parameters :, use /*splat instead of /*
app.get("/", async(req, res) =>{
    const notes = await db.query(
        "SELECT * FROM notes"
    );
    res.sendFile(path.join(__dirname, "../my-app/dist/index.html"));
    console.log(notes.rows);
});

app.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await db.query("SELECT user_password FROM user_data WHERE user_account = $1", [email]);
    if (user.rows.length > 0) {
        if (user.rows[0].user_password == password){
            console.log("login success");
            res.send({validation : true});
        } else {
            console.log("incorrect password!");
            res.send({validation : false});
        }
    } else {
        console.log("no record")
        res.send({validation : false});
    }
})

app.listen(port, (req, res) => {
    console.log("server started ar port:", port);
});