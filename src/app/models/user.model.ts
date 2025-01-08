export interface IUser {
    email: string,
    password?: string,
    name: string,
    age: number,
    phoneNumber: string
}

// export class User {
//     email: string ;
//     password?: string;
//     name: string;
//     age: number;
//     phoneNumber: string;


//     constructor(values: Object) {
//         Object.assign(this, values)
//     }
    

//     public setUserVerySecret() {
        
//     }
// }

// new User({...values})