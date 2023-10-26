# Chatspresso

Chatspresso is a SaaS startup idea I had. The idea was to develop a chrome extension that runs on your LinkedIn. When you navigate to another user's profile, the extension reads that user's profile, and generates a hyper-personalized outreach message
using generative AI.

The pythonAPI directory has the python api that does the scraping of the LinkedIn profiles. The biggest challenge with this project was creating a way to consistently scrape linkedin. Doing get requests to a public user profile over and over again 
results in your requests eventually getting auth-walled (LinkedIn makes you login before seeing the profile). If I could go back and change this now, I would have the requests occur using the cookies in the LinkedIn browser, as this would not hit an authwall and would only result in account restriction if done at an extremely high volume.
