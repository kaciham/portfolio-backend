const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, '../pdf/');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer for PDF file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Store PDFs in the 'pdf/' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Prepend timestamp to the file name
    }
});

// File filter to only allow PDF files
const fileFilter = (req, file, cb) => {
    const fileExt = path.extname(file.originalname).toLowerCase();
    if (fileExt === '.pdf') {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Invalid file type, only PDFs are allowed!'), false); // Reject other file types
    }
};

// Multer configuration for single file upload (resumePdf field)
const uploadPdf = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 8 * 1024 * 1024 } // 8MB file size limit
}).single('resumePdf');

module.exports = uploadPdf;
