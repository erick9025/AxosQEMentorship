export class September28 {

    public typescriptTest(): void {
        let listYearsFinal: number[] = [];

        for(let iterator = 1990; iterator < 2000; iterator++) {
            let residue = iterator % 2;

            if(residue === 0) {
                listYearsFinal.push(iterator);
            }
        }

        listYearsFinal.forEach(year => {
            let ordinal: number = 1;

            console.log(`#${ordinal++} Even Year: ${year}`);
        })
    }
}