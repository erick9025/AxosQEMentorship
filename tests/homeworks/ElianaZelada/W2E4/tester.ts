class Tester {
  // Propiedad: el nombre del tester.
  nombre: string;
 
  // El constructor recibe el nombre al crear el objeto.
  constructor(nombre: string) {
    this.nombre = nombre;
  }
 
  // Método: imprime el mensaje de inicio.
  iniciarPruebas(): void {
    console.log(`Iniciando pruebas de automatización - ${this.nombre}`);
  }
}
 
// Creamos una instancia (un objeto) de la clase.
const tester = new Tester('Eliana Zelada Alvarez');
tester.iniciarPruebas();