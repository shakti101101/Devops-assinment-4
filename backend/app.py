from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

MONGO_URI = "mongodb+srv://shaktig101101_db_user:C1yoWqhkEj5muHcL@cluster0.sofmx8o.mongodb.net/"
  # Replace <db_password> with your actual password
db = client["todo_db"]
collection = db["items"]

@app.route("/submit_todo_item", methods=["POST"])
def submit_todo_item():
    item_name = request.form.get("itemName")
    item_description = request.form.get("itemDescription")
    todo_item = {"itemName": item_name, "itemDescription": item_description}
    collection.insert_one(todo_item)
    return jsonify({"message": "To-Do item added successfully!"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
