'use strict';
var controllers = require('./controllers');
const fileUpload = require('express-fileupload');


module.exports = function(app) {

    app.use(fileUpload());



    app.route('/createfolder')
        .get(controllers.createFolder)
        .post(controllers.createFolder);

    app.route('/renamefile')
        .get(controllers.renameFile)
        .post(controllers.renameFile);


    app.route('/deletefile')
        .get(controllers.deleteFile)
        .post(controllers.deleteFile);
    
    app.route('/getfiles')
        .get(controllers.getFolderContent)
        .post(controllers.getFolderContent);

    app.route('/uploadfiles',controllers.upload.array("uploads[]", 12))
        .get(controllers.uploadFiles)
        .post(controllers.uploadFiles);
    
}