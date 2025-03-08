const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs').promises;

const MIME_TYPES = {
    'image/jpg': '.jpg',
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'pdf/pdf': '.pdf'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'profilePic') {
            cb(null, path.join(__dirname, '../imagesPortfolio'));
        } else if (file.fieldname === 'resumePdf') {
            cb(null, path.join(__dirname, '../pdf'));
        }
    },
    filename: (req, file, cb) => {
        const name = file.originalname.split(' ').join('_').split('.')[0];
        const extension = 'webp';
        const filename = `${name}_${Date.now()}.${extension}`;
        req.optimizedFilename = filename;
        cb(null, filename);
    }
});

const upload = multer({ storage }).fields([{ name: 'profilePic', maxCount: 1 }, { name: 'resumePdf', maxCount: 1 }]);

const uploadAndOptimizeImagePortfolio = async (req, res, next) => {
    try {
        await new Promise((resolve, reject) => {
            upload(req, res, (err) => {
                if (err) {
                    console.error("Error during upload:", err);
                    return reject(res.status(500).json({ error: err.message }));
                }
                if (!req.files) {
                    return reject(res.status(400).json({ error: 'No files uploaded' }));
                }
                resolve();
            });
        });

        if (req.files.profilePic) {
            const originalFilePath = req.files.profilePic[0].path;
            const tempFilePath = path.join(req.files.profilePic[0].destination, `temp_${req.optimizedFilename}`);
            const optimizedFilePath = path.join(req.files.profilePic[0].destination, req.optimizedFilename);

            // Optimiser l'image vers un fichier temporaire
            await sharp(originalFilePath)
                .resize(800)
                .webp({ quality: 80 })
                .toFile(tempFilePath);

            // Supprimer le fichier original et renommer le fichier temporaire
            await fs.unlink(originalFilePath);
            await fs.rename(tempFilePath, optimizedFilePath);

            req.files.profilePic[0].path = optimizedFilePath;
            req.files.profilePic[0].filename = req.optimizedFilename;
        }

        next();
    } catch (error) {
        console.error("Error optimizing image:", error);
        res.status(500).json({ error: 'Error optimizing image' });
    }
};

module.exports = uploadAndOptimizeImagePortfolio;
