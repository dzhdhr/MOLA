from transformers import AutoTokenizer, pipeline
from transformers import AutoModelForSequenceClassification
from scipy.special import softmax


def load_model(token_path, model_path):
    tokenizer = AutoTokenizer.from_pretrained(token_path)
    model = AutoModelForSequenceClassification.from_pretrained(model_path)
    return tokenizer, model


def predict_senti(tokenizer, model, text):
    encoded_text = tokenizer(text, return_tensors='pt')
    output = model(**encoded_text)
    result = output[0][0].detach().numpy()
    scores = softmax(result)
    return scores.tolist()


def load_base_language_mode():
    print("here")
    return pipeline("text-classification", model="papluca/xlm-roberta-base-language-detection")
