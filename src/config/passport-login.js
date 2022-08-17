import localPassport from 'passport-local';
const localStrategy = localPassport.Strategy;
import User from '../models/user-model.js';

export const passportLoginSetupInitialize = (passport) => {
  passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'emailUser',
        passwordField: 'passwordUser',
      },
      async (emailUser, passwordUser, done) => {
        try {
          const user = await User.findOne({ email: emailUser });

          if (!user) {
            return done(null, false, { message: 'Invalid Credentials' });
          } else {
            const matchPassword = await user.matchPassword(passwordUser);
            if (matchPassword) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Invalid Credentials' });
            }
          }
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    return done(null, user);
  });
};
