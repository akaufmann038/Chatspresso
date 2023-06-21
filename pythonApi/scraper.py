from bs4 import BeautifulSoup
from bs4 import element
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

class LinkedIn_Scraper:
    def __init__(self):
        self.driver = None

    # create the selenium headless driver
    def create_driver(self):
        chrome_options = ChromeOptions()
        #chrome_options.add_argument("--headless=new")
        chrome_options.add_argument("--incognito")
        driver = webdriver.Chrome(options=chrome_options)

        self.driver = driver

    def wait_until(self, driver, class_name):
        # if browser hits authwall, we want to quit driver and open up new one
        if "https://www.linkedin.com/authwall" in driver.current_url:
            return True
        
        return driver.find_element(By.CLASS_NAME, class_name)

    # given a user_id, scrapes that user's linkedin profile
    # user_id has to be the id in the linkedin url
    def scrape_profile(self, user_id):
        url = "https://www.linkedin.com/in/{}/".format(user_id)
        self.driver.get(url)

        # wait for webpage
        wait = WebDriverWait(self.driver, timeout=10)
        wait.until(lambda driver: self.wait_until(driver, "core-section-container__content"))
        wait.until(lambda driver: self.wait_until(driver, "top-card-layout__title"))
        wait.until(lambda driver: self.wait_until(driver, "top-card__subline-item"))
        wait.until(lambda driver: self.wait_until(driver, "profile"))

        if "https://www.linkedin.com/authwall" in self.driver.current_url:
            # quit current driver, create new driver, navigate to new url
            self.driver.quit()
            self.create_driver()
            return self.scrape_profile(user_id)

        #object = WebDriverWait(self.driver, timeout=10).until(EC.presence_of_element_located((By.XPATH, "//meta[@name='description']")))
        #time.sleep(3)

        print("url: " + self.driver.current_url)
        src = self.driver.page_source
        soup = BeautifulSoup(src, features="html.parser")

        data = self.get_data(soup)

        return data

    def get_data(self, soup):
        data = {}
    
        full_name_c = soup.find_all(class_="top-card-layout__title")
        data["full_name"] = full_name_c[0].text.strip()
        
        bio_c = soup.find_all(class_="top-card-layout__headline")
        if len(bio_c) == 0:
            data["bio"] = None
        else:
            data["bio"] = bio_c[0].text.strip()
        
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