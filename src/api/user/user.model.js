import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
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
UserSchema.plugin(mongoosePaginate)
export default mongoose.model('User', UserSchema);