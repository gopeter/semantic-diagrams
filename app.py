import os
import json
from rdflib import Graph
from flask import Flask, jsonify, render_template, request

################################################################################
# Init
################################################################################

app = Flask(__name__)

################################################################################
# Extract triples from SVG
################################################################################

@app.route('/parse', methods = ['POST'])
def parseData():

  # store post data
  p_svg = request.form['svg']

  # save svg as file
  f = open('tmp.svg','w')
  f.write(p_svg) # python will convert \n to os.linesep
  f.close()

  g = Graph()
  
  g.parse('tmp.svg', format = 'rdfa')
  
  triples = []
  for s,p,o in g:
    triples.append([s,p,o])
  
  return json.dumps(triples)


################################################################################
# Serve index file
################################################################################

@app.route('/', methods = ['GET'])
def index():
  return render_template('index.html')
  
################################################################################
# Start app
################################################################################
 
if __name__ == '__main__':
  app.run(debug=True)