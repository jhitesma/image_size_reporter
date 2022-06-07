// size_reporter.js

function imgReport() {
	var imgs = Array.from(document.getElementsByTagName("img"));
	imgs = Array.prototype.filter.call(imgs, function(elem){ return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length )});

	console.log('Found ' + imgs.length + ' images.');

	// remove existing .img-helper elements
	Array.prototype.forEach.call(Array.from(document.getElementsByClassName("img-helper")), function(el, i){
		if (el.parentNode !== null) {
			el.parentNode.removeChild(el);
		}
	});

	Array.prototype.forEach.call(imgs, function (img, i){
		if (img.getAttribute('src')) {
			const ih = document.createElement('small');
			ih.classList.add('img-helper');

			var comp = getSize(img);

			const iTxt = document.createTextNode(comp[0] + ' x ' + comp[1] + ' ' + ' (' + img.naturalWidth + 'x' + img.naturalHeight + ')');
			ih.appendChild(iTxt);
			img.insertAdjacentElement('afterend', ih);
		    console.log(img.getAttribute('src') + ' | ' + img.getAttribute('id') + ' | ' + img.getAttribute('class') + ' | ' + comp[0] + 'x' + comp[1] + ' | ' + img.naturalWidth + 'x' + img.naturalHeight);
		} else {
			console.log('No Src: ' + img);
		}
	});

}


function getSize(element) {
	var cs = getComputedStyle(element);

	var paddingX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
	var paddingY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);

	var borderX = parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
	var borderY = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);

	// Element width and height minus padding and border
	elementWidth = element.offsetWidth - paddingX - borderX;
	elementHeight = element.offsetHeight - paddingY - borderY;
	return ([elementWidth,elementHeight]);
}

window.onresize = imgReport;