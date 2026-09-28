let listYearsFinal: number[] = [];
// 25 jun 1990
const erickDOB: Date = new Date(1990, 5, 25, 18, 50, 0);

for(let iterator = 1990; iterator < 2000; iterator++) {
    let residue: number = iterator % 2;

    if(residue === 0) {
        listYearsFinal.push(iterator);
    }
}

const msg: string = "Erick nació el día: ";
console.log(msg + erickDOB);

let ordinal: number = 1;
listYearsFinal.forEach(year => {    
    console.log(`#${ordinal++} Pure TypeScript Even Year: ${year}`);
});
