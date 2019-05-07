var router = require('express').Router();
var passport = require('passport');

router.get('/google', passport.authenticate('google',{
    scope: ['profile']
}));

router.get('/google/callback',passport.authenticate('google',  {failureRedirect: '/login'}),
    function(req,res){
    res.send(req.user);
});

router.get('/logout',function(req,res,next){
    req.logout();
});
module.exports = router;
