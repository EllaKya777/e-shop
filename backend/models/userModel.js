import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    email: {
        type: String, required: true, index: true, unique: true
    },
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true, default: false}
});

// collection with this name will be created in the database
const User = mongoose.model('User', userSchema);
export default User;
