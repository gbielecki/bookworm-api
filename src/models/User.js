import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

//TODO: add uniqueness and email validation to email field
const schema = new mongoose.Schema({
    email: {type: String, required: true, lowercase: true, index: true},
    password: {type: String, required: true}
}, {timestamps: true});

schema.methods.generateJWT = function generateJWT(){
    return jwt.sign({
        email: this.email
    }, process.env.JWT_SECRET);
}

schema.methods.toAuthJSON = function toAuthJSON() {
    return {
        email: this.email,
        token: this.generateJWT()
    }
}


export default mongoose.model('User',schema)