from flask import Flask, request, jsonify
from PIL import Image
import torch
from torchvision import transforms
from io import BytesIO
import torch.nn.functional as F
import numpy as np
import torch.nn as nn
import matplotlib.pyplot as plt
import torchvision.transforms as transforms
import io
import base64
from lime import lime_image
from skimage.segmentation import mark_boundaries
from going_modular.going_modular.predictions import pred_and_plot_image

class_names = ['eye', 'skin']
skin_or_eye_model_path = "/Users/chamidiperera/Documents/FYP Codes/savedModels/detect/pretrained_vit_skinOrEye_final.pth"
skin_model_path = "/Users/chamidiperera/Documents/FYP Codes/savedModels/skin/pretrained_vit_skin_final.pth"
eye_model_path = "/Users/chamidiperera/Documents/FYP Codes/savedModels/eye/pretrained_vit_eye_final.pth"
skin_or_eye_model = torch.load(skin_or_eye_model_path)
skin_model = torch.load(skin_model_path)
eye_model = torch.load(eye_model_path)
skin_or_eye_model.eval()
skin_model.eval()
eye_model.eval()

# Define image transformations
transform_prediction = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

def preprocess_image_prediction(image):
    input_tensor = transform_prediction(image).unsqueeze(0)
    return input_tensor

def predict_diseases(image_tensor, model):
    with torch.no_grad():
        outputs = model(image_tensor)
    probabilities = torch.softmax(outputs, dim=1)
    confidence, predicted_class = torch.max(probabilities, dim=1)
    return predicted_class.item(), confidence.item()
