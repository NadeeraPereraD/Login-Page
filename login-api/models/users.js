import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        sparse: true,
    },
    facebookId: {
        type: String,
        sparse: true,
    },
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: function() {
            return !this.googleId && !this.facebookId;
        },
        default: '',
    },
    email : {
        type: String,
        required: true,
        unique : true
    },
    password : {
        type: String,
        required: function() {
            return !this.googleId && !this.facebookId;
        },
    },
}, {
    timestamps: true,
});

const User = mongoose.model("users", userSchema);
export default User;