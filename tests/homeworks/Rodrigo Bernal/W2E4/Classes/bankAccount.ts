export class BankAccount {

    public owner: string;
    public balance: number;
    public accountNumber: number;

    constructor(owner: string, balance: number, accountNumber: number) {
        this.owner = owner;
        this.balance = balance;
        this.accountNumber = accountNumber;
    }

    public deposit(amount: number): void {
        this.balance += amount;
    }

    public withdraw(amount: number): void {
        if (amount > this.balance) {
            console.error("Balance is not enough for the withdrawal");
        } else {
            this.balance -= amount;
        }
    }

    public getBalance(): number {
        return this.balance;
    }

    public getAccountInfo(): string {
        return `Account: ${this.accountNumber} - Owner: ${this.owner} - Balance: ${this.balance}`;
    }

}