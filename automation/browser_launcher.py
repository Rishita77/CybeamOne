import sys
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

# Get URL from command-line argument
if len(sys.argv) != 2:
    print("Usage: python browser_launcher.py <url>")
    sys.exit(1)

url_to_open = sys.argv[1]

options = Options()
options.add_experimental_option("detach", True)

CHROMEDRIVER_PATH = "C:\\Users\\rishi\\CybeamOne\\automation\\chromedriver.exe"  # Full path required

driver = webdriver.Chrome(service=Service(CHROMEDRIVER_PATH), options=options)
driver.get(url_to_open)
