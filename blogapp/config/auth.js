const localStrategy = require("passport-local").Strategy 
const mongoose = require("mongoose")
const brycpt = require("bcryptjs")
const bcrypt = require("bcryptjs/dist/bcrypt")

//Model de usuário
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")

module.exports = function(passport) {
    passport.use(new localStrategy({usernameField: "email"}, (email, senha, done)=> {
        Usuario.findOne({email}).then((usuario) => {
            if (!usuario) {
                return done(null, false, { message: "Esta conta não existe"})
            }else{
                bcrypt.compare(senha, usuario.senha, (erro, batem) => {
                    if (bate){
                        return done(null, user)
                    }else{
                        return done(null, false, { message: "Senha Incorreta"})
                    }
                })
            }
        }).catch((err) => {
            
        })
    }))

    passport.serializeUser((usuario, done) => {
        done(null, usuario.id)
    })
    passport.deserializeUser((id, done) => {
        Usuario.findById(id, (err, usuario) => {
            done(err, user)
        })
    })
}