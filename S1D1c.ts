let names:string="Germán Brian Rocha Terrazas";
let bools:boolean=false;
let numbers:number=2128;
let listas:(string | number)[]=["1st Item","2nd item",3,"4th item"];
let dates:Date=new Date();
let anniversarys:string=dates.toLocaleDateString("es-MX");
let PCspecss = {
    Brand:"MSI",
    Processor:"I712Gen",
    RAM:"18GB",
    Disc:"1TB"
};

console.log(names);
console.log(bools);
console.log(numbers);
console.log(listas);
console.log(anniversarys);
console.log(PCspecss);
console.log();