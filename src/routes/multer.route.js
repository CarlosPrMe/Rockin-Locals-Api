const Router = require("koa-router");
const router = new Router({
    prefix: '/uploads'
});

const multer = require('koa-multer');

const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        fs.mkdir('../uploads', function (err) {
            if (err) {
            } else {
                callback(null, '../uploads');
            }
        })
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});

class MulterRouter {

    static async save(req, res) {    
        var upload = multer({
            storage: storage,
            fileFilter: function (req, file, callback) {
                var ext = path.extname(file.originalname);
                if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                    return callback(new Error('Only images are allowed'))
                }
                callback(null, true)
            }
        })
       upload.single('userFile');
    };

}


router.post('/', MulterRouter.save)
module.exports = router;
