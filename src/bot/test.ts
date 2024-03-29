import puppeteer from 'puppeteer';

export default async function Test() {
  const browser = await puppeteer.launch({
    headless: false, 
    defaultViewport: null,
    args: ['--start-maximized','--disable-infobars'] 
  });
  const page = await browser.newPage();
  await page.setUserAgent('Rezaul Karim');
  
  // Navigate to a website
  await page.goto('https://www.facebook.com');

} 