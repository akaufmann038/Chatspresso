from flask import Flask, request
from scraper import LinkedIn_Scraper

app = Flask(__name__)

l_scraper = LinkedIn_Scraper()

@app.get("/")
def create_driver():
    l_scraper.create_driver()

    return "Done"

@app.post("/generate-message")
def generate_message():
    data = request.get_json()
    user_id = data["user_id"]
        
    scraped_data = l_scraper.scrape_profile(user_id)
    print(scraped_data)

    return data

if __name__ == '__main__':
    app.run() 

# flask --app api run --debug

# either asked to login or security check
# https://www.linkedin.com/authwall
