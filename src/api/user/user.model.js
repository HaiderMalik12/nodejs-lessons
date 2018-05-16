import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
  local: {
    email: String,
    password: String
  },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String
  }
});
export default mongoose.model('User', UserSchema);
