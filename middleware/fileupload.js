var PATH = require('path')
var multer = require('multer')
const {strtoBase64} = require('../utils/base64')

const fullPath = PATH.resolve(__dirname, '../public/uploads/head');

var storage = multer.diskStorage({
    //存储位置
    destination: function (req, res, cb) {
        cb(null, fullPath)
    },
    filename: function (req, file, cb) {
        let _originalName = strtoBase64(file.originalname) //原名
        let _extName = PATH.extname(file.originalname) //后缀名
        let _baseName = PATH.basename(_originalName, _extName) //文件名
        let _filename = _baseName + '_' + Date.now() + _extName;
        req.body.head = req.headers.host + '/commonstatic/uploads/head/' + _filename
        cb(null, _filename)
    }
})

//过滤文件类型
function fileFilter(req, file, cb) {
    let _flag = file.mimetype.startsWith('image')
    cb(_flag ? null : new Error('图片格式不正确'), _flag)
}
var upload = multer({storage, fileFilter }).single('avator')

const fileUpload = function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            res.set('content-type', 'application/json;charset=utf8')
            res.json( {
                code: 500,
                data: {
                    error: err
                },
                message:err.message
            })
        } else {
            next()
        }
    })
}

module.exports = fileUpload