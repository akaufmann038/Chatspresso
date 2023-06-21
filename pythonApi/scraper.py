from bs4 import BeautifulSoup
from bs4 import element
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait

class LinkedIn_Scraper:
    def __init__(self):
        self.driver = None

    # create the selenium headless driver
    def create_driver(self):
        chrome_options = ChromeOptions()
        chrome_options.add_argument("--headless=new")
        driver = webdriver.Chrome(options=chrome_options)

        self.driver = driver

    def webpage_ready(driver):
        res1 = driver.find_element(By.CLASS_NAME,"core-section-container__content")
        res2 = driver.find_element(By.CLASS_NAME,"top-card-layout__title")
        res3 = driver.find_element(By.CLASS_NAME, "top-card-layout__headline")
        res4 = driver.find_element(By.CLASS_NAME, "top-card__subline-item")
        res5 = driver.find_element(By.CLASS_NAME, "profile")

        return res1 and res2 and res3 and res4 and res5

    # given a user_id, scrapes that user's linkedin profile
    # user_id has to be the id in the linkedin url
    def scrape_profile(self, user_id):
        url = "https://www.linkedin.com/in/{}".format(user_id)
        self.driver.get(url)

        # wait for webpage
        objects = WebDriverWait(self.driver, timeout=5).until(self.webpage_ready)

        src = self.driver.page_source
        soup = BeautifulSoup(src)

        data = self.get_data(soup)

        return data

    def get_data(self, soup):
        data = {}
    
        data["full_name"] = soup.find_all(class_="top-card-layout__title")[0].text.strip()
        
        data["bio"] = soup.find_all(class_="top-card-layout__headline")[0].text.strip()
        
        data["location"] = soup.find_all('div', {'class': 'top-card__subline-item'})[0].text

        container = soup.find_all(class_="profile")[0]

        for child in container.children:
            if type(child) == element.Tag:
                section = child.find("h2").text.strip()

                if section == "About":
                    about_c = child.find_all("p")
                    if len(about_c) == 0:
                        data["about"] = None
                    else:
                        data["about"] = about_c[0].text.strip()
                if section == "Experience":
                    cards = child.find_all(class_="profile-section-card")

                    data["experience"] = []

                    for card in cards:
                        curr_experience = {}

                        role_c = card.find_all(class_="profile-section-card__title")
                        if len(role_c) == 0:
                            curr_experience["role"] = None
                        else:
                            curr_experience["role"] = role_c[0].text.strip()

                        company_c = card.find_all(class_="profile-section-card__subtitle")
                        if len(company_c) == 0:
                            curr_experience["company"] = None
                        else:
                            curr_experience["company"] = company_c[0].text.strip()

                        date_c = card.find_all(class_="date-range")
                        if len(date_c) == 0:
                            curr_experience["duration"] = None
                            curr_experience["date_range"] = None
                        else:
                            date = date_c[0]
                            curr_experience["duration"] = date.find("span").text
                            curr_experience["date_range"] = date.text.replace(date.find("span").text, "").strip()

                        location_c = card.find_all(class_="experience-item__location")
                        location_c2 = card.find_all(class_="experience-group-position__location")
                        if len(location_c) > 0:
                            curr_experience["location"] = location_c[0].text.strip()
                        elif len(location_c2) > 0:
                            curr_experience["location"] = location_c2[0].text.strip()
                        else:
                            curr_experience["location"] = None

                        description_c = card.find_all(class_="experience-item__description")
                        if len(description_c) == 0:
                            curr_experience["description"] = None
                        else:
                            show_more_text = description_c[0].find_all(class_="show-more-less-text__text--more")
                            
                            if len(show_more_text) > 0:
                                curr_experience["description"] = show_more_text[0].text.replace("Show less", "").strip()
                            else:
                                curr_experience["description"] = description_c[0].text.strip()

                        data["experience"].append(curr_experience)

                if section == "Education":
                    cards = child.find_all(class_="profile-section-card")

                    data["education"] = []

                    for card in cards:
                        curr_education = {}

                        name_c = card.find_all(class_="profile-section-card__title-link")
                        if len(name_c) == 0:
                            curr_education["name"] = None
                        else:
                            curr_education["name"] = name_c[0].text.strip()
                            
                        degree_c = card.find_all(class_="profile-section-card__subtitle")
                        if len(degree_c) == 0:
                            curr_education["degree"] = None
                        else:
                            curr_education["degree"] = degree_c[0].text.strip()
                            
                        date_range_c = card.find_all(class_="date-range")
                        if len(date_range_c) == 0:
                            curr_education["date_range"] = None
                        else:
                            curr_education["date_range"] = date_range_c[0].text.strip()
                            
                        details_c = card.find_all(class_="education__item--details")
                        if len(details_c) == 0:
                            curr_education["details"] = None
                        else:
                            curr_education["details"] = details_c[0].text.strip()
                            
                        data["education"].append(curr_education)
                        
        return data