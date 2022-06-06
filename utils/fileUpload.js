const multer = require('multer')
const path = require('path')

// set storage
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, cb){
        cb(null, file.fieldname  + '-' + Date.now() + path.extname(file.originalname))
    }
})

// initilee upload
const upload = multer({
    storage,
    limits: {fileSize: 10000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }
})
// Yana bitta kichik muamo bo'lyaptida, rasmni yuklashda file kengaytmasi bilan yuklanmayapti codini
// (path.extname(file.originalname)) 
// consolega ham chiqarib ko'rdim rasm kengaytmasini chiqarmayapti

// check file image
function checkFileType(file, cb){
    const fileTypes = /jpeg|jpg|png|gif/
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = fileTypes.test(file.mimetype)

    if(mimetype && extname){
        return cb(null, true)
    }else{
        cb('Error: You can only upload image files')
    }
}

module.exports = upload