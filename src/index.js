import express from 'express';
import path from 'path';
import mongoose from 'mongoose';

// import user from './routes/user';
import auth from './routes/auth'
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Promise from 'bluebird';

dotenv.config();
const app = express();
app.use(bodyParser.json());
mongoose.connect(process.env.MONGODB_URL, {useMongoClient: true});
mongoose.Promise = Promise;

app.use("/api/auth",auth);
// app.post('/api/auth', (req,res) => {
//     res.status(400).json({errors: {global: "Invalid credentials" }});
// });

app.get('/*',(req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(8080, () => console.log('Running on localhost:8080'));