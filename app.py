import flask
from flask import request, jsonify
from vectors import words, closest_word

app = flask.Flask(__name__)

@app.route('/', methods=['POST'])
def home():
    
    return jsonify(
            {
                "result": closest_word(words[request.json['root']] - words[request.json['subtract']] + words[request.json['add']])
            }
        )

app.run()