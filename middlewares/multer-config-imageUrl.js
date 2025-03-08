const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs').promises;

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '../imagesProject'));
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_').split('.')[0];
        const extension = 'webp';
        const filename = `${name}_${Date.now()}.${extension}`;
        req.optimizedFilename = filename;
        callback(null, filename);
    }
});

const upload = multer({ storage }).single('imageUrl');

const uploadAndOptimizeImageProject = async (req, res, next) => {
    try {
        await new Promise((resolve, reject) => {
            upload(req, res, (err) => {
                if (err) {
                    console.error("Error during upload:", err);
                    return reject(res.status(500).json({ error: err.message }));
                }
                if (!req.file) {
                    return reject(res.status(400).json({ error: 'No file uploaded' }));
                }
                resolve();
            });
        });

        const originalFilePath = req.file.path;
        const tempFilePath = path.join(req.file.destination, `temp_${req.optimizedFilename}`);
        const optimizedFilePath = path.join(req.file.destination, req.optimizedFilename);

        // Optimiser l'image vers un fichier temporaire
        await sharp(originalFilePath)
            .resize(800)
            .webp({ quality: 80 })
            .toFile(tempFilePath);

        // Supprimer le fichier original et renommer le fichier temporaire
        await fs.unlink(originalFilePath);
        await fs.rename(tempFilePath, optimizedFilePath);

        req.file.path = optimizedFilePath;
        req.file.filename = req.optimizedFilename;

        next();
    } catch (error) {
        console.error("Error optimizing image:", error);
        res.status(500).json({ error: 'Error optimizing image' });
    }
};

module.exports = uploadAndOptimizeImageProject;
