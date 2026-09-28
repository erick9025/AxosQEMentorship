let year = 2000;
let listLeapYears = [];

// 21st century "bisiesto" years
while(year >= 2000 && year < 2100) {
    if(year % 4 === 0) {
        listLeapYears.push(year);
    }
    year++;
}

console.log("21st Century's leap years:")
listLeapYears.forEach(year => console.log(year));