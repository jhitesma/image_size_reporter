// size_reporter.js

// Get our button
let getSizes = document.getElementById("getSizes");

console.log(getSizes);
// When the button is clicked, run our report
getSizes.addEventListener("click", async () => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

	chrome.scripting.executeScript(
		{
			target: {tabId: tab.id},
			function: imgReport,
		},
		(injectionResults) => {
			for(const frameResult of injectionResults) {
				shareReport(frameResult.result);
			}
	});
});


function shareReport(data) {
	console.log(data);
	let report = document.getElementById('report');
	document.getElementById('imageCount').innerHTML = report.length;
}


function imgReport() {
	let imgs = Array.from(document.getElementsByTagName("img"));
	let report = [];

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
			ih.classList.add('img-helper', 'bg-white', 'text-dark', 'border', 'border-dark', 'rounded', 'p-1');

			const cs = getComputedStyle(img);

			const paddingX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
			const paddingY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);

			const borderX = parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
			const borderY = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);

			// Element width and height minus padding and border
			elementWidth = parseInt(img.offsetWidth - paddingX - borderX, 10);
			elementHeight = parseInt(img.offsetHeight - paddingY - borderY, 10);
			const comp = ([elementWidth,elementHeight]);

			const iTxt = document.createTextNode(comp[0] + ' x ' + comp[1] + ' ' + ' (' + img.naturalWidth + 'x' + img.naturalHeight + ')');
			ih.appendChild(iTxt);
			img.insertAdjacentElement('afterend', ih);

			const bigText = img.getAttribute('src') + ' | ' + img.getAttribute('id') + ' | ' + img.getAttribute('class') + ' | ' + comp[0] + 'x' + comp[1] + ' | ' + img.naturalWidth + 'x' + img.naturalHeight;
			const rTxt = document.createTextNode(bigText);
			report.push({
				'text': bigText,
				'src': img.getAttribute('src'),
				'id': img.getAttribute('id'),
				'classes': img.getAttribute('class'),
				'renderedW': comp[0],
				'renderedH': comp[1],
				'origW': img.naturalWidth,
				'origH': img.naturalHeight,
			});
		    console.log(bigText);
		} else {
			console.log('No Src: ' + img);
		}
	});
	return JSON.stringify(report);
}


//window.onresize = imgReport;