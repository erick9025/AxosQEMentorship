function agerClasifier(ager:number){
    if (ager<0){
        console.error("There are no negative ages");
    }else if(ager<3){
        console.log("Baby");
    }else if(ager<11){
        console.log("Kid");
    }else if (ager<18){
        console.log("Teen");
    }else if (ager<60){
        console.log("Adult");
    }else if(ager>=60){
        console.log("Elder");
    }
}

const agess:number[]=[-1,1,4,15,55,60];
agess.forEach((ager)=>{
    agerClasifier(ager);
});