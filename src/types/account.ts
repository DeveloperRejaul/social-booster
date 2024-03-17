type DateString = `${string}-${string}-${string}`;

export interface ISignup {
  firstName: string,
  lastName: string,
  email: string ,
  birthDay: DateString,
  password: string, 
  gender: 'male' | 'female' | 'custom'
}
  
export interface ILogin {
  email: string, 
  password: string
}