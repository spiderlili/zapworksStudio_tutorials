Z.screen.on("resize", function(w, h) {
    var aspect_ratio = w/h ;
    
    if(aspect_ratio <= 1.4){
        symbol.controllers.crossPlatform.elements.tablet.activate();
    }
    else{
        symbol.controllers.crossPlatform.elements.mobile.activate();
    }
});
