import flask
from flask import request, jsonify
from vectors import words, closest_word
import os

app = flask.Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
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