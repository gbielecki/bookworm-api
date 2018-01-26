import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator'

//TODO: add uniqueness and email validation to email field
const schema = new mongoose.Schema({
    email: {type: String, required: true, lowercase: true, index: true, unique: true},
    password: {type: String, required: true},
    confirmed: {type: Boolean, default: false},
    confirmationToken: {type:String, default: ""}
}, {timestamps: true});

schema.methods.generateJWT = function generateJWT(){
    return jwt.sign({
        email: this.email
    }, process.env.JWT_SECRET);
}

schema.methods.toAuthJSON = function toAuthJSON() {
    return {
        email: this.email,
        confirmed: this.confirmed,
        token: this.generateJWT()
    }
}

schemat.methods.setConfirmationToken = function setConfirmationToken() {
    this.confirmationToken = this.generateJWT();
}

schemat.methods.generateConfirmationUrl = function generateConfirmationUrl() {
    return '${process.env.Host}/confirmation/{thi.confirmationToken}'
}

schema.plugin(uniqueValidator, {message: 'This email is already taken.'});

export default mongoose.model('User',schema)