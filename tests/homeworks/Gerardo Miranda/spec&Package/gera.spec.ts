import { test, expect } from '@playwright/test';
import { DispensadorAguaMascotas } from '../W2E3/medidorAgua';
import { PerfilUsuario } from '../W2E4/oct1Classes';

test.describe('Tarea 30 de Septiembre', () => {
    test('Probando Dispensador de Agua para Mascotas (interface + class)', async () => {
        const dispenser = new DispensadorAguaMascotas('PetWater');
        
        dispenser.tomar(40);
        let aguaAgregada = dispenser.rellenar(40); 

        expect(dispenser.nivelDeAgua).toBe(100);
        expect(aguaAgregada).toBe(40);
        console.log(`Se relleno con ${aguaAgregada} % de agua para rellenar`);
    });
});

test.describe('Tarea 1 de Octubre', () => {
    test('Leer los datos del perfil de usuario correctamente', async ({ page }) => {
        const perfil = new PerfilUsuario();

        perfil.obtenerNombre();
        perfil.obtenerEdad();
        perfil.obtenerDireccion();
    });
});

