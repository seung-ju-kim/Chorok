from flask import Flask
from controller.sick_ML import ml
app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
with app.app_context():
    app.register_blueprint(ml)
if __name__ == '__main__':
    app.run( port='8000', debug=True) #host를 쓰면 local 서버열림