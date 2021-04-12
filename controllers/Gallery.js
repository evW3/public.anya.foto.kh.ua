const { GalleryService } = require('../services/gallery');
const { v4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const config = require('config');

const domain = config.serverDomain;

class Gallery {
    async addPhoto(req, res) {
        try {
            const { photoSessionName, main } = req.fields;
            if(req.files?.photo) {
                const { name, path: imagePath } = req.files.photo;
                const extension = name.split('.').reverse()[0];
                const imageName = `${ v4() + '.' + extension }`;
                const url = `${imageName}`;
                fs.writeFileSync(path.resolve(__dirname, '..', 'uploads', `${ imageName }`), fs.readFileSync(imagePath));
                const id = await GalleryService.setPhotosBySessionName({ photoSessionName, main, url  });
                res.status(200).json({ url: `${domain}uploads/${url}`, id });
            } else {
                res.status(500).json({ message: `Can\`t upload undefined file!` });
            }
        } catch (e) {
            res.status(500).json({ message: `[ERROR]: ${e}`});
            console.log(e);
        }
    }

    async getPhotoSessionNames(_, res) {
        try {
            const folders = await GalleryService.getPhotoSessionNames();
            res.status(200).json({ folders });
        } catch (e) {
            res.status(500).json({ message: `[ERROR]: ${e}`});
        }
    }

    async getPhotosByPhotoSessionName(req, res) {
        try {
            const { id } = req.params;
            res.status(200).json({
                photos: (await GalleryService.getPhotosBySessionName(id)).map(item => ({ ...item, url: `${ domain }uploads/${item.url}` }))
            });
        } catch (e) {
            res.status(500).json({ message: `[ERROR]: ${e}`});
        }
    }

    async getMainPhotos(_, res) {
        try {
            res.status(200).json({
                photos: (await GalleryService.getMainPhotos()).map(item => ({ ...item, url: `${ domain }uploads/${item.url}` }))
            });
        } catch (e) {
            res.status(500).json({ message: `[ERROR]: ${e}`});
        }
    }
    async checkForUniqueness(req, res) {
        try {
            const { id } = req.params;
            res.status(200).json({ isUniqueness: await GalleryService.checkForUniqueness(id) });
        } catch (e) {
            res.status(500).json({ message: `[ERROR]: ${e}`});
        }
    }

    async deletePhotosBySessionName(req, res) {
        try {
            const { id } = req.params;
            await GalleryService.deletePhotosBySessionName(id);
            res.status(200).json({ message: 'delete was been success' });
        } catch (e) {
            res.status(500).json({ message: `[ERROR]: ${e}`});
        }
    }

    async deletePhotoById(req, res) {
        try {
            const { id } = req.params;
            const { url } = req.body;
            await GalleryService.deleteByPhotoId(id);
            res.status(200).json({ message: 'delete was been success' });
            fs.unlinkSync(path.resolve(__dirname, '..', 'uploads', url.split('/').reverse()[0]));
        } catch (e) {
            res.status(500).json({ message: `[ERROR]: ${e}`});
        }
    }
}


module.exports = { GalleryController: new Gallery() }