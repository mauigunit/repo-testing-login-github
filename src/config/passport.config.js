import passport from 'passport'
import GithubStrategy from 'passport-github2'
import userService from '../dao/models/users.js'
import config from './config.js';
import { registerUser, loginUser, getUserId } from '../services/login.service.js'


const inicializePassport = () => {
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id , done) => {
        let user = await getUserId({_id:id});
        done(null, user);
    })

    passport.use('github', new GithubStrategy({
        clientID: config.CLIENT_ID,
        clientSecret: config.CLIENT_SECRET,
        callbackURL: config.CLIENT_URL,
        scope: ['user:email']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
            let user = await loginUser(profile.emails[0].value)
            if(!user) {
                let newUser = {
                    firstname: profile._json.login,
                    lastname: "Github",
                    email: profile.emails[0].value,
                    password:"xxxxxxxxxxx",
                    rol:"USER"
                }
                let result = await registerUser(newUser);
                done(null, result);
            } else {
                done(null, user);
            }
        } catch (error) {
            done(error);
        }
    }))
}

export default inicializePassport;