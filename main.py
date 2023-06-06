from flask import Flask

# create the app
app = Flask(__name__)
        
# we only run the app if this file is run, the app should not run if this file is imported by another file
if __name__ == '__main__':
    # setting debug as True will trigger auto reruns of the server when the code changes, to remove in production
    app.run(debug=True)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"