let listYearsFinal = [];
// 25 jun 1990
let erickDOB = new Date(1990, 5, 25, 18, 50, 0);

for(let iterator = 1990; iterator < 2000; iterator++) {
    let residue = iterator % 2;

    if(residue === 0) {
        listYearsFinal.push(iterator);
    }
}

const msg = "Erick nació el día: ";
console.log(msg + erickDOB);

let ordinal = 1;
listYearsFinal.forEach(year => {    
    console.log(`#${ordinal++} Pure JavaScript Even Year: ${year}`);
});
