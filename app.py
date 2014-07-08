import os
import json
from rdflib import Graph
from flask import Flask, jsonify, render_template, request

################################################################################
# Init
################################################################################

app = Flask(__name__)

################################################################################
# Store SVG temporary
################################################################################

@app.route('/parse', methods = ['POST'])
def parseData():

  # store post data
  p_svg = request.form['svg']

  # save svg as file
  f = open('tmp.svg','w')
  f.write(p_svg) # python will convert \n to os.linesep
  f.close()
  
  return 'parsed'

################################################################################
# Query SVG
################################################################################

@app.route('/query', methods = ['POST'])
def queryData():

  # store post data
  p_query = request.form['query']

  g = Graph()
  g.parse('tmp.svg', format = 'rdfa')
  
  rows = g.query(p_query)
  return rows.serialize(format = "json")

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
  app.run()