from tensorflow.keras.models import Model

def extract_features(encoder, X):
    # We now pass the pre-extracted encoder directly!
    features = encoder.predict(X)
    return features