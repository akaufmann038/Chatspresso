from flask import Flask, request
from scraper import LinkedIn_Scraper
import uuid

app = Flask(__name__)

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

    return scraped_data

if __name__ == '__main__':
    app.run() 

# flask --app api run --debug

# either asked to login or security check
# https://www.linkedin.com/authwall
