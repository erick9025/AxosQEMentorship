let nombre: string = "Jhon Antony Ponce Trujillo";
let booleano: boolean = true;
let numero: number = 2026
let array: (string | number)[] = ["this","is","array", 152];
let date: Date = new Date();
let formattedDate: string = date
	.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" })
	.replace(/(\w+) (\d+), (\d+)/, "$3/$1/$2");
let persona: { nombre: string; edad: number; activo: boolean } = {
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