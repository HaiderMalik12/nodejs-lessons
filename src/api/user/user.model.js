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
  },
  github:{
    token:String,
    displayName: String,
    email: String,
    id: String
  },
  google:{
    token:String,
    displayName: String,
    email: String,
    id: String
  }
});
export default mongoose.model('User', UserSchema);
