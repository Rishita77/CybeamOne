from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import sys
import time

options = Options()
options.add_experimental_option("detach", True)  # Keeps the browser open
CHROMEDRIVER_PATH = "C:\\Users\\rishi\\CybeamOne\\automation\\chromedriver.exe"


URL = sys.argv[1] if len(sys.argv) > 1 else "https://google.com"
driver = webdriver.Chrome(service=Service(CHROMEDRIVER_PATH), options=options)


driver.get(URL)
time.sleep(2)  

inject_script = """
(function() {
    const socket = new WebSocket("ws://localhost:3000");

    socket.addEventListener('open', () => {
        function sendEvent(type, data) {
            const payload = {
                type,
                data,
                timestamp: new Date().toISOString()
            };
            socket.send(JSON.stringify(payload));
        }

        document.addEventListener("click", (e) => {
            sendEvent("click", {
                tag: e.target.tagName,
                id: e.target.id,
                classes: e.target.className,
                text: e.target.innerText
            });
        });

        document.addEventListener("input", (e) => {
            sendEvent("input", {
                tag: e.target.tagName,
                id: e.target.id,
                value: e.target.value
            });
        });

        document.addEventListener("keydown", (e) => {
            sendEvent("keydown", {
                key: e.key,
                code: e.code
            });
        });

        document.addEventListener("scroll", () => {
            sendEvent("scroll", {
                scrollY: window.scrollY
            });
        });

        const origFetch = window.fetch;
        window.fetch = function() {
            sendEvent("fetch", { url: arguments[0] });
            return origFetch.apply(this, arguments);
        };

        const origOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function(method, url) {
            sendEvent("xhr", { method, url });
            return origOpen.apply(this, arguments);
        };
    });

    socket.addEventListener('error', (err) => {
        console.error("WebSocket error:", err);
    });
})();
"""

# Inject the script
driver.execute_script(inject_script)
print("Script injected. Listening for events...")
