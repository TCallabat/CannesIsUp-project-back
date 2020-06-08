const multer = require("multer");

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "application/pdf": "pdf",
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "public")
    },

    filename: (req, file, callback) => {
        const fieldname = file.fieldname.split(" ").join("_")
        const date = Date.now()
        const originalname = file.originalname.split('.').slice(0, -1).join('.')
        const ext = MIME_TYPES[file.mimetype];
        callback(null, fieldname + "_" + date + "_" + originalname + "." + ext)
    }
})

//module.exports = multer({ storage: storage }).any();
module.exports = multer({ storage: storage }).fields([
    { name: "companyLogo", maxCount: 1 },
    { name: "companyBanner", maxCount: 1 },
    { name: "companyPresentation", maxCount: 1 },
    { name: "contactAvatar", maxCount: 1 },
])