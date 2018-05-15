import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './user.model';
import userService from './user.service';
import { devConfig } from '../../config/development';

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
  },
  async login(req, res) {
    try {
      const { error, value } = userService.validateSchema(req.body);
      if (error) {
        return res.status(400).send(error);
      }
      const user = await User.findOne({ 'local.email': value.email });
      if (!user) {
        return res.status(401).json({ err: 'Unauthorized' });
      }
      const matched = bcrypt.compareSync(value.password, user.local.password);
      if (!matched) {
        return res.status(400).json({ err: 'Bad credentials' });
      }
      const token = jwt.sign({ id: user._id }, devConfig.secret, {
        expiresIn: '1d'
      });
      return res.json({ success: true, token });
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  authenticate(req, res) {
    console.log(req.isAuthenticated());
    return res.json(req.user);
  }
};
