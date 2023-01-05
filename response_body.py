class BaseLanguage():
    def __init__(self, predict_result, text):
        self.result = predict_result['label'] == 'en'
        self.text = text

    def to_json(self):
        return {
            "tweet_text": self.text,
            "is_english": self.result

        }


class ResponseBody():
    map = ['NEGTIVE', 'NEUTRAL', 'POSITIVE']

    def __init__(self, result, text):
        self.result = result
        self.text = text
        self.detect_result = result.index(max(result))

    # neg netr positive
    # [0.001751981908455491, 0.006068220362067223, 0.9921797513961792]
    def to_json(self):
        return {
            "tweet_text": self.text,
            "sentiment_score": {
                "positive": self.result[2],
                "neutral": self.result[1],
                "negative": self.result[0],
            },
            "detected_mood": self.map[self.detect_result]
        }
