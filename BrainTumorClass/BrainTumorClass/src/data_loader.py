import os
import cv2
import numpy as np

IMG_SIZE = 128

def load_data(dataset_path):

    categories = ['glioma', 'meningioma', 'no_tumor', 'pituitary']

    data = []
    labels = []

    for label, category in enumerate(categories):
        path = os.path.join(dataset_path, category)

        for img in os.listdir(path):
            img_path = os.path.join(path, img)
            image = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
            image = cv2.resize(image, (IMG_SIZE, IMG_SIZE))
            image = image / 255.0

            data.append(image)
            labels.append(label)

    data = np.array(data).reshape(-1, IMG_SIZE, IMG_SIZE, 1)
    labels = np.array(labels)

    return data, labels