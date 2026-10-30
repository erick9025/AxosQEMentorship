# Axos QE Playwright Framework

Framework de automatización con Playwright y TypeScript, organizado con Page Object Model.

## Estructura

```text
pom/
  api/                 Cliente y tipos de Fake Store API
  pages/               Page Objects de la aplicación
tests/
  api/                 Pruebas de API
  auth/                Pruebas de autenticación
```

## Requisitos

- Node.js 20.12 o posterior
- npm

Instala las dependencias y los navegadores de Playwright:

```bash
npm ci
npx playwright install chromium firefox
```

## Credenciales de Sauce Labs Support

Copia `.env.example` como `.env` y completa `SAUCE_USERNAME` y `SAUCE_PASSWORD`. El archivo `.env` está excluido de Git. Sin estas variables, Playwright omite únicamente la prueba de inicio de sesión exitoso; las pruebas de estructura del formulario siguen ejecutándose.

## Comandos

```bash
npm test                 # Pruebas en Chromium y Firefox
npm run typecheck        # Validación de TypeScript
npm run report           # Abre el último reporte HTML
```

El reporte HTML se genera en `playwright-report/`. Los traces y capturas de pantalla se conservan cuando una prueba falla.
