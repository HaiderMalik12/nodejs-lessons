export const devConfig = {
  secret: 'Iasdaksjdou98',
  twitter: {
    consumerKey: 'YOUR_CONSUMER_KEY',
    consumerSecret: 'YOUR_CONSUMER_SECRET',
    callbackURL: 'YOUR_CALLBACK_URL'
  },
  github:{
    clientId:  "bfa97f2edbdcb518d386",
    clientSecret: '97af87357a4ef0288e488c875bb3e2a5ad553a74',
    callbackURL: 'http://localhost:3000/users/auth/github/callback'
  },
  google:{
    clientId: '376563107459-3egjvcn1s7sle9m7020neo53fa1u7ntb.apps.googleusercontent.com',
    clientSecret: 'cR4LB5sI1tboDDrsbKJ1D9z0',
    callbackURL: 'http://localhost:3000/users/google/callback'
  }
};
