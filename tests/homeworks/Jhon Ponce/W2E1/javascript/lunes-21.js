let nombre = "Jhon Antony Ponce Trujillo";
let booleano = true;
let numero = 2026
let array = ["this","is","array", 152];
let date = new Date();
let formattedDate = date
	.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" })
	.replace(/(\w+) (\d+), (\d+)/, "$3/$1/$2");
let persona = {
	nombre: nombre,
	edad: 25,
	activo: booleano
};

console.log(nombre);
console.log(booleano);
console.log(numero);
console.log(array);
console.log(formattedDate);
console.log(persona);

