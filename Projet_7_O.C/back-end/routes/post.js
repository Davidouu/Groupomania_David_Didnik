const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const likeCtrl = require('../controllers/like');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const rateLimit = require('express-rate-limit');

const postLimiter = rateLimit({
  windowMs: 20 * 60 * 1000, // 20 minutes
  max: 1000, // Limite chaque IP à 1000 requêtes par `window` (ici, par 20 minutes)
});

router.post('/create', postLimiter, auth, multer, postCtrl.createPost);
router.post('/comment', postLimiter, auth, postCtrl.createComment);
router.post('/like', postLimiter, auth, likeCtrl.likePost);
router.put('/modifPost', postLimiter, auth, multer, postCtrl.modifyPost);
router.delete('/deletePost', postLimiter, auth, postCtrl.deletePost);
router.get('/', auth, postCtrl.getAllPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.get('/all/comments', auth, postCtrl.getAllComments);

// export de mes routes

module.exports = router;
