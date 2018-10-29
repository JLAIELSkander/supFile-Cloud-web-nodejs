'use strict';

var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
const formidable = require('formidable');
var multer = require('multer');


var storage = multer.diskStorage({

    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
});

module.exports.upload = multer({ storage: storage });


module.exports.createFolder = function(req,res) {

    var params;

    if(Object.keys(req.query).length > 0) {
        params = req.query;
    } else if(Object.keys(req.params).length > 0) {
        params = req.params;
    } else if(Object.keys(req.body).length > 0) {
        params = req.body;
    }

    if(params) {
        var paths = path.normalize(params.path.toString() + "/" + params.name.toString())

        if(!fs.existsSync(paths)) {
            fs.mkdirSync(paths);
            res.send({success : true});
        } else {
            res.send({success : false});
        }
    } else {
        res.send({success : false})
    }
}

module.exports.renameFile = function(req,res) {

    var params,oldPath,newPath;

    if(Object.keys(req.query).length > 0) {
        params = req.query;
    } else if(Object.keys(req.params).length > 0) {
        params = req.params;
    } else if(Object.keys(req.body).length > 0) {
        params = req.body;
    }
    
    if(params) {
        oldPath = path.normalize(params.oldPath);
        newPath = path.normalize(params.newPath)

        fs.rename(oldPath,newPath,(err) => {
            if(err) {
                res.send({success : false});
            } else {
                res.send({success : true});
            }
        })
    } else {
        res.send({success : false})
    }

}

module.exports.deleteFile = function(req,res) {
    var params;

    if(Object.keys(req.query).length > 0) {
        params = req.query;
    } else if(Object.keys(req.params).length > 0) {
        params = req.params;
    } else if(Object.keys(req.body).length > 0) {
        params = req.body;
    }

    if(params) {
        var paths = path.normalize(params.path);

        rimraf(paths,(err) => {
            if(err) {
                console.log(err);
                res.send(false);
            } else {
                res.send(true);
            }
        })
    } else {
        req.send(false);
    }
}

module.exports.getFolderContent = function(req,res) {
    var fileContent = [];

    var params;

    if(Object.keys(req.query).length > 0) {
        params = req.query;
    } else if(Object.keys(req.params).length > 0) {
        params = req.params;
    } else if(Object.keys(req.body).length > 0) {
        params = req.body;
    }

    if(params) {
        var paths = path.normalize(params.path);

        var files = fs.readdirSync(paths,"utf-8");

        for(var i = 0; i < files.length;i++) {
            var fileInfo = {};
            fileInfo["name"] = files[i];
            fileInfo["path"] = path.normalize(paths + "/"  + files[i]);
            var info = fs.statSync(fileInfo["path"]);
            var extension = path.extname(files[i]);

            fileInfo["date"] = info["ctime"];
            fileInfo["size"] = info["size"];
            
            if(extension.length > 0) {
                fileInfo["type"] = extension.substring(1);
            } else {
                fileInfo["type"] = "Directory";
            }
            

            

            fileContent.push(fileInfo);
            
        }
    }

    res.send(JSON.stringify(fileContent));

}


var upload = function(files,path,callback) {

    for(var i = 0; i < files.length;i++) {
        
        var file = files[i];

        fs.writeFile(path + file.name, file.data, function (err) {
            if (err) callback(false);
            console.log("saved")
        });
    }

    callback(true);

}

module.exports.uploadFiles = function(req,res) {

    var newpath = 'C:/Users/mouss/Documents/supfile/';

    var files = req.files['uploads[]'];

    if(files.length == undefined) {
        files = [files]
    }

    upload(files,newpath,(val) => {
        res.send(val);
    })
    
    
   

}
