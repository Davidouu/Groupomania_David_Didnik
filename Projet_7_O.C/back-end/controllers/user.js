const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getUser = (req, res, next) => {
  User.findOne({ _id: req.body.id })
    .then((user) =>
      res
        .status(200)
        .json({ userFirstName: user.firstName, userLastName: user.lastName })
    )
    .catch((error) =>
      res.status(400).json({ error: 'utilisateur non trouvé' })
    );
};

// controleur d'inscription, avec le hashage du mdp à l'aide de bcrypt, et ensuite l'enregistrement dans las D.B en utilisant le schéma user

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        isAdmin: false,
      });
      user
        .save()
        .then(() =>
          res.status(201).json({
            message: 'Utilisateur créé !',
          })
        )
        .catch((error) =>
          res.status(400).json({
            error: `L'utilisateur n'as pas pu être créé.`,
          })
        );
    })
    .catch((error) =>
      res.status(500).json({
        error: `Le mot de passe n'as pas pu être haché.`,
      })
    );
};

//controlleur de connexion avec une comparaison de mdp présent dans la requète ainsi que celui présent dans la D.B avec l'utilisation de bcrypt,
//puis une fois la validation positive, connexion de l'utilisateur avec son token , valables 24h

exports.login = (req, res, next) => {
  console.log(req.body);
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: 'Utilisateur non trouvé !',
        });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: 'Mot de passe incorrect !',
            });
          }
          res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
            userId: user._id,
            isAdmin: user.isAdmin,
            token: jwt.sign(
              {
                userId: user._id,
              },
              `${process.env.JWT_TOKEN_SECRET}`,
              {
                expiresIn: '24h',
              }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
