<?php

	//require "ip_address.php";

	$image = $_POST['imgBase64'];

	//echo $image;

	$headers = array('Content-Type: application/json', 'Authorization: Bearer $(gcloud auth application-default print-access-token)');
	//$fields = array('image'=>$image);
	//$payload = json_encode($fields);
	$payload = '{"payload": {"image": {"imageBytes":"'.$image.'}}}';
	echo $payload;
	$url = 'https://automl.googleapis.com/v1beta1/projects/test-203900/locations/us-central1/models/ICN566947215096254553:predict';
	$curl_session = curl_init();
	
	curl_setopt($curl_session, CURLOPT_URL, $url);
	curl_setopt($curl_session, CURLOPT_POST, true);
	curl_setopt($curl_session, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($curl_session, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl_session, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($curl_session, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
	curl_setopt($curl_session, CURLOPT_POSTFIELDS, $payload);
				
	$result = curl_exec($curl_session);

	curl_close($curl_session);
				
	echo $result;

?>