import bcrypt from 'bcryptjs';
import User from './user.model';
import userService from './user.service';

export default {
  async signup(req, res) {
    return res.json({ msg: 'TODO: Implement Signup' })
  },
};
