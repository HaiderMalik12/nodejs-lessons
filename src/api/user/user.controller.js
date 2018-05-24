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
  },
  authSuccess(req, res) {
    //send JWT token
    console.log(req.isAuthenticated());
    return res.json(req.user);
    return res.redirect('/');
  },
   generatePdf(req,res){

   const templateBody = `
   <table class="table">
    <thead>
      <tr>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr>
      <tr>
        <td>Mary</td>
        <td>Moe</td>
        <td>mary@example.com</td>
      </tr>
      <tr>
        <td>July</td>
        <td>Dooley</td>
        <td>july@example.com</td>
      </tr>
    </tbody>
  </table>
   `
    const html = `
    <html>
    <head>
    <title> Invoice </title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
     <style>
     @import url(http://fonts.googleapis.com/css?family=Bree+Serif);
     body, h1, h2, h3, h4, h5, h6{
     font-family: 'Bree Serif', serif;
     }
     </style>
    </head>

    <body>
       ${templateBody}
    </body>
    </html>
    `;

   return res.pdfFromHTML({
     filename: 'Invoice.pdf',
     htmlContent: html
   })
  }
};
