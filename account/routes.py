from flask import request, jsonify
from flask_jwt_extended import jwt_required

from hypoU.account.services import register_user, login_user, logout_user, check_if_token_in_blacklist
from hypoU import app

@app.route('/register', methods=['POST'])
def register():
    return register_user()

@app.route('/login', methods=['POST'])
def login():
    return login_user()

@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    return logout_user()

@jwt.token_in_blocklist_loader
def check_if_token_in_blacklist(jwt_header, jwt_payload):
    return check_if_token_in_blacklist(jwt_header, jwt_payload)