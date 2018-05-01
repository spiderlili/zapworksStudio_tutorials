//create a content group > snapshot resizer group with a snapshot plane inside
//make 3 states: normal(default), photo taken and fullscreen

let state = 0;
let dataTexture = Z.DataTexture();

Z.screen.on("resize", (w,h)=> {
    symbol.nodes.Snapshot.scale([w/h,1,1]);
    
})

symbol.nodes.Hotspot.on("pointerup", (e) => {
	if(state === 0 ) {
	    Z.device.snapshotToTexture(dataTexture, () => {
	        symbol.nodes.Snapshot.skin(dataTexture);
	        symbol.controllers.States.elements.photo_taken.reset();
	        state++;
	    })
	}
	if(state === 1) {
	    symbol.controllers.States.elements.fullscreen.reset();
	    Z.device.snapshot("", ()=> {
	        state = 0;
	    });
	}
});
