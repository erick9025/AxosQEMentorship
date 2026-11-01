function evaluarPrueba(resultado: number): string {
    //variable para guardar el mensaje final
    let mensaje: string = "";

    if (resultado < 0) {
        mensaje = "Error: El resultado no puede ser negativo.";
    } else if (resultado < 51) {
        mensaje = "Reprobado. Necesitas estudiar más.";
    } else if (resultado < 85) {
        mensaje = "Aprobado. ¡Buen trabajo!";
    } else {
        mensaje = "Excelente. ¡Puntaje sobresaliente!";
    }

    return mensaje;
}

// lista de notas para probar la función
const notasDePrueba: number[] = [-5, 45, 70, 95];

// ciclo para revisar cada nota de la lista
notasDePrueba.forEach((nota) => {
    console.log(`Nota evaluada: ${nota}`);
    
    const veredicto: string = evaluarPrueba(nota);
    
    console.log(veredicto);
});
