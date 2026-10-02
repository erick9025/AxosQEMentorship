function clasificarEdad(edad: number): void {
    if (edad < 0) {
        console.error("Error: la edad no puede ser menor a 0");
    } else if (edad < 3) {
        console.log("Bebé");
    } else if (edad < 11) {
        console.log("Niño");
    } else if (edad < 18) {
        console.log("Adolescente");
    } else if (edad < 60) {
        console.log("Adulto");
    } else {
        console.log("Anciano");
    }
}

const edades: number[] = [-1, 0, 3, 11, 18, 60];

edades.forEach((edad) => {
    console.log(`Edad: ${edad}`);
    clasificarEdad(edad);
});