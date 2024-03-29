import { IGmailSignup } from '../../types/account';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from'puppeteer-extra-plugin-stealth';
import { setTimeout } from 'timers/promises';
const proxyUrl = 'http://scraperapi:e3ae0f61765502563a95687b59f9a7a4@proxy-server.scraperapi.com:8001';



puppeteer.use(StealthPlugin());
export class Account {
  async create (params: IGmailSignup) {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      defaultViewport: null,
      args: [ `--proxy-server=${proxyUrl}`] 
    });
   
    try {
      const page = await browser.newPage();
      await page.setUserAgent('Rezaul Karim');

      await page.goto('https://accounts.google.com/');

      const element = await page.waitForSelector('div ::-p-text(Create account)');  
      await element?.click(); 
      
      // const element2 = await page.waitForSelector('div ::-p-text(For my personal use)');  
      // await element2?.click();   
      
      const firstName = await page.waitForSelector('#firstName');
      await firstName?.type(params.firstName);
      const lastName = await page.waitForSelector('#lastName');
      await lastName?.type(params.lastName);

      const nextBtn = await page.waitForSelector('div ::-p-text(Next)');  
      await nextBtn?.click();

      await page.waitForSelector('#month');
      await page.select('#month', params.month.toString());

      await page.waitForSelector('#gender');
      await page.select('#gender', params.gender.toString());

      const day = await page.waitForSelector('#day');
      await day?.type(params.day.toString());

      const year = await page.waitForSelector('#year');
      await year?.type(params.year.toString());
      await page.keyboard.press('Enter');

      await page.waitForNavigation();

      await page.keyboard.type(`---${params.gmail}`);

      await page.keyboard.press('Enter');

      await page.waitForNavigation();

      const password = await page.waitForSelector('[aria-label="Password"]');
      await password?.type(params.password);

      const confirmPassword = await page.waitForSelector('[aria-label="Confirm"]');
      await confirmPassword?.type(params.password);

      await page.keyboard.press('Enter');
    } catch (error) {
      console.log(error);
      await browser.close();
    }
  }
}