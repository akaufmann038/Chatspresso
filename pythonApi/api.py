from flask import Flask, request
from scrape_ops import SO_Scraper
import uuid
from dotenv import load_dotenv
import openai
import os
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

scraper = SO_Scraper()


@app.post("/generate-message")
def generate_message():
    print("hitting")
    data = request.get_json()
    user_id = data["user_id"]
    print(user_id)

    scraped_data = scraper.scrape(user_id)
    # scraped_data = None

    if not scraped_data:
        return {"success": False}

    messages = [{"role": "system", "content": "The user will provide you text within triple quotes. \
                 This text is a json object that represents a linkedin profile of person_X. Write a message \
                 to person_X based on their linkedin profile with the intent of booking a short networking \
                 call with them. Make all your responses not longer than 200 words."}, {"role": "user", "content": '"""{}"""'.format(str(scraped_data))}]

    chat_completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=messages)

    return {"success": True, "message": chat_completion["choices"][0]["message"]["content"]}


if __name__ == '__main__':
    app.run()

# flask --app api run --debug

'''
user-agent header
referrer header
'''
