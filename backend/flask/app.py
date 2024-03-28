from flask import Flask, request, jsonify
from PIL import Image
import torch
from torchvision import transforms
from io import BytesIO

app = Flask(__name__)

# Load the ViT model
class_names = ['eye', 'skin']
skin_or_eye_model_path = "/Users/chamidiperera/Documents/FYP Codes/Care/backend/models/vit/detection/pretrained_vit_skinOrEye_final.pth"
skin_model_path = "/Users/chamidiperera/Documents/FYP Codes/Care/backend/models/vit/skin/pretrained_vit_skin_final.pth"
eye_model_path = "/Users/chamidiperera/Documents/FYP Codes/Care/backend/models/vit/eye/FinalizedModel/pretrained_vit_eye_final.pth"
pretrained_vit = torch.load(skin_or_eye_model_path)
skin_model = torch.load(skin_model_path)
eye_model = torch.load(eye_model_path)
pretrained_vit.eval()
skin_model.eval()
eye_model.eval()

# Define image transformations
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

def preprocess_image(image):
    input_tensor = transform(image).unsqueeze(0)
    return input_tensor

# Function to predict diseases
def predict_diseases(image_tensor, model):
    with torch.no_grad():
        outputs = model(image_tensor)
    probabilities = torch.softmax(outputs, dim=1)
    confidence, predicted_class = torch.max(probabilities, dim=1)
    return predicted_class.item(), confidence.item()

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image sent'}), 400

    image_file = request.files['image']
    image = Image.open(BytesIO(image_file.read()))

    # Preprocess image
    input_tensor = preprocess_image(image)

    # Predict using the initial ViT model
    with torch.no_grad():
        outputs = pretrained_vit(input_tensor)
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

    # Returning the prediction results
    return jsonify({'predicted_class': predicted_class, 'predicted_disease': predicted_disease, 'diseases_confidence': confidence, "skin_or_eye_confidence": skin_or_eye_confidence.item()}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)