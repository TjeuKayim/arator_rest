import logging
import os

import azure.functions as func
from fastai.vision import *
import requests
import base64


def main(req: func.HttpRequest) -> func.HttpResponse:
    path = Path.cwd()
    learn = load_learner(path)

    r = base64.b64decode(req.get_body())

    temp_image_name = "temp.jpg"
    with open(temp_image_name, 'wb') as f:
        f.write(r)

    img = open_image(temp_image_name)
    pred_class, pred_idx, outputs = learn.predict(img)

    return func.HttpResponse(f"{pred_class}")
