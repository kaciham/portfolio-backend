const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

const MIME_TYPES = {
    'image/jpg': '.jpg',
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'pdf/pdf':'.pdf'
};
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            if (file.fieldname === 'profilePic') {
                cb(null, path.join(__dirname, '../imagesPortfolio'));
            } else if (file.fieldname === 'resumePdf') {
                cb(null, path.join(__dirname, '../pdf'));
            }
        },
        filename: (req, file, cb) => {
            const name = file.originalname.split(' ').join('_').split('.')[0];
            const extension = MIME_TYPES[file.mimetype] || path.extname(file.originalname);
            const filename = `${name}_${Date.now()}${extension}`;
            cb(null, filename);
        }
    }),
    limits: { fileSize: 8 * 1024 * 1024 }, // 8MB file size limit
    fileFilter: (req, file, cb) => {
        const fileExt = path.extname(file.originalname).toLowerCase();
        if (file.fieldname === 'resumePdf' && fileExt === '.pdf') {
            cb(null, true); // Accept only PDFs for 'resumePdf'
        } else if (file.fieldname === 'profilePic' && ['.jpg', '.jpeg', '.png'].includes(fileExt)) {
            cb(null, true); // Accept only images for 'profilePic'
        } else {
            cb(new Error('Invalid file type!'), false); // Reject invalid files
        }
    }
}).fields([{ name: 'profilePic', maxCount: 1 }, { name: 'resumePdf', maxCount: 1 }]);

const uploadAndOptimizeImagePortfolio = (req, res, next) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!req.files) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        if (req.files.profilePic) {
            const originalFilePath = req.files.profilePic[0].path;
            const optimizedFilePath = path.join(req.files.profilePic[0].destination, `optimized_${req.files.profilePic[0].filename}`);

            try {
                // Optimize the image
                await sharp(originalFilePath)
                    .resize(800) // Resize to 800px width
                    .jpeg({ quality: 80 }) // Compress the image
                    .toFile(optimizedFilePath);

                // Optionally, delete the original file after optimization
                fs.unlinkSync(originalFilePath);

                // Update req.files.profilePic to point to the optimized image
                req.files.profilePic[0].path = optimizedFilePath;
                req.files.profilePic[0].filename = `optimized_${req.files.profilePic[0].filename}`;
            } catch (error) {
                return res.status(500).json({ error: 'Error optimizing image' });
            }
        }

        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = uploadAndOptimizeImagePortfolio;
