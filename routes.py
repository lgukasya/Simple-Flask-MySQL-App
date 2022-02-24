from app import app, mysql
from flask import render_template, request, jsonify
from time import sleep

# routes
@app.route('/', methods=['GET'])    
def home():
    print(request.url)
    return render_template("index.html")

@app.route('/app/', methods=['GET'])
@app.route('/app/<string:c>')
@app.route('/app/<string:c>/<string:p>')
async def api(c=None, p=None):
    sleep(1)
    
    cursor = mysql.connection.cursor()  

    if not bool(c):  
        cursor.execute("SELECT comunitat FROM comunitats")
        data = cursor.fetchall()
        cursor.close
        return jsonify(data)
    
    cursor.execute("""
    SELECT provincia FROM provincies AS p WHERE p.id_com IN 
    (SELECT id_com FROM comunitats AS c WHERE c.comunitat = %s)
    """, [c])
    
    data = cursor.fetchall()
    
    if not bool(p): 
        cursor.close()
        return jsonify(data)
        
    cursor.execute("""
    SELECT municipi from municipis AS m WHERE m.id_prov
    IN (SELECT p.id_prov FROM provincies AS p WHERE p.provincia = %s)
    """, [p])
    
    data = cursor.fetchall()
    cursor.close()
        
    return jsonify(data)