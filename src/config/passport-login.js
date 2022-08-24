import localPassport from 'passport-local';
const localStrategy = localPassport.Strategy;
import User from '../models/user-model.js';

export const passportLoginSetupInitialize = (passport) => {
  //REGISTER WITH PASSPORT
  passport.use(
    'register',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        const { name, password_confirm } = req.body;
        try {
          if (!name || !email || !password || !password_confirm) {
            return done(null, false, {
              message: 'Please fill up all the fields',
            });
          }

          if (password !== password_confirm) {
            return done(null, false, {
              message: 'Passwords do not match',
            });
          }

          if (password.length < 6) {
            return done(null, false, {
              message: 'Password must be at least 6 characters',
            });
          }

          const userRegistered = await User.findOne({ email: email });

          if (userRegistered) {
            return done(null, false, {
              message: 'User already registered',
            });
          }

          const newUser = new User({ name, email, password });
          newUser.password = await newUser.encryptPassword(password);
          await newUser.save();
          return done(null, { user: newUser, loginStatus: false });
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  //LOGIN WITH PASSPORT
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
              return done(null, { user, loginStatus: true });
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

  passport.serializeUser((req, user, done) => {
    req.session.isLogged = user.loginStatus;
    done(null, user.user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    return done(null, user);
  });
};
