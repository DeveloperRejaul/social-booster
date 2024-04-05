/* eslint-disable @typescript-eslint/no-explicit-any */
import puppeteer from 'puppeteer';
import { type IGmailSignup } from '../../types/account';
import { Socket } from 'socket.io';

const action = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INPUT: 'input',
  RUNNING: 'running'
};
const fiveMinute = 60000 * 5;
export class Account {

  constructor(private ws: Socket) { }

  async wsInput(eventName: string, data: any) {
    return new Promise((resolve) => {
      this.ws.emit(eventName, data);
      this.ws.on(eventName, (d) => {
        resolve(d);
      });

      setTimeout(() => {
        resolve('Time over then 5 minutes ');
      }, fiveMinute);
    });
  }

  async create(params: IGmailSignup) {

    const browser = await puppeteer.launch({
      headless: true,
      slowMo: 100,
      defaultViewport: null,
      args: [''],
    });

    try {
      this.ws.emit(action.SUCCESS, 'Successfully created a now browser');

      const birthDay = params.birthday.split('-');

      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

      await page.goto('https://accounts.google.com/');
      this.ws.emit(action.SUCCESS, 'Successfully Go to google gmail website');

      const element = await page.waitForSelector('div ::-p-text(Create account)');
      await element?.click();
      this.ws.emit(action.SUCCESS, 'Clicked create account button');

      const element2 = await page.waitForSelector('div ::-p-text(For my personal use)');
      await element2?.click();
      this.ws.emit(action.SUCCESS, 'Clicked my personal use button');

      const firstName = await page.waitForSelector('#firstName');
      await firstName?.type(params.firstName);
      this.ws.emit(action.SUCCESS, 'Typing  first name..');

      const lastName = await page.waitForSelector('#lastName');
      await lastName?.type(params.lastName);
      this.ws.emit(action.SUCCESS, 'Typing  last name..');

      const nextBtn = await page.waitForSelector('div ::-p-text(Next)');
      await nextBtn?.click();
      this.ws.emit(action.SUCCESS, 'Clicked  next button');

      this.ws.emit(action.SUCCESS, 'Selecting birthday');

      await page.waitForSelector('#month');
      await page.select('#month', birthDay[1].startsWith('0') ? birthDay[1][1] : birthDay[1]);
      this.ws.emit(action.SUCCESS, 'Selected  month successfully');

      const day = await page.waitForSelector('#day');
      await day?.type(birthDay[0]);
      this.ws.emit(action.SUCCESS, 'Selected  day successfully');

      const year = await page.waitForSelector('#year');
      await year?.type(birthDay[2]);
      this.ws.emit(action.SUCCESS, 'Selected  year successfully');

      await page.waitForSelector('#gender');
      await page.select('#gender', params.gender.toString());
      this.ws.emit(action.SUCCESS, 'Selected  gender successfully');

      await page.keyboard.press('Enter');
      this.ws.emit(action.SUCCESS, 'Submitting  information ');

      await page.waitForNavigation();

      this.ws.emit(action.SUCCESS, 'going on gmail  writing page ');
      const emailInput = await page.waitForSelector('[name="Username"]');
      await emailInput?.type(params.email.endsWith('@gmail.com') ? params.email.replace('@gmail.com', '') : params.email);
      this.ws.emit(action.SUCCESS, 'Successfully writing gmail');

      await page.keyboard.press('Enter');
      this.ws.emit(action.SUCCESS, 'Successfully submit gmail');

      await page.waitForNavigation();

      this.ws.emit(action.SUCCESS, 'going on password  writing page ');
      const password = await page.waitForSelector('[aria-label="Password"]');
      await password?.type(params.password);

      this.ws.emit(action.SUCCESS, 'successfully write password ');
      this.ws.emit(action.SUCCESS, 'writing confirm password ');
      const confirmPassword = await page.waitForSelector('[aria-label="Confirm"]');
      await confirmPassword?.type(params.password);
      this.ws.emit(action.SUCCESS, 'successfully write confirm password ');

      await page.keyboard.press('Enter');
      this.ws.emit(action.SUCCESS, 'Submitting  information ');

      const result = await this.wsInput('verification', 'gave me verification code with in 5 minutes ');
      console.log(result);

    } catch (error) {
      console.log(error);
      this.ws.emit(action.ERROR, 'Error occurred smoothing wrong action');
      await browser.close();
    }
  }
}