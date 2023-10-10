// terminal -> npm start

console.log("Begin!");

const puppeteer = require("puppeteer");

// stealth stuff
const puppeteerExtra = require("puppeteer-extra");
const Stealth = require("puppeteer-extra-plugin-stealth");
puppeteerExtra.use(Stealth());

async function run() {
  // Launch the browser and open a new blank page
  const browserObj = await puppeteerExtra.launch();
  const page = await browserObj.newPage();

  // Set screen size
  await page.setViewport({ width: 887, height: 907 }); // (prime numbers)
  // Set user agent
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
  );
  // Set Geolocation
  await page.setGeolocation({latitude: 49.523065, longitude: 5.938147});

  // accept all cookies
  await page.setExtraHTTPHeaders({
    'Cookie': 'accept',
  });

  // Navitate to an amazon product page
  await page.goto(
    "https://www.amazon.de/Denon-AVR-X2800H-7-2-Kanal-AV-Receiver-Verst%C3%A4rker-Schwarz/dp/B0BDZWGXJ7/"
  );
  await page.waitForTimeout(251); // Wait for 251ms (prime number)

  // Capture screenshot bypassed captcha and cookie
  await page.screenshot({
    path: "screenshotBypassEverything.jpg",
  });

  //await page.waitForTimeout(251); // Wait for 251ms (prime number)

  // Capture screenshot accepted cookies
//   await page.screenshot({
//     path: "screenshotBypassB.jpg",
//   });

  // Evaluate the page for product's price to be below a specific value
  await page.waitForSelector(".a-offscreen");
  const currentPrice = await page.evaluate(() => {
    const priceValue = document.querySelector(".a-offscreen");
    console.log(priceValue.innerText);
    return +priceValue.innerText;
  });
  if (currentPrice >= 650) {
    console.log("too expensive");
  } else if (currentPrice <= 600) {
    console.log("CHEAP!");
    // notification
    //notifier.notify("Buy it now!");
  } else if (currentPrice < 650) {
    console.log("average price");
  } else {
    console.log("Error");
    // notification
    //notifier.notify("Something broke!");
  }
  // Close browser
  await browserObj.close();
}
run();
