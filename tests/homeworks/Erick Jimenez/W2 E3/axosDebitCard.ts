import { IDebitCard } from "./iDebitCard";

export class AxosDebitCard implements IDebitCard {
    public balance: number = 0;

    public withdraw(amount: number): void {
        this.balance -= amount;
    }

    public deposit(amount: number): void {
        this.balance += amount;
    }
}