import bcrypt from 'bcryptjs';
import User from './user.model';
import userService from './user.service';

export default {
  async signup(req, res) {
    try {
      const { value, error } = userService.validateSchema(req.body);
      if (error) {
        return res.status(400).send(error);
      }
      const user = new User();
      user.local.email = value.email;

      const salt = bcrypt.genSaltSync(10);
      const hash = await bcrypt.hash(value.password, salt);
      user.local.password = hash;
      await user.save();
      return res.json({ success: true, message: 'Signup Successful' });
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }
};
