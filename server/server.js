import express from 'express';
import cors from 'cors';
import path from 'path';
import { dirname } from "path";
import { fileURLToPath } from "url";
import { Client, Pool } from 'pg';
import passport from 'passport';
import { Strategy } from 'passport-local';
import session from 'express-session';
import bcrypt from 'bcrypt';
import genFunc from 'connect-pg-simple';
import env from 'dotenv';

/**
 * -------------- GENERAL SETUP ----------------
 */

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;
const saltRounds = 10;
const corsOption = {
    /* USED FOR DIFFERENT DOMAIN REQUEST */
    // origin: "http://localhost:5173",
    credentials: true,
};
env.config();

app.use(express.static(path.join(__dirname, "../my-app/dist")));
app.use(express.json());
app.use(cors(corsOption));

/**
 * -------------- DATABASE ----------------
 */

/* FOR LOCAL DATABASE */
// // DATABASE FOR SESSION
// const pgPool = new Pool({
//     host: process.env.PG_HOST,
//     user: process.env.PG_USER,
//     database: process.env.PG_DATABASE,
//     password: process.env.PG_PASSWORD,
//     port: process.env.PG_PORT,
// });

// // DATABASE FOR USER INFO.
// const db = new Client({
//     host: process.env.PG_HOST,
//     user: process.env.PG_USER,
//     database: process.env.PG_DATABASE,
//     password: process.env.PG_PASSWORD,
//     port: process.env.PG_PORT,
// });

// DATABASE FOR SESSION
const pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// DATABASE FOR USER INFO.
const db = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

let user_id = 0;

db.connect();

/**
 * -------------- SESSION SETUP ----------------
 */

const PostgresqlStore = genFunc(session);
const sessionStore = new PostgresqlStore({
    pool: pgPool,
    tableName: 'session'
});

app.use(session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        max: 1000 * 60 * 60,
        /* USED FOR DIFFERENT DOMAIN REQUESTt */
        // sameSite: 'lax',
        // secure: false,
    }
}));

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

// LOCAL STRATEGY
passport.use('local', new Strategy(async function verify(username, password, cb) {
    try {
        const result = await db.query("SELECT * FROM user_data WHERE user_account = $1", [username]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const storedHashedPassword = user.user_password;
            bcrypt.compare(password, storedHashedPassword, (err, valid) => {
                if (err) {
                    console.error("Error comparing passwords:", err);
                    return cb(err);
                } else {
                    if (valid) {
                        console.log("valid");
                        return cb(null, user);
                    } else {
                        return cb(null, false);
                    }
                }
            });
        } else {
            return cb(null, false);
        }
    } catch (err) {
        console.log(err);
    }
}));

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

/**
 * -------------- ROUTES ----------------
 */

// in express v5, The wildcard * must have a name, matching the behavior of parameters :, use /*splat instead of /*
app.get("/", (req, res) =>{
        res.sendFile(path.join(__dirname, "../my-app/dist/index.html"));
});

// EVERYTIME OPENING THE WEBSITE WILL FETCH THIS ROUTE ALONG WITH THE COOKIE TO CHECK THE AUTHENTICATION
app.get("/home", (req, res) =>{
    if (req.isAuthenticated()){
        res.send({inUse: true});
    }
});

// IF LOGIN UNSUCCESSFUL, REDIRECT INTO THIS ROUTE AND SEND THE STATUS IN BOOLEAN FOR FRONTEND ACTION.
app.get("/loginfailed", (req, res) =>{
    res.send({validation: false});
});

// LOGIN ROUTE WITH PASSPORT AUTHENTICATION. SUCCESSFUL LOGIN WILL SET THE USER ID AS USER_ID FOUND IN SESSION
// FAILURE WILL REDIRECT TO "LOGINFAILED" ROUTE.
app.post("/login", passport.authenticate("local", {
    failureRedirect: "/loginfailed",
}), (req, res) => {
    // console.log(req.user);
    user_id = req.user.user_id;
    res.send({validation: true});
});

// REGISTER ROUTE TO REGIESTR A NEW USER
app.post("/register", async (req, res) => {
   const {username, password} = req.body;
   console.log(username, password); 
   const user = await db.query("SELECT * FROM user_data WHERE user_account = $1", [username]);
   if (user.rows.length > 0) {
    res.send({registered: false});
   } else {
    bcrypt.hash(password, saltRounds, async(err, hash) => {
        if (err) {
            console.error("Error hashing passworrd:", err);
        } else {
            await db.query("INSERT INTO user_data (user_account, user_password) VALUES ($1, $2)", [username, hash]);
            res.send({registered: true});
        }
    })
   }
});

// ROUTE TO FETCH THE USER DATA FROM THE DATABASE: NOTES CONTENT AND USERNAME
app.get("/notes", async (req, res) => {
    const notes = await db.query("SELECT id, title, content FROM notes WHERE user_id = $1", [user_id]);
    const username = await db.query("SELECT user_account from user_data WHERE user_id = $1", [user_id]);
    res.send({notes: notes.rows, username: username.rows[0].user_account});
})

// ROUTE TO ADD NEW NOTE FOR THE CURRENT USER INTO THE DATABASE
app.post("/add", async (req, res) => {
    const {title, content} = req.body.note;
    const response = await db.query("INSERT INTO notes (user_id, title, content) VALUES ($1, $2, $3) RETURNING title, content", [user_id, title, content]);
    res.sendStatus(200);
})

// ROUTE TO DELETE NOTE OF THE CURRENT USER IN THE DATABASE
app.post("/delete", async (req, res) => {
    const note_id = req.body.id;
    const response = await db.query("DELETE FROM notes WHERE id = $1 RETURNING *", [note_id]);
    res.sendStatus(200);
})

// ROUTE TO LOG OUT THE SESSION
app.get("/logout", (req, res) => {
    req.logout(err => {
        if (err) {
            console.log(err);
        }
        res.sendStatus(200);
    });
})

/**
 * -------------- SERVER ----------------
 */

app.listen(port, (req, res) => {
    console.log(`server listening at: http://localhost:${port}/`);
});