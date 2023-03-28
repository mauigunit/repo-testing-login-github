import {Router} from 'express';
import passport from 'passport';
const sessionGithubRouter = Router();

sessionGithubRouter.get('/github', passport.authenticate('github', {scope:['user:email']}), async (req, res) =>{});

sessionGithubRouter.get('/githubcallback', passport.authenticate('github', {failureRedirect:'/login'}), async (req, res) =>{
    req.session.user = req.user;
    res.redirect('/api/products');
});

export default sessionGithubRouter;