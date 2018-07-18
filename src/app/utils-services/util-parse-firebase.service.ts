import { Injectable } from '@angular/core';
import { UserDTO } from '../DTO/userDTO';

@Injectable()
export class UtilsParseFromFirebaseService {

  constructor() { }


  parseListUsersFirebase (data) {
    const admins = [];
    if (data) {
      for (const userFire of data) {
        const userDTO: UserDTO = new UserDTO;
        userDTO.username = userFire.username;
        userDTO.email = userFire.email;
        userDTO.role = userFire.role;
        console.log(userDTO);
        admins.push(userDTO);
      }
    }
    return admins;
  }

  parseUserFromFirebase(data) {
    data = data[0];
    const userDTO: UserDTO = new UserDTO;
    if (data) {
      userDTO.username = data.username;
      userDTO.email = data.email;
      userDTO.role = data.role;
    }
    return userDTO;
  }
}
