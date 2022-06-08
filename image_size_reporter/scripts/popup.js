// Get our button
let getSizes = document.getElementById("getSizes");

console.log(getSizes);
// When the button is clicked, run our report
getSizes.addEventListener("click", async () => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

	chrome.scripting.executeScript({
		target: {tabId: tab.id},
		files: ['scripts/size_reporter.js'],
		function: imgReport(),
	});
});