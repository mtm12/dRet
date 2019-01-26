

function predict(){
	
	$.ajax({
		type: "POST",
		url: "../cgi-bin/php/predict_dRet.php",
		async: false,
		datatype: 'json',
		data: {
			imgBase64: canvas.toDataURL("image/png")
		},
		success: function(response){
			try {
				dRet_id.innerHTML = "Error";
				no_dRet_id.innerHTML = "Error";
				console.log(response);
				var obj = JSON.parse(response);
				//console.log("TEST2");
				console.log(obj.class_name);
				console.log(obj.class_score);
				if (obj.class_name == "dRet") {
					dRet_id.innerHTML = (parseFloat(obj.class_score)*100).toFixed(1) + "%";
					no_dRet_id.innerHTML = (100-(parseFloat(obj.class_score)*100)).toFixed(1) + "%";
				} else {
					dRet_id.innerHTML = (100-(parseFloat(obj.class_score)*100)).toFixed(1) + "%";
					no_dRet_id.innerHTML = (parseFloat(obj.class_score)*100).toFixed(1) + "%";
				}
			}
			catch(err){
				console.log(response);
				dRet_id.innerHTML = "Error1";
				no_dRet_id.innerHTML = "Error1";
			}

		},
		error: function(response){
			console.log(response);
			dRet_id.innerHTML = "Error2";
			no_dRet_id.innerHTML = "Error2";
		}
	})
	
}
var image_dRet = new Image();

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    //ev.preventDefault();
    img_id = ev.dataTransfer.getData("text");
    //ev.target.appendChild(document.getElementById(data));
	//alert(img_id);
	var img_element = document.getElementById(img_id);
	image_dRet = img_element;
	//alert(image_dRet);
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext("2d");
	
	ctx.drawImage(image_dRet, 0, 0, 2240, 1488, 0, 0, 400, 265);
}

function allowDrop(ev) {
    ev.preventDefault();
}



function page_load(){
	

	dRet_id = document.getElementById("dRet");
	no_dRet_id = document.getElementById("no_dRet");
	
	//x_ray_image_id = document.getElementById("x_ray_image");
}