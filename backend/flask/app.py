# backend/app.py

from flask import Flask, request, jsonify
import numpy as np
from PIL import Image
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input

app = Flask(__name__)

# Load the trained model
model = load_model('/Users/chamidiperera/Documents/FYP Codes/Care/backend/models/mobileNetV2/detection/MobileNetV2_multi_detect.h5')
class_names = {
    0: 'Eye',
    1: 'Skin',
}

# Function to preprocess the image
def preprocess_image(image_path):
    img = Image.open(image_path)
    img = img.resize((224, 224))  # Resize image to match model's expected sizing
    img_array = np.array(img)  # Convert to numpy array
    img_array = np.expand_dims(img_array, axis=0)  # Expand dimensions to create batch size of 1
    img_array = preprocess_input(img_array)  # Preprocess the image
    return img_array

# Function to predict the disease
def predict_disease(image_array, model):
    predictions = model.predict(image_array)
    predicted_class = np.argmax(predictions[0])  # Get the index of the predicted class
    confidence = np.max(predictions[0])  # Get the confidence of the prediction
    return predicted_class, confidence

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image found in request'}), 400

    image_file = request.files['image']
    image_path = 'temp.jpg'
    image_file.save(image_path)

    try:
        img_array = preprocess_image(image_path)  # Pass the image path here
        prediction, confidence = predict_disease(img_array, model)
        predicted_class = class_names[prediction]
        result = {
            'predicted_class': predicted_class,
            'confidence': float(confidence)
        }
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
