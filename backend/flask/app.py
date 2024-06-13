from flask import Flask, request, jsonify
from PIL import Image
import torch
from io import BytesIO
import base64
import io
import numpy as np
import matplotlib.pyplot as plt
from functions import preprocess_image_prediction, predict_diseases, skin_or_eye_model, class_names, skin_model, eye_model
from skimage.segmentation import mark_boundaries
from lime import lime_image
import matplotlib
matplotlib.use('Agg')

import matplotlib.pyplot as plt
from going_modular.going_modular.predictions import pred_and_plot_image
from torchvision import transforms
from xai import lime_explain_and_predict_image

app = Flask(__name__)


@app.route('/lime_explanation', methods=['POST'])
def lime():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    
    image_file = request.files['image']
    image = Image.open(image_file)
    
    # Path to your saved ViT model
    saved_model_path = "/Users/chamidiperera/Documents/FYP Codes/savedModels/eye/pretrained_vit_eye_final.pth"
    
    # Call the lime_explain_and_predict_image function
    lime_explanation_image = lime_explain_and_predict_image(saved_model_path, image)
    
    # Convert Lime explanation image to base64
    buffered = io.BytesIO()
    lime_explanation_image.save(buffered, format="PNG")
    encoded_image = base64.b64encode(buffered.getvalue()).decode("utf-8")
    
    # Return the base64 encoded Lime explanation image
    return jsonify({'lime_explanation': encoded_image}), 200

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image sent'}), 400

    image_file = request.files['image']
    image = Image.open(BytesIO(image_file.read()))

    # Preprocess image
    input_tensor = preprocess_image_prediction(image)

    # Predict using the skin or eye model
    with torch.no_grad():
        outputs = skin_or_eye_model(input_tensor)
        probabilities = torch.softmax(outputs, dim=1)
        skin_or_eye_confidence, predicted_class = torch.max(probabilities, dim=1)

    _, predicted = torch.max(outputs, 1)
    predicted_class = class_names[predicted.item()]

    if predicted_class == 'eye':
        predicted_class_index, confidence = predict_diseases(input_tensor, eye_model)
        diseases = ['Blepharitis','Conjunctivitis','Entropion','EyelidTumor','HealthyEye','Mastopathy','Nuclear Sclerosis','Pigmented Keratitis']
    elif predicted_class == 'skin':
        predicted_class_index, confidence = predict_diseases(input_tensor, skin_model)
        diseases = ['circlar alopecia','flees','healthy','runglong','skin lesions']
    else:
        return jsonify({'error': 'Invalid prediction'}), 400

    predicted_disease = diseases[predicted_class_index]

    return jsonify({'predicted_class': predicted_class, 'predicted_disease': predicted_disease, 'diseases_confidence': confidence, "skin_or_eye_confidence": skin_or_eye_confidence.item()}), 200


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)