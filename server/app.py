import flask
from flask import request, jsonify
from flask_cors import CORS, cross_origin
from vectors import words, closest_word
import os

app = flask.Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)

@app.route('/', methods=['GET', 'POST'])
@cross_origin()
def home():
    if request.method == 'POST':
        return jsonify(
                {
                    "result": closest_word(words[request.json['root']] - words[request.json['subtract']] + words[request.json['add']])
                }
            )
    return "WORD CALCULATOR"

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)