import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
  local: {
    email: String,
    password: String
  }
});
export default mongoose.model('User', UserSchema);
