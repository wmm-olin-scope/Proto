import flask, flask.views
import streaming as streaming
import os
from flask import session

app = flask.Flask(__name__)
app.secret_key = "SCOPE"

class View(flask.views.MethodView):

	def get(self):
		print "here"
		flask.flash(streaming.stream())
		return flask.render_template('index.html')

	def post(self):
		flask.flash(streaming.stream())
		return flask.render_template('index.html')
        

app.add_url_rule('/', view_func=View.as_view('main'), methods=['GET', 'POST'])

if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)