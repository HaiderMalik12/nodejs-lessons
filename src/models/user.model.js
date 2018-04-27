import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    }
});
export default mongoose.model('User', UserSchema);