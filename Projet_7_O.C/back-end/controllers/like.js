const Post = require('../models/post');

// controller de like, si le status du like est false alors on push +1 like sur le post et on push l'id de l'utilisateur dans un array,
// si le status est sur true, on effectue l'action inverse

exports.likePost = (req, res, next) => {
  console.log(req.body);
  const likeStatus = req.body.like;
  const postId = req.body.id;
  const userId = req.body.userId;
  if (likeStatus === false) {
    Post.updateOne(
      { _id: postId },
      {
        $inc: { likes: +1 },
        $push: { usersLiked: req.body.userId },
      }
    )
      .then(() => res.status(201).json({ message: 'Ajout du like !' }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    Post.findOne({ _id: postId })
      .then((post) => {
        if (post.usersLiked.includes(userId)) {
          Post.updateOne(
            { _id: postId },
            {
              $inc: { likes: -1 },
              $pull: { usersLiked: userId },
            }
          )
            .then(() =>
              res.status(201).json({ message: 'Suppression du like !' })
            )
            .catch((error) => res.status(400).json({ error }));
        } else {
          res.status(403).json({ message: 'requête impossible !' });
        }
      })
      .catch(() => res.status(404).json({ message: 'Poste introuvable !' }));
  }
};
