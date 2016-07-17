/**
 * Created by durgesh.patle on 05-Jun-16.
 */

var restify = require('restify');
var http = require('http'),
    fs = require('fs'),
    request = require('request'),
    writePathPrefix = "../html/";

function downloadImageToDisk(imageURL,path,callback) {
        request({url: imageURL, encoding: null}, function (err, res, body) {
            if (!err && res.statusCode == 200) {
                var base64prefix = 'data:' + res.headers['content-type'] + ';base64,'
                    , image = body.toString('base64');
                if (typeof callback == 'function') {
                    fs.writeFile(writePathPrefix+path, image, 'base64', function(err) {
                        if (err) throw err
                        callback(path);
                    });
                }
            } else {
                throw new Error('Can not download image');
            }
        });
}

//params - blob and id
function respondForStoreFacebookImage(req, res, next) {
    var imageURL = req.query.image,
        path = req.params.id;
    downloadImageToDisk(imageURL,path,function(data){
        res.send(201,data);
        next();
    });
}

//params - blob and id
function respondForStoreBlobImage(req, res, next) {
    var blob = getQueryVariable(req.body,"blob"),
        path = getQueryVariable(req.body,"id");
    var base64Data = blob.replace(/^data:image\/png;base64,/, "");

    fs.writeFile(writePathPrefix+path, base64Data, 'base64', function(err) {
        if (err) throw err
        res.send(201,path);
        next();
    });
}


function respondForCleanHostedImages(req,res,next) {
    var imageArray = req.params["imageArray"];
    deleteHostedImages(imageArray,function(){
        res.send(201,"deleted");
        next();
    });
}

function deleteHostedImages(imageArray,callback) {
    if(imageArray.length>0) {
        fs.exists(writePathPrefix+imageArray[0], function(exists) {
            if(exists) {
                fs.unlink(writePathPrefix+imageArray[0]);
            }
            imageArray.shift();
            deleteHostedImages(imageArray,callback);
        });
    } else {
        callback();
    }
}

function getQueryVariable(query,variable) {
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
}

var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(
    function crossOrigin(req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        return next();
    }
);
server.post('/saveBlobImage', respondForStoreBlobImage);
server.get('/saveFacebookImage', respondForStoreFacebookImage);
server.del('/cleanHostedImages', respondForCleanHostedImages);

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});