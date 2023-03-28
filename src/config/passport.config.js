import passport from 'passport'
import GithubStrategy from 'passport-github2'
import userService from '../dao/models/users.js'

const inicializePassport = () => {
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id , done) => {
        let user = await userService.findOne({_id:id});
        done(null, user);
    })

    passport.use('github', new GithubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CLIENT_URL,
        scope: ['user:email']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
            let user = await userService.findOne({ email: profile.emails[0].value })
            if(!user) {
                let newUser = {
                    first_name: profile._json.login,
                    last_name: "",
                    age: 28,
                    email: profile.emails[0].value,
                    password:""
                }
                let result = await userService.create(newUser);
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