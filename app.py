from flask import Flask, request, make_response
from transformers import pipeline

import response_body
from get_result import load_model, predict_senti, load_base_language_mode
from flask_cors import CORS

app = Flask(__name__)


@app.route('/api/language-detection', methods=['POST'])
def language_detection():
    tweet_text = request.json.get('tweet_text')
    print(tweet_text)
    if tweet_text is None:
        return make_response("can't find text", 400)
    # [{"label":"zh","score":0.9791792631149292}]
    global base_language_pipeline
    result = base_language_pipeline(tweet_text)[0]
    response = response_body.BaseLanguage(result, tweet_text)

    return response.to_json()


@app.route('/api/sentiment-score', methods=['POST'])
def sentiment_score():
    tweet_text = request.json.get('tweet_text')
    if tweet_text is None:
        return make_response("can't find text", 400)

    global tokenizers, model
    result = predict_senti(tokenizers, model, tweet_text)

    response = response_body.ResponseBody(result, tweet_text)
    return response.to_json()


if __name__ == '__main__':
    base_language_pipeline = pipeline("text-classification", model="papluca/xlm-roberta-base-language-detection")
    tokenizers, model = load_model('./model/token', './model/weight')
    CORS(app)
    app.run(host='0.0.0.0', port=5000, ssl_context=('cert.pem', 'key.pem'))
