//Semana 2, Ejercicio 3: Interfaces
export interface IMedidorDeAgua {
    brand: string;
    nivelDeAgua: number; 

    tomar(cantidad: number): void;
    rellenar(aguaPorRellenar: number): number; // 
}