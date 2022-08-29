import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  data : boolean = false;
  constructor() {}

  isLoggedIn(){
    return !!localStorage.getItem('token')
  }

  city() {
    return[
      {
        id: 1,
        name: "Makati",
      },
      {
        id: 2,
        name: "Pasay"
      },
      {
        id: 3,
        name: "Manila"
      },
      {
        id: 4,
        name: "Marikina"
      },
      {
        id: 5,
        name: "Pasig"
      }
    ]
  }
  barangay() {
    return[
      {
        id: 1,
        name: "Bangkal"
      },
      {
        id: 1,
        name: "Bel-Air"
      },
      {
        id: 1,
        name: "Kasilawan"
      },
      {
        id: 1,
        name: "Palanan"
      },
      {
        id: 1,
        name: "San Antonio"
      },
      {
        id: 2,
        name: "Apelo Cruz"
      },
      {
        id: 2,
        name: "Baclaran"
      },
      {
        id: 2,
        name: "Cartimar"
      },
      {
        id: 2,
        name: "Kalayaan"
      },
      {
        id: 2,
        name: "Libertad"
      },
      {
        id: 3,
        name: "Binondo"
      },
      {
        id: 3,
        name: "Ermita"
      },
      {
        id: 3,
        name: "Intramuros"
      },
      {
        id: 3,
        name: "Malate"
      },
      {
        id: 3,
        name: "Paco"
      },
      {
        id: 4,
        name: "Barangka"
      },
      {
        id: 4,
        name: "Fortune"
      },
      {
        id: 4,
        name: "Malanday"
      },
      {
        id: 4,
        name: "Nangka"
      },
      {
        id: 4,
        name: "Tumana"
      },
      {
        id: 5,
        name: "Caniogan"
      },
      {
        id: 5,
        name: "kapitolyo"
      },
      {
        id: 5,
        name: "Pineda"
      },
      {
        id: 5,
        name: "Manggahan"
      },
      {
        id: 5,
        name: "Rosario"
      }
    ]
  }
}

