let listLeapYears = [];

// 21st century "bisiesto" years
for(let year = 2000; year < 2100; year++) {
    if(year % 4 === 0) {
        listLeapYears.push(year);
    }
}

console.log("21st Century's leap years:")
listLeapYears.forEach(year => console.log(year));