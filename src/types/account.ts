type DateString = `${string}-${string}-${string}`;

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


export interface IGmailSignup{}