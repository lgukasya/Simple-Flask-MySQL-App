from flask import Flask
from os.path import join, dirname
from dotenv import load_dotenv
from flask_mysqldb import MySQL

# load environment variables
dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

# load flask
app = Flask(__name__)

# mysql connection
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'alumne'
app.config['MYSQL_PASSWORD'] = 'mysqlalumne'
app.config['MYSQL_DB'] = 'municipis'
mysql = MySQL(app)

# routes
import routes

# run server
if __name__ == '__main__':
    app.run()
    
    
    
    
    
    
