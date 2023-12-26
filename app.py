from flask import Flask, jsonify, render_template, request, send_file
import requests
from flask_cors import CORS
import base64


# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

@app.route("/") 
def home(): 
    notes = ['C','CSharp','D','DSharp','E','F','FSharp','G','GSharp','A','ASharp','B']
    variations = ['Major','Minor','Augmented','Diminished','Seventh','MajorSeventh','MinorSeventh','Sus2','Sus4','MinorMajorSeventh','DiminishedSeventh','MajorNinth','MinorNinth','AddNinth','AddEleventh','MinorSixth','MajorSixth']
    return render_template("index.html", title="Chord Generator", description="dummy txt", notes=notes, variations=variations) 

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)