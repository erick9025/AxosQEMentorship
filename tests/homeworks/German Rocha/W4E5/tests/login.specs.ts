import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import listaUsuarios from '../data/usuarios.json';

test.describe("Pruebas de Login con Múltiples Usuarios (Data-Driven)", () => {
    
    // El ciclo recorre cada usuario del archivo JSON automáticamente
    listaUsuarios.forEach(({ escenario, correo }) => {
        
        test(`Validar error para: ${escenario}`, async ({ page }) => {
            const loginPage = new LoginPage(page);

            // 1. Ir directamente a la sección de login
            await loginPage.abrirPagina();

            // 2. Verificar que los campos iniciales estén listos para interactuar
            await expect(loginPage.inputDeUsuario).toBeVisible();

            // 3. Ejecutar el flujo de autenticación con el usuario del JSON
            await loginPage.realizarLogin(correo);

            // 4. Validaciones automatizadas sin esperas fijas ('waitForTimeout')
            await expect(loginPage.mensajeDeError).toBeVisible();
            
            const textoDelError = await loginPage.obtenerTextoError();
            expect(textoDelError).toContain('Incorrect username or password');
        });
        
    });
});
