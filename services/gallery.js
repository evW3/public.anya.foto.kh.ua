const { Gallery } = require('../models/Gallery');

class GalleryService {
    async getPhotoSessionNames() {
        const tmp = {};
        const names = await Gallery.findAll({ where: {}, raw: true });
        names.forEach( item => tmp[item.photoSessionName] = true );
        return Object.keys(tmp);
    }

    async getPhotosBySessionName(photoSessionName) {
        return await Gallery.findAll({ where: { photoSessionName }, raw: true });
    }

    async getMainPhotos() {
        return await Gallery.findAll({ where: { main: 1 }, raw: true });
    }

    async setPhotosBySessionName(photo) {
        const { id } = await Gallery.create(photo);
        return id;
    }

    async deletePhotosBySessionName(photoSessionName) {
        await Gallery.destroy({ where: { photoSessionName } });
    }

    async deleteByPhotoId(id) {
        await Gallery.destroy({ where: { id } });
    }

    async checkForUniqueness(photoSessionName) {
        const isUniqueness = (await Gallery.findAll({ where: { photoSessionName }, raw: true })).length;
        return !isUniqueness;
    }
}

module.exports = { GalleryService: new GalleryService() };