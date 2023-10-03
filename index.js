const puppeteer = require("puppeteer");
const fs = require("fs");
const { log } = require("console");

async function run() {
  //this function launches the brower. It essential launches the browser so we can fire up events and do all DOM like actions like access different pages
  const browser = await puppeteer.launch({ headless: "new" });

  //to access a page we're gonna init a page variable
  const page = await browser.newPage();
  await page.goto("https://traversymedia.com");

  //to create a screenshot
  //   await page.screenshot({ path: "example.png", fullPage: true });

  //   await page.pdf({ path: "example.pdf", format: "A4" });

  //Get the entire Html page
  //   const html = await page.content();

  //Target specific parts of the web page for instance title
  //   const title = await page.evaluate(() => document.title);

  //   const text = await page.evaluate(() => document.body.innerText);

  //   const links = await page.evaluate(() =>
  //     Array.from(document.querySelectorAll("a"), (e) => e.href)
  //   );

  //   const h3s = await page.evaluate(() =>
  //     Array.from(document.querySelectorAll("h3"), (e) => e.innerText)
  //   );

  //   const courses = await page.evaluate(() => {
  //     return Array.from(
  //       document.querySelectorAll("#cscourses .cscourse-grid .card"),
  //       (e) => ({
  //         title: e.querySelector(".card-body h3").innerText,
  //         level: e.querySelector(".card-body .level").innerText,
  //         url: e.querySelector(".card-footer a").href,
  //       })
  //     );
  //   });

  const courses = await page.$$eval(
    "#cscourses .cscourse-grid .card",
    (elements) =>
      elements.map((e) => ({
        title: e.querySelector(".card-body h3").innerText,
        level: e.querySelector(".card-body .level").innerText,
        url: e.querySelector(".card-footer a").href,
      }))
  );

  console.log(courses);

  //Save data to a json file
  fs.writeFile("courses.json", JSON.stringify(courses), (err) => {
    if (err) throw err;
    console.log("File saved");
  });
  await browser.close(); //always remember to close the brower
}

run();
