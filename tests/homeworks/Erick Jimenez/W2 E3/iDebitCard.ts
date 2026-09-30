export interface IDebitCard {
    withdraw(amount: number): void;
    deposit(amount: number): void;
}