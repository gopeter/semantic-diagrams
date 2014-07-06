# semantic-diagrams

Little web app that let users interact with interactive diagrams in SVG. Semantic data is included as RDF/XML and RDFa.

[Live demo on Heroku](http://semantic-diagrams.herokuapp.com) (runs with 1 dyno so first start could take a while)

**No database, no unnecessary or redundant files, just one .svg.**

## Installation

1. Clone this repository: `git clone git@github.com:gopeter/semantic-diagrams.git`
2. Create virtual env: `virtualenv venv`
3. Activate virtual env: `source venv/bin/activate` (do this for every new terminal session)
4. Install requirements: `pip install -r requirements.txt`
5. Start app: `foreman start`
6. Visit `http://localhost:5000` and have fun!

Be aware: Just a proof of concept. No validations, no exception handling, no tests.