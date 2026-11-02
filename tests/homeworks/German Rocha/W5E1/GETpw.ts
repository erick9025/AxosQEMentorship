import { test, expect } from '@playwright/test';

test('Petición GET a Reqres.in - Lista de usuarios', async ({ request }) => {
    
    // 1. Realizar la petición GET a la API de prueba
    const respuesta = await request.get('https://reqres.in');

    // 2. Verificar que la respuesta del servidor sea exitosa (Código 200 OK)
    expect(respuesta.ok()).toBeTruthy();

    // 3. Convertir el cuerpo de la respuesta a un objeto JSON legible
    const cuerpoRespuesta = await respuesta.json();

    // 4. Imprimir el resultado completo en la consola
    console.log('--- RESULTADO DE LA API ---');
    console.log(JSON.stringify(cuerpoRespuesta, null, 2)); 
    // Nota: Usamos JSON.stringify(..., null, 2) para que el texto se imprima ordenado y bonito
});
