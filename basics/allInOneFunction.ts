export function printAll90sDecadeEvenYearsFunction(): void {
    let listYearsFinal: number[] = [];

    for(let iterator = 1990; iterator < 2000; iterator++) {
        let residue = iterator % 2;

        if(residue === 0) {
            listYearsFinal.push(iterator);
        }
    }

    let ordinal: number = 1;
    listYearsFinal.forEach(year => {    
        console.log(`#${ordinal++} Año Par: ${year}`);
    });
}
