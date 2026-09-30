import { test } from '@playwright/test';
import { AxosDebitCard } from './homeworks/Erick Jimenez/W2 E3/axosDebitCard';

test('Testing debit cards (interface + class)', async () => {
  let card1: AxosDebitCard = new AxosDebitCard();

  card1.deposit(10_000);
  card1.withdraw(555);

  console.log("Final balance: " + card1.balance);
});