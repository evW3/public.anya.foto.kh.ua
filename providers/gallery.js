const express = require('express');
const Token = require('../middleware/Token');
const formidableMiddleware = require('express-formidable');
const { GalleryController } = require('../controllers/Gallery');

const router = express.Router();

router.get('/folders', GalleryController.getPhotoSessionNames);
router.get('/folders/:id', GalleryController.checkForUniqueness);
router.delete('/folders/:id', Token.verify, GalleryController.deletePhotosBySessionName);
router.get('/photos/:id', GalleryController.getPhotosByPhotoSessionName);
router.put('/photos', Token.verify, formidableMiddleware(), GalleryController.addPhoto);
router.get('/main-photos', GalleryController.getMainPhotos);
router.delete('/photos/:id', Token.verify, GalleryController.deletePhotoById);

module.exports = router;