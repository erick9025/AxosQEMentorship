// Ejercicio 2: interfaz ("molde") para un caso de prueba.
 

import { ICasoDePrueba } from "./iCasoPrueba";
 
 
// Ejemplo de uso: cumple con el molde.
export class Caso1 implements ICasoDePrueba {
  public id: number = 1;
  public titulo: string = 'Login con credenciales válidas';
  public estado: 'Pass' | 'Fail' = 'Pass';
}


 
export class Caso2 implements ICasoDePrueba {
  public id: number = 2;
  public titulo: string = 'Login con contraseña incorrecta';
  public estado: 'Pass' | 'Fail' = 'Fail';
}




console.log(Caso1, Caso2);
 
