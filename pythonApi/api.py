from flask import Flask, request

app = Flask(__name__)

@app.post("/generate-message")
def generate_message():
    data = request.get_json()

    return data

if __name__ == '__main__':
    app.run() 

# flask --app api run --debug