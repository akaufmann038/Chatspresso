# Chatspresso

Chatspresso is a SaaS startup idea I had. The idea was to develop a chrome extension that runs on your LinkedIn. When you navigate to another user's profile, the extension reads that user's profile, and generates a hyper-personalized outreach message
using generative AI.

The pythonAPI directory has the python api that does the scraping of the LinkedIn profiles. The biggest challenge with this project was creating a way to consistently scrape linkedin. Doing get requests to a public user profile over and over again 
results in your requests eventually getting auth-walled (LinkedIn makes you login before seeing the profile). If I could go back and change this now, I would have the requests occur using the cookies in the LinkedIn browser, as this would not hit an authwall and would only result in account restriction if done at an extremely high volume.

Another big challenge I ran into was allowing my Flask server (which handles the web scraping) to handle concurrent requests. I accomplished this by distributing web scraping tasks across a queue of available web drivers.
[Here](https://github.com/akaufmann038/Chatspresso/blob/main/pythonApi/scraper.py) is where I implemented the web scraper and queue.

The pythonAPI directory has all of the backend code used for the extension.
