from flask import request, jsonify, send_from_directory, session
from config import app,db
from model import Logins
from werkzeug.security import check_password_hash,generate_password_hash
import os

@app.route('/home')
def home():
    return jsonify({"message": "Welcome to the Home Page!"})

@app.route('/record', methods=["GET"])
def get_record():
    record = Logins.query.all()
    return jsonify({"records": [record.to_json() for record in record]})
    # json_record = list(map(lambda x: x.to_json(), record))
    # return jsonify({"record": json_record})



@app.route('/register' , methods = ['POST'])
def register():

    data = request.json

    username = data.get('userName')
    password = data.get('password')
    email = data.get('email')

    if not username or not password or not email:
        return ( jsonify({"message": "enter all details"}), 400)
    
    password_hash = generate_password_hash(password)
    reg = Logins (user_name = username, password = password_hash, email = email)

    
    try:
        db.session.add(reg)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "user created"}),201



@app.route('/login', methods = ["POST"])
def login():
    data = request.json
    
    username = data.get('userName')
    password = data.get('password')

    log = Logins.query.filter_by(user_name =  username).first()

    if not log:
        return jsonify({"message": "No user found"}), 404
    
    
    if not check_password_hash(log.password, password):
        return jsonify({"message": "Invalid username or password"}), 401
    
    return jsonify({"message": "Login successful", "user": {"userName": log.user_name, "email": log.email, "id": log.id}}), 200



@app.route('/delete/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    # Find the user by id
    user_to_delete = db.session.get(Logins, user_id)
    # Logins.query.get(user_id)

    if user_to_delete is None:
        return jsonify({"message": "User not found"}), 404
    
    # Delete the user
    db.session.delete(user_to_delete)
    db.session.commit()
    
    return jsonify({"message": "User deleted successfully"}), 200

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(app.static_folder, 'favicon.ico')


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    # app.run(debug=True)
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)