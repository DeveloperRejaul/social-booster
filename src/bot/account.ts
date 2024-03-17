import puppeteer from 'puppeteer';


export class AccountService {
  constructor(){}

  async create(name: string, email: string , birthDay: string, password: string, gender: 'male' | 'female' | 'custom'): Promise<void>{
    // launch browser
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 250,
      defaultViewport: { width: 1920, height: 1080 },
    });
  
    try {
      // create a new page
      const page = await browser.newPage();
  
      // go to url
      await page.goto('https://m.facebook.com/login/', { waitUntil: 'networkidle2' });
  
      // select signing button with id
      const signingButton = await page.waitForSelector('#signup-button');
  
      // click search button
      await signingButton?.click();
  
      // select signing input and button with id
      const firstName = await page.waitForSelector('#firstname_input');
      const lastName = await page.waitForSelector('#lastname_input');
  
      // type name input 
      await firstName?.type('Rezaul',{delay:100});
      await lastName?.type('Karim',{delay:100});
      await page.keyboard.press('Enter');

      // selecting birthday day information
      await page.select('select[name="birthday_day"]', '6');
      await page.select('select[name="birthday_month"]', '6');
      await page.select('select[name="birthday_year"]', '1999');
      
      // select submit button
      const nextButton2 = await page.waitForSelector('[type="submit"]');
      await nextButton2?.click();

      // select email input field
      const emailInput = await page.waitForSelector('#contactpoint_step_input');
      await emailInput?.type('devrejaul.official@gmail.com',{delay:100});
      await page.keyboard.press('Enter');

      // selecting gender
      const female = await page.waitForSelector('[for="Female"]');
      const male = await page.waitForSelector('[for="Male"]');
      const custom = await page.waitForSelector('[for="Custom"]');
      const gender = {female, male,custom};

      await gender['male']?.click();
      await page.keyboard.press('Enter');


      // pressing password
      const passwordInput = await page.waitForSelector('#password_step_input');
      await passwordInput?.type('rejaul1200');
      //   await page.keyboard.press('Enter');

      // close browser window
    //   await browser.close();
    } catch (error) {
      console.log(error);

      // close browser window
    //   await browser.close();
    }
   

  }

  async login(email: string, password: string): Promise<void> {

  }
}