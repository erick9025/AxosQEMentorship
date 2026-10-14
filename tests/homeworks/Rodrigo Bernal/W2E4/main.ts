import { BankAccount } from "./Classes/bankAccount";

const rodrigoAccount = new BankAccount("Rodrigo Bernal", 500, 123456789);

rodrigoAccount.deposit(500);
console.log(rodrigoAccount.getBalance());
rodrigoAccount.withdraw(700);
console.log(rodrigoAccount.getBalance());
rodrigoAccount.withdraw(1500);
console.log(rodrigoAccount.getBalance());
console.log(rodrigoAccount.getAccountInfo());