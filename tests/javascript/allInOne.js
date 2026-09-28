let listYearsFinal = [];

for(let iterator = 1990; iterator < 2000; iterator++) {
    let residue = iterator % 2;

    if(residue === 0) {
        listYearsFinal.push(iterator);
    }
}

listYearsFinal.forEach(year => {
    let ordinal = 1;

    console.log(`#${ordinal++} Even Year: ${year}`);
})