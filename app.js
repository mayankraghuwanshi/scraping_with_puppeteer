const puppeteer = require('puppeteer');
const conf = require('./conf');


const USERNAME_SELECTOR = "#container > div > div.uMF2cc > div > div.Km0IJL.col.col-3-5 > div > form > div:nth-child(1) > input";
const PASSAWORD_SELECTOR = "#container > div > div.uMF2cc > div > div.Km0IJL.col.col-3-5 > div > form > div:nth-child(2) > input";
const LOGIN_BUTTON_SELECTOR = "#container > div > div.uMF2cc > div > div.Km0IJL.col.col-3-5 > div > form > div._1avdGP > button";
const LOCATION_PIN_SELECTOR = '#pincodeInputId';
const LOCATION_PIN_CHECK_BUTTON_SELECTOR = "#container > div > div.t-0M7P._3GgMx1._2doH3V > div._3e7xtJ > div._1HmYoV.hCUpcT > div._1HmYoV._35HD7C.col-8-12 > div:nth-child(6) > div > div > div._20aOSn > div.xVBsIm > div > div._2my7m5 > div > span > div > div > button";
const RESULT_SELECTOR = "#container > div > div.t-0M7P._3GgMx1._2doH3V > div._3e7xtJ > div._1HmYoV.hCUpcT > div._1HmYoV._35HD7C.col-8-12 > div:nth-child(6) > div > div > div._3l12t9 > div";






const fetch = async ( url )=>{
    const browser = await puppeteer.launch({
        headless :false,
        slowMo : 5,
        defaultViewport: null
    });
    const page = await browser.newPage();
    await page.goto('https://www.flipkart.com/login');
    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(conf.username);
    await page.click(PASSAWORD_SELECTOR);
    await page.keyboard.type(conf.password);
    await page.click(LOGIN_BUTTON_SELECTOR);
    await page.waitForNavigation();
    await page.goto(url);
    
    await page.waitForSelector(LOCATION_PIN_SELECTOR);
    await page.evaluate(() => {
        const ele = document.querySelector("#pincodeInputId");
        ele.value = 110086;
        }
    );
    await page.click(LOCATION_PIN_CHECK_BUTTON_SELECTOR);
    await page.waitForSelector(RESULT_SELECTOR);
    const textContent = await page.evaluate(() => document.querySelector("#container > div > div.t-0M7P._3GgMx1._2doH3V > div._3e7xtJ > div._1HmYoV.hCUpcT > div._1HmYoV._35HD7C.col-8-12 > div:nth-child(6) > div > div > div._3l12t9 > div").innerText);
    console.log(textContent === "Currently out of stock in this area." ? textContent : "Available \n"+textContent);
        


    browser.close();
}

fetch("https://www.flipkart.com/realme-xt-pearl-white-64-gb/p/itm731360fdbd273?pid=MOBFJYBEMRXDQXH4&lid=LSTMOBFJYBEMRXDQXH4IFPPLV&marketplace=FLIPKART&fm=productRecommendation%2Fsimilar&iid=R%3As%3Bp%3AMOBFMXTSHFVBU7UD%3Bpt%3App%3Buid%3Aad11ad5f-cbc7-f8f3-9fa2-f9613db653b6%3B.MOBFJYBEMRXDQXH4.LSTMOBFJYBEMRXDQXH4IFPPLV&ppt=pp&ppn=pp&ssid=cw4mr62o340000001590380990785&otracker=pp_reco_Similar%2BProducts_3_31.productCard.PMU_HORIZONTAL_Similar%2BProducts_MOBFJYBEMRXDQXH4.LSTMOBFJYBEMRXDQXH4IFPPLV_productRecommendation%2Fsimilar_2&otracker1=pp_reco_PINNED_productRecommendation%2Fsimilar_Similar%2BProducts_GRID_productCard_cc_3_NA_view-all&cid=MOBFJYBEMRXDQXH4.LSTMOBFJYBEMRXDQXH4IFPPLV");
