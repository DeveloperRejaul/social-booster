import puppeteer from 'puppeteer';

export class Account {
  async create () {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      defaultViewport: { width: 1920, height: 1080 },
    });
   
    try {
      const page = await browser.newPage();
      await page.goto('https://accounts.google.com/');

      const element = await page.waitForSelector('div ::-p-text(Create account)');  
      await element?.click(); 
      
      const element2 = await page.waitForSelector('div ::-p-text(For my personal use)');  
      await element2?.click();   
      
      const firstName =await page.waitForSelector('#firstName');
      await firstName?.type('kamal');
      
      const lastName = await page.waitForSelector('#lastName');
      await lastName?.type('mia');

      const nextBtn = await page.waitForSelector('div ::-p-text(Next)');  
      await nextBtn?.click();

      await page.waitForSelector('#month');
      await page.select('#month', '6');

      await page.waitForSelector('#gender');
      await page.select('#gender', '1');

      const day = await page.waitForSelector('#day');
      await day?.type('06');

      const year = await page.waitForSelector('#year');
      await year?.type('2000');
      await page.keyboard.press('Enter');

      await page.waitForNavigation();

      await page.keyboard.type('---kamalmia1390');
      await page.keyboard.press('Enter');

      await page.waitForNavigation();

      const password = await page.waitForSelector('[aria-label="Password"]');
      await password?.type('kamal1390');

      const confirmPassword = await page.waitForSelector('[aria-label="Confirm"]');
      await confirmPassword?.type('kamal1390');

      await page.keyboard.press('Enter');
    } catch (error) {
      console.log(error);
      await browser.close();
    }
  }
}