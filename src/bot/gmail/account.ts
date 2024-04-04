import puppeteer from 'puppeteer';
import { IGmailSignup } from '../../types/account';


export class Account {
  async create (params: IGmailSignup) {
    console.log(params);
    
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      defaultViewport: null,
      args: [''],
    });

    try {
      const birthDay = params.birthday.split('-');
      const page = await browser.newPage();
      page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36');

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
      await page.select('#month', birthDay[1]);

      await page.waitForSelector('#gender');
      await page.select('#gender', params.gender.toString());

      const day = await page.waitForSelector('#day');
      await day?.type(birthDay[0]);

      const year = await page.waitForSelector('#year');
      await year?.type(birthDay[2]);
      await page.keyboard.press('Enter');

      await page.waitForNavigation();

      await page.keyboard.type(`---${params.email}`);

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