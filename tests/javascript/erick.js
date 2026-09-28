const equipos = [ "Chivas", "America", "Atlas", "Cruz Azul" ];

console.log("....................... Parte 1 ........................");
for(const equipo of equipos) {
    console.log(equipo);
}

console.log("....................... Parte 2 ........................");
equipos.forEach(equipo => console.log(equipo)); // lambda function SINGLE LINE


console.log("....................... Parte 3 ........................");
let indice = 1;

equipos.forEach(equipo => {
    console.log(indice)
    console.log(equipo)
    console.log("")
    indice++;
}); // lambda function MULTILINE