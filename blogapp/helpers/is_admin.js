module.exports = {
    isAdmin: function (req, res, next){
        if (req.isAuthenticated() && req.user.is_admin == 1){
            return next();
        }
        req.flash("error_msg", "Acesso restrito para usuário Admin!")
        res.redirect("/")
    }
}