import numpy as np
import torch
from PIL import Image
from torchvision import transforms
from lime import lime_image
from skimage.segmentation import mark_boundaries
import io
import base64

def lime_explain_and_predict_image(saved_model_path, image):
    # Load the pretrained ViT model
    pretrained_vit = torch.load(saved_model_path)
    pretrained_vit.eval()

    # Define transforms to ensure the image is properly formatted
    transform = transforms.Compose([
        transforms.Resize((224, 224)),  # Resize the image to match the model's input size
        transforms.ToTensor(),           # Convert the image to a PyTorch tensor
        transforms.Normalize(            # Normalize the image
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225]
        )
    ])

    # Preprocess the image
    image = image.convert("RGB")
    image = transform(image)

    # Define a function to predict with the ViT model
    def predict_fn(images):
        images = torch.tensor(images)
        images = images.permute(0, 3, 1, 2)
        with torch.no_grad():
            outputs = pretrained_vit(images)
        return outputs

    explainer = lime_image.LimeImageExplainer()

    explanation = explainer.explain_instance(image.permute(1, 2, 0).numpy(), predict_fn, top_labels=5, num_samples=1000)

    # Create Lime explanation image
    temp, mask = explanation.get_image_and_mask(explanation.top_labels[0], positive_only=True, num_features=5, hide_rest=False)
    image_boundry = mark_boundaries(temp / 2 + 0.5, mask)
    
    # Convert image to PIL Image
    lime_explanation_image = Image.fromarray((image_boundry * 255).astype(np.uint8))

    return lime_explanation_image
