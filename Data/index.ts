import { Medication } from "../Contexts/MedicationContext";

export interface User {
    id?: string;
    name?: string;
    username? : string;
    password? : string;
    medications?: Medication[];
  }

export const users : User[] = [
{id:"1", name:"Elina Kerola",username:"Elina",password:"123", medications:[{url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbk_EstrjXhjkHO9cH_0Y0QqzHqjWhRiaI4clXPInX2w&s",name:"Sertralin", comment:"1 gång varje morgon. 50 mg."}]}
]

