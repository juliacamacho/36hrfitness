#!/usr/bin/env python
import os

from flask import Flask, request, jsonify, render_template


# Configure Flask + Redis
app = Flask(__name__)

scores = {
    "Kevin" : 3435,
    "Brandon" : 5682,
    "Nihar" : 4531,
    "Julia" : 5746
 }

# Index Route
@app.route('/')
def root():
    return "ABCED"

# Route to fetch similar clubs
# Takes a post request containing the requested clubid.
# Returns a json containing similar clubs.
@app.route("/scores", methods=['POST'])
def find_clubs():
    name = request.args.get("name")
    value = request.args.get("value")
    scores[name] = value
    return jsonify(scores)


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8005, debug=True)
