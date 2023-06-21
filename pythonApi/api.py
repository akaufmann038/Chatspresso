from flask import Flask, request
from scraper import LinkedIn_Scraper
import uuid
from dotenv import load_dotenv
import openai
import os

app = Flask(__name__)

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

l_scraper = LinkedIn_Scraper()

@app.get("/")
def create_driver():
    l_scraper.init()

    return "Done"

@app.post("/generate-message")
def generate_message():
    print(request)
    data = request.get_json()
    user_id = data["user_id"]
        
    request_id = uuid.uuid4()
    scraped_data = l_scraper.scrape_profile(user_id, request_id)


    messages = [{"role": "system", "content": "The user will provide you text within triple quotes. \
                 This text is a json object that represents a linkedin profile of person_X. Write a message \
                 to person_X based on their linkedin profile with the intent of booking a short networking \
                 call with them."}, {"role": "user", "content": '"""{}"""'.format(str(scraped_data))}]

    chat_completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=messages)

    return {"message": chat_completion["choices"][0]["message"]["content"]}

if __name__ == '__main__':
    app.run() 

# flask --app api run --debug

# either asked to login or security check
# https://www.linkedin.com/authwall