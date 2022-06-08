function getSize(element) {
	var cs = getComputedStyle(element);

	var paddingX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
	var paddingY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);

	var borderX = parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
	var borderY = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);

	// Element width and height minus padding and border
	elementWidth = parseInt(element.offsetWidth - paddingX - borderX, 10);
	elementHeight = parseInt(element.offsetHeight - paddingY - borderY, 10);
	return ([elementWidth,elementHeight]);
}