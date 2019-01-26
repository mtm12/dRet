// JavaScript Document

var image_xray = new Image();

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    //ev.preventDefault();
    img_id = ev.dataTransfer.getData("text");
    //ev.target.appendChild(document.getElementById(data));
	//alert(img_id);
	var img_element = document.getElementById(img_id);
	image_xray = img_element;
	//alert(image_xray);
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext("2d");
	
	ctx.drawImage(image_xray, 0, 0, 250, 250, 0, 0, 400, 400);
}

function allowDrop(ev) {
    ev.preventDefault();
}