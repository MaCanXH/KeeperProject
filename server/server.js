import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;
const corsOption = {
    origin: "http://localhost:5173"
};

app.use(cors(corsOption));

app.get("/", (req, res) =>{
    res.json({hello: ["world", "Max"]});
});

app.listen(port, (req, res) => {
    console.log("server started ar port:", port);
});