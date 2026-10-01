import { test, expect } from '@playwright/test'; // 
import { DispensadorAguaMascotas } from '../W2E3/medidorAgua';

test('Probando Dispensador de Agua para Mascotas (interface + class)', async () => {
    const dispenser = new DispensadorAguaMascotas('PetWater');
    
    dispenser.tomar(40);

    let aguaAgregada = dispenser.rellenar(40); 

    expect(dispenser.nivelDeAgua).toBe(100);
    expect(aguaAgregada).toBe(40);
    console.log(`Se relleno con ${aguaAgregada} %  de agua para rellenar`);
});
