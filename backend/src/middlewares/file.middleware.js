const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 3 * 1024 * 1024,  //3mb
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("application/pdf")) {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are allowed"));
        }
    },
});

module.exports = {
    upload,
}