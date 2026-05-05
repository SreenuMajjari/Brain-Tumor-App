import os
import tensorflow as tf
from tensorflow.keras.models import Model, load_model

model_path = r"c:\Users\sushe\OneDrive\sreenu project\BrainTumorClass\BrainTumorClass\models\advanced_autoencoder.keras"
print("Loading full model...")
autoencoder = load_model(model_path)
encoder = Model(inputs=autoencoder.input, outputs=autoencoder.get_layer("bottleneck").output)

out_path = r"c:\Users\sushe\OneDrive\sreenu project\BrainTumorClass\BrainTumorClass\models\encoder_only.keras"
print("Saving encoder...")
encoder.save(out_path)
print("Done!")
