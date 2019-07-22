const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const UserModel = require('./models/user');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

passport.serializeUser(async (user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await UserModel.findById(id);
    if (!user) {
        done(false);
        return
    }
    done(null, user)
});



async function registerLocal(email, password, done) {
    const user = await UserModel.findOne({ email, provider: 'local' });
    if (!user) {
        done(null, false);
        return;
    }

    const hashPassword = await bcrypt.hash(password, user.salt);
    if (hashPassword !== user.password) {
        done(null, false);
        return;
    }
    done(null, user);
}

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, registerLocal));


passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'superSecret',
    issuer: 'node',
    audience: 'api'
}, function (payload, done) {

    done(null, payload.data);
}))