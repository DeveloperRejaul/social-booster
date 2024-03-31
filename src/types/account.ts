export type DateString = `${string}-${string}-${string}`;

export interface IFBSignup {
  firstName: string,
  lastName: string,
  email: string ,
  birthDay: DateString,
  password: string, 
  gender: 'male' | 'female' | 'custom'
}
  
export interface IFBLogin {
  email: string, 
  password: string
}


export interface IGmailSignup{
  firstName: string;
  lastName: string;
  month: number,
  day: number;
  year: number;
  gender: number;
  gmail: string;
  password: string;
}