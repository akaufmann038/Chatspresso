import requests
from bs4 import BeautifulSoup
from bs4 import element
from urllib.parse import urlencode


class SO_Scraper:
    def __init__(self):
        pass

    def scrape(self, user_id):
        proxy_params = {
            'api_key': '942b8d6c-e80e-41e1-bce4-8dbcfc05c4a5',
            'url': 'https://www.linkedin.com/in/' + user_id,
        }
        print(proxy_params)
        response = requests.get(
            url='https://proxy.scrapeops.io/v1/',
            params=urlencode(proxy_params),
            timeout=30,
        )
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, features="html.parser")
            data = self.get_data(soup)

            return data

        print(response.status_code)
        return

    def get_data(self, soup):
        data = {}

        full_name_c = soup.find_all(class_="top-card-layout__title")
        data["full_name"] = full_name_c[0].text.strip()

        bio_c = soup.find_all(class_="top-card-layout__headline")
        if len(bio_c) == 0:
            data["bio"] = None
        else:
            data["bio"] = bio_c[0].text.strip()

        data["location"] = soup.find_all(
            'div', {'class': 'top-card__subline-item'})[0].text

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

                        role_c = card.find_all(
                            class_="profile-section-card__title")
                        if len(role_c) == 0:
                            curr_experience["role"] = None
                        else:
                            curr_experience["role"] = role_c[0].text.strip()

                        company_c = card.find_all(
                            class_="profile-section-card__subtitle")
                        if len(company_c) == 0:
                            curr_experience["company"] = None
                        else:
                            curr_experience["company"] = company_c[0].text.strip(
                            )

                        date_c = card.find_all(class_="date-range")
                        if len(date_c) == 0:
                            curr_experience["duration"] = None
                            curr_experience["date_range"] = None
                        else:
                            date = date_c[0]
                            curr_experience["duration"] = date.find(
                                "span").text
                            curr_experience["date_range"] = date.text.replace(
                                date.find("span").text, "").strip()

                        location_c = card.find_all(
                            class_="experience-item__location")
                        location_c2 = card.find_all(
                            class_="experience-group-position__location")
                        if len(location_c) > 0:
                            curr_experience["location"] = location_c[0].text.strip(
                            )
                        elif len(location_c2) > 0:
                            curr_experience["location"] = location_c2[0].text.strip(
                            )
                        else:
                            curr_experience["location"] = None

                        description_c = card.find_all(
                            class_="experience-item__description")
                        if len(description_c) == 0:
                            curr_experience["description"] = None
                        else:
                            show_more_text = description_c[0].find_all(
                                class_="show-more-less-text__text--more")

                            if len(show_more_text) > 0:
                                curr_experience["description"] = show_more_text[0].text.replace(
                                    "Show less", "").strip()
                            else:
                                curr_experience["description"] = description_c[0].text.strip(
                                )

                        data["experience"].append(curr_experience)

                if section == "Education":
                    cards = child.find_all(class_="profile-section-card")

                    data["education"] = []

                    for card in cards:
                        curr_education = {}

                        name_c = card.find_all(
                            class_="profile-section-card__title-link")
                        if len(name_c) == 0:
                            curr_education["name"] = None
                        else:
                            curr_education["name"] = name_c[0].text.strip()

                        degree_c = card.find_all(
                            class_="profile-section-card__subtitle")
                        if len(degree_c) == 0:
                            curr_education["degree"] = None
                        else:
                            curr_education["degree"] = degree_c[0].text.strip()

                        date_range_c = card.find_all(class_="date-range")
                        if len(date_range_c) == 0:
                            curr_education["date_range"] = None
                        else:
                            curr_education["date_range"] = date_range_c[0].text.strip(
                            )

                        details_c = card.find_all(
                            class_="education__item--details")
                        if len(details_c) == 0:
                            curr_education["details"] = None
                        else:
                            curr_education["details"] = details_c[0].text.strip()

                        data["education"].append(curr_education)

        return data


'''
scraper = SO_Scraper()
res = scraper.scrape("sonija-ashkinezer-993206186")
print(res)
'''
