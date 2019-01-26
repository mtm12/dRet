import ip_address
from flask import Flask, abort, jsonify, request
import sys
from google.cloud import automl_v1beta1
from PIL import Image, ImageFilter
import base64
import io
import numpy as np
import pandas as pd

app = Flask(__name__)

@app.route("/dRet/api", methods=['POST'])
def make_predict():
	data = request.get_json(force=True)
	predict_request = data['image']
	
	decoded_image = Image.open(io.BytesIO(base64.b64decode(predict_request.split(',')[1])))
	#print("end predict request")
	#decoded_image.save("xray/image.png")
	image250 = decoded_image.resize((2240,1480),Image.ANTIALIAS)
	rgbimg = Image.new("RGB", image250.size)
	rgbimg.paste(image250)
	imgByteArr = io.BytesIO()
	rgbimg.save(imgByteArr, format='PNG')
	imgByteArr = imgByteArr.getvalue()
	#imgData = np.asarray(rgbimg)
	#imgData = imgData/255
	#image250.save("dRet/test_image.png")
	#img_data = np.asarray(imgData)
	#img_data = imgData.reshape(2240,1480,3)
	
	#img_bytes = base64.b64encode(img_data)
	#img_bytes = image250.getdata()
	client = automl_v1beta1.PredictionServiceClient.from_service_account_json(filename='test-203900-cd3ab3038728.json')
	name = 'projects/test-203900/locations/us-central1/models/ICN566947215096254553'
	#with open('20060529_56834_0100_PP.png', 'rb') as ff:
	#with open('20051130_59930_0400_PP.png', 'rb') as ff:
	#	imgData2 = ff.read()
	#print(imgByteArr)
	payload = {'image': {'image_bytes': imgByteArr}}
	prediction = client.predict(name=name, payload=payload, params={})
	print(prediction)
	for result in prediction.payload:
		class_name = result.display_name
		class_score = result.classification.score
		#print("Predicted class name: {}".format(result.display_name))
		#print("Predicted class score: {}".format(result.classification.score))

	return jsonify({'class_name': str(class_name), 'class_score': str(class_score)}), 201


	
@app.route("/test/api")
def hello():
	a = "20"
	return jsonify({'value': a}), 201

if __name__=='__main__':
	app.run(host=ip_address.ip_address, port=5003)