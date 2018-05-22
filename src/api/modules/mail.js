import nodemailer from 'nodemailer';
import htmlToText from 'html-to-text';
import { devConfig } from '../../config/development';

export const sendEmail = (options) =>  {
return new Promise((resolve,reject) => {
    const tranpoter = nodemailer.createTransport({
        host: devConfig.ethereal.host,
        port: devConfig.ethereal.port,
        auth:{
            user: devConfig.ethereal.username,
            pass: devConfig.ethereal.pass
        }
    });
  const text = htmlToText.fromString(options.html,{
      wordwrap: 130
  });
  const mailOptions = {
    from: '"Haider Malik 👻" <noreplay@fulltsackhour.com>',
    text,
    html: options.html,
    to: options.to,
    subject: options.subject
  }
  tranpoter.sendMail(mailOptions,(err, info) => {
      if(err){
          return reject(err);
      }
      console.log(info.messageId);
      console.log('Preview URL ', nodemailer.getTestMessageUrl(info));
      return resolve({message: 'Email has sent to your inbox'});
  })
})
}