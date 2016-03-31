# W3C's Fullscreen API Polyfill

This little script ease the way to use the [fullscreen API](https://fullscreen.spec.whatwg.org/). As you know, vendors are currently implementing this API so every methods, properties and events are prefixed. This script will detect the API (maybe an already compliant browser? Webkit? Moz?) and if it's not the W3C one, it will wrap those methods, properties and events to match the W3C one.

Maybe an example will be clearer:

```js
// (without this polyfill)
btn.addEventListener("click", function() {
	if (element.requestFullscreen) { // W3C API
		element.requestFullscreen();
	} else if (element.mozRequestFullScreen) { // Mozilla current API
		element.mozRequestFullScreen();
	} else if (element.webkitRequestFullScreen) { // Webkit current API
		element.webkitRequestFullScreen();
	} // Maybe other prefixed APIs?
}, false);

// (with this polyfill)
btn.addEventListener("click", function() {
	// Use the final API, the polyfill will call the mozRequestFullScreen or webKitRequestFullScreen for you
	element.requestFullscreen();
}, false);
```

Remember this script is just a shorthand for the currently implemented API. This API may change and you'll have to update this script (if I don't ;-) ).

# Supported "features" #

Note that this script does only wrap the existing methods, it will not simulate a fullscreen.

 * Methods wrapper for `requestFullscreen` and `exitFullscreen`
 * Properties wrapper for `fullscreenEnabled` and `fullscreenElement`
 * Events propagation for `fullscreenchange` and `fullscreenerror`
 * You can easily change the vendor's API (if they change a method, property or event name)
 * You can choose to "pollute" the DOM by making these wrappers or don't "pollute" and get the API available in the browser (or `undefined` if unavailable)
 * `requestFullscreen` and `exitFullscreen` will return a `Promise` (if supported).

Calling `element.requestFullscreen` will call the correct method (`requestFullscreen`, `mozRequestFullScreen` or `webkitRequestFullScreen`).  
Calling `document.exitFullscreen` will call the correct method (`exitFullscreen`, `mozCancelFullScreen` or `webkitCancelFullScreen`).

The `document.fullscreenEnabled` property will be a reference of the vendor's property (`document.exitFullscreen`, `document.mozFullScreen`or `document.webkitIsFullScreen`).  
The `document.fullscreenElement` property will be a reference of the vendor's property (`document.fullscreenElement`, `document.mozFullScreenElement` or `document.webkitCurrentFullScreenElement`).

Since a lot of you asked, `document.fullscreenEnabled` is a flag to check if the browser allows fullscreen, `document.fullscreenElement` allows you to know which element is currently in fullscreen.

The `fullscreenchange` event (dispatched on the `document`) will be triggered directly by the browser or by an intermediate listener (on `mozfullscreenchange` or `webkitfullscreenchange`).  
The `fullscreenerror` event (dispatched on the `document`) will be triggered directly by the browser or by an intermediate listener (on `mozfullscreenerror` or `webkitfullscreenerror`).
