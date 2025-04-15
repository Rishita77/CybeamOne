import sys
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

if len(sys.argv) < 2:
    print("Missing URL")
    sys.exit(1)

url = sys.argv[1]

options = Options()
options.add_experimental_option("detach", True)  # Keeps browser open
options.add_argument('--disable-blink-features=AutomationControlled')

driver = webdriver.Chrome(service=Service('./chromedriver.exe'), options=options)
driver.get(url)

print(f"Launched {url}")
