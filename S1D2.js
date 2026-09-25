function ageClasifier(age){
    if (age<0){
        console.error("There are no negative ages");
    }else if(age<3){
        console.log("Baby");
    }else if(age<11){
        console.log("Kid");
    }else if (age<18){
        console.log("Teen");
    }else if (age<60){
        console.log("Adult");
    }else if(age>=60){
        console.log("Elder");
    }
}

const ages=[-1,1,4,15,55,60];
ages.forEach((age)=>{
    ageClasifier(age);
});