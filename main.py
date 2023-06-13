from flask import Flask, render_template, request, redirect

from data import backgroundData

# create the app
app = Flask(__name__)
        
indexOfActiveBackgroundImage = 0;


@app.route("/", methods=["GET", "POST"])
def home():
            
    return render_template("base.html", imageURL = backgroundData[indexOfActiveBackgroundImage]['fileLocation'], 
                           )
    
# we only run the app if this file is run, the app should not run if this file is imported by another file
if __name__ == '__main__':
    # setting debug as True will trigger auto reruns of the server when the code changes, to remove in production
    app.run(port=8000, debug=True)
