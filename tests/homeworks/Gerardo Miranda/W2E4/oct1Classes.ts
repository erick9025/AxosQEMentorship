// Semana 2, Ejercicio 4: Clases

export class PerfilUsuario {
    public nombreDeUsuario = "Gera Miranda";
    public edadDelUsuario = "4 Añotes";
    public direccionDelUsuario = "Tangamandapio";

    public obtenerNombre(): void {
        console.log(`El nombre del usuario es: ${this.nombreDeUsuario}`);
    }

    public obtenerEdad(): void {
        console.log(`La edad del usuario es de: ${this.edadDelUsuario}`);
    }

    public obtenerDireccion(): void {
        console.log(`La direccion del usuario es: ${this.direccionDelUsuario}`);
    }
}
