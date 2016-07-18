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

var addEvent = function() {
    if(typeof addEventListener !== "undefined") {
        return function(obj, evt, fn) {
            obj.addEventListener(evt, fn, false);
        };
    } else {
        return function(obj, evt, fn) {
            obj.attachEvent("on" + evt, fn);
        };
    }
}();

function attachDragEventForFirefox() {
    var links = document.querySelectorAll('.drag-photo'), el = null;
    for (var i = 0; i < links.length; i++) {
        el = links[i];

        el.setAttribute('draggable', 'true');

        addEvent(el, 'dragstart', function (e) {
            e.dataTransfer.effectAllowed = 'copy'; // only dropEffect='copy' will be dropable
            e.dataTransfer.setData('Text', this.id); // required otherwise doesn't work
        });
    }
}

