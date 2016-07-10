/**
 * Created by durgesh.patle on 01-May-16.
 */
var currentDraggingBackground;
function allowDrop(ev) {
    ev.preventDefault();
    console.log("allowdrop");
}

function drag(ev) {
    currentDraggingBackground = $(ev.target).css("background-image").replace(/"/g,"").replace("url(","").replace(")","");
}

function drop(ev) {
    ev.preventDefault();
    var currentTarget =  $(ev.currentTarget);
    var currentIndex = currentTarget.index();
    var imageTile = "<img draggable='false' src='"+currentDraggingBackground+"'/>";
    currentTarget.find(".tile-picture").html(imageTile);
    var targetWidth = currentTarget.width(),
        targetHeight= currentTarget.height(),
        targetRatio = targetWidth/targetHeight,
        imageWidth, imageHeight, imageRatio;
    var imageObj = new Image();
    imageObj.src = currentDraggingBackground;
    imageObj.onload = function(){
        imageWidth = this.width;
        imageHeight = this.height;
        imageRatio = imageWidth/imageHeight;
        if(targetRatio > imageRatio) {
            currentTarget.find("img").css('width',targetWidth+"px");
        } else {
            var leftMargin = 0 - (((targetHeight * imageRatio) - targetWidth)/2);
            currentTarget.find("img").css({
                'height' : targetHeight+"px",
                'margin-left' : leftMargin+"px"
            });
        }
        angular.element("#new-view").scope().onPhotoDrop(currentIndex,currentDraggingBackground);
    };
}
