console.log("=== Ciclo FOR ===");
for (let numeroCaso = 1; numeroCaso <= 5; numeroCaso++) {
    console.log(`[FOR] Ejecutando caso de prueba número: ${numeroCaso}`);
}

console.log("=== Ciclo WHILE ===");
let numeroCasoWhile = 1;
while (numeroCasoWhile <= 5) {
    console.log(`[WHILE] Ejecutando caso de prueba número: ${numeroCasoWhile}`);
    numeroCasoWhile++;
}

console.log("=== Ciclo DO...WHILE ===");
let numeroCasoDoWhile = 1;
do {
    console.log(`[DO...WHILE] Ejecutando caso de prueba número: ${numeroCasoDoWhile}`);
    numeroCasoDoWhile++;
} while (numeroCasoDoWhile <= 5);
