import puppeteer from 'puppeteer';
import { IGmailSignup } from '../../types/account';
import { Server } from 'socket.io';

export class Account {

  constructor(private ws: Server) { }


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async input(eventName: string, data: any) {
    return new Promise((resolve) => {
      this.ws.emit(eventName, data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.ws.on(eventName, (_data: any) => {
        resolve(_data);
      });
    });
  }

  async create(params: IGmailSignup) {

    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      defaultViewport: null,
      args: [''],
    });

    try {
      const birthDay = params.birthday.split('-');

      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

      await page.goto('https://accounts.google.com/');

      const element = await page.waitForSelector('div ::-p-text(Create account)');
      await element?.click();

      const element2 = await page.waitForSelector('div ::-p-text(For my personal use)');
      await element2?.click();

      const firstName = await page.waitForSelector('#firstName');
      await firstName?.type(params.firstName);

      const lastName = await page.waitForSelector('#lastName');
      await lastName?.type(params.lastName);

      const nextBtn = await page.waitForSelector('div ::-p-text(Next)');
      await nextBtn?.click();

      await page.waitForSelector('#month');
      await page.select('#month', birthDay[1].startsWith('0') ? birthDay[1][1] : birthDay[1]);

      const day = await page.waitForSelector('#day');
      await day?.type(birthDay[0]);

      const year = await page.waitForSelector('#year');
      await year?.type(birthDay[2]);

      await page.waitForSelector('#gender');
      await page.select('#gender', params.gender.toString());


      await page.keyboard.press('Enter');

      await page.waitForNavigation();

      const emailInput = await page.waitForSelector('[name="Username"]');
      await emailInput?.type(params.email.endsWith('@gmail.com') ? params.email.replace('@gmail.com', '') : params.email);

      await page.keyboard.press('Enter');

      await page.waitForNavigation();

      const password = await page.waitForSelector('[aria-label="Password"]');
      await password?.type(params.password);

      const confirmPassword = await page.waitForSelector('[aria-label="Confirm"]');
      await confirmPassword?.type(params.password);

      await page.keyboard.press('Enter');


      await this.input
    } catch (error) {
      console.log(error);
      await browser.close();
    }
  }
}