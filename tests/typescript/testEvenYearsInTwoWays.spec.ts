import { test } from '@playwright/test';
import { printAll90sDecadeEvenYearsFunction } from '../../basics/allInOneFunction';
import { AllInOneClass } from '../../basics/allInOneClass';

test('Print even years', () => {
    printAll90sDecadeEvenYearsFunction(); // Español

    AllInOneClass.printAll90sDecadeEvenYearsClass(); // Inglés
});
