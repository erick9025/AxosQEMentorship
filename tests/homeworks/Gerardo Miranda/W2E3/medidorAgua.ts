//Semana 2, Ejercicio 3: Interfaces
import { IMedidorDeAgua } from './iMedidorAgua';

export class DispensadorAguaMascotas implements IMedidorDeAgua {
    brand: string;
    nivelDeAgua: number;

    constructor(brand: string) {
        this.brand = brand;
        this.nivelDeAgua = 100; 
    }

    tomar(amount: number): void {
        this.nivelDeAgua = Math.max(0, this.nivelDeAgua - amount);
    }

    rellenar(aguaPorRellenar: number): number { 
        const nivelAnterior = this.nivelDeAgua; 
        
        // No tirar el agua si se pasa del nivel máximo (100)
        this.nivelDeAgua = Math.min(100, this.nivelDeAgua + aguaPorRellenar);
        
        // Calculamos cuánta agua se aceptó realmente en el tanque 
        return this.nivelDeAgua - nivelAnterior; 
    }
}
