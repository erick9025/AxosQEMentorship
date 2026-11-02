import { test, expect } from '@playwright/test';

test('Petición GET a Reqres.in con Aserciones', async ({ request }) => {
    
    // 1. Realizar la petición GET
    const respuesta = await request.get('https://reqres.in');

    // 2. ASERCIÓN 1: Validar que el código de respuesta (Status) sea exactamente 200
    expect(respuesta.status()).toBe(200);

    // Convertir la respuesta a JSON para poder revisar lo que tiene adentro
    const cuerpoRespuesta = await respuesta.json();

    // 3. ASERCIÓN 2: Validar que la respuesta contenga datos (que la lista de usuarios no esté vacía)
    // Reqres devuelve los usuarios dentro de un arreglo llamado "data". 
    // Revisamos que su longitud (length) sea mayor que 0.
    expect(cuerpoRespuesta.data.length).toBeGreaterThan(0);

    // Imprimir en consola para verificar visualmente
    console.log('--- Validación Exitosa ---');
    console.log(`Código de estado recibido: ${respuesta.status()}`);
    console.log(`Cantidad de usuarios encontrados: ${cuerpoRespuesta.data.length}`);
});
