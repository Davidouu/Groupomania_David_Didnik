const Post = require('../models/post');
const Comment = require('../models/comment');
const e = require('express');
const fs = require('fs');

// Création du post, pour que l'utilisateur puisse avoir le choix d'uploader une photo ou non, je vérifie si il y a une fichier,
// si oui je créer un post avec l'url du fichier uploader, sinon je créer le post sans fichier

exports.createPost = (req, res, next) => {
  if (!req.file) {
    const post = new Post({
      postFirstName: req.body.firstName,
      postLastName: req.body.lastName,
      postTitle: req.body.postTitle,
      postMessage: req.body.postMessage,
      postUserId: req.body.userId,
      postDate: req.body.postDate,
    });
    post
      .save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    const post = new Post({
      postFirstName: req.body.firstName,
      postLastName: req.body.lastName,
      postTitle: req.body.postTitle,
      postMessage: req.body.postMessage,
      postUserId: req.body.userId,
      postDate: req.body.postDate,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`,
    });
    post
      .save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
      .catch((error) => res.status(400).json({ error }));
  }
};

// La modification fonctionne de la même manière que la création

exports.modifyPost = (req, res, next) => {
  if (!req.file) {
    Post.updateOne(
      { _id: req.body.id },
      {
        postMessage: req.body.postMessage,
        postTitle: req.body.postTitle,
        postDate: req.body.postDate,
      }
    )
      .then(() => res.status(200).json({ message: 'Post modifié !' }))
      .catch((error) => res.status(400).json({ error: 'erreur' }));
  } else {
    console.log('1fsf');
    Post.updateOne(
      { _id: req.body.id },
      {
        postMessage: req.body.postMessage,
        postTitle: req.body.postTitle,
        postDate: req.body.postDate,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    )
      .then(() => res.status(200).json({ message: 'Post modifié !' }))
      .catch((error) => res.status(400).json({ error: 'erreur' }));
  }
};

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.body.id })
    .then((post) => {
      const filename = post.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.body.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllComments = (req, res, next) => {
  Comment.find()
    .then((Comment) => res.status(200).json(Comment))
    .catch((error) => res.status(400).json({ error: 'objets non trouvé' }));
};

exports.createComment = (req, res, next) => {
  const comment = new Comment({
    message: req.body.message,
    postId: req.body.id,
    userId: req.body.userId,
    commentFirstName: req.body.firstName,
    commentLastName: req.body.lastName,
  });
  comment
    .save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllPost = (req, res, next) => {
  Post.find()
    .sort({ _id: 'desc' })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(400).json({ error: 'objets non trouvé' }));
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(400).json({ error: 'objets non trouvé' }));
};
