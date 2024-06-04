const daysTag = document.querySelector(".days");
currentDate = document.querySelector(".current-date");
prevNextIcon = document.querySelectorAll(".icons span");
const btn = document.querySelector(".button-pes")


function chamar (){

let folgas1 = ['Folga','Folga','Trabalha','Trabalha','Trabalha','Folga','Folga','Trabalha','Trabalha','Trabalha','Folga','Folga','Trabalha','Trabalha','Trabalha','Folga','Folga','Trabalha','Trabalha','Trabalha','Folga','Folga','Trabalha','Trabalha','Trabalha','Folga','Trabalha','Trabalha'];
let folgas2 = ["Trabalha", "Trabalha", ,"Folga" ,"Trabalha" ,"Trabalha" ,"Trabalha" ,"Folga" ,"Folga" ,"Trabalha" ,"Trabalha" ,"Trabalha" ,"Folga" ,"Folga" ,"Trabalha" ,"Trabalha" ,"Trabalha" ,"Folga" ,"Folga" ,"Trabalha" ,"Trabalha" ,"Trabalha" ,"Folga" ,"Folga" ,"Trabalha" ,"Trabalha" ,"Trabalha" ,"Folga" ,"Folga"];
let folgas3 = ["Trabalha", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Trabalha", "Folga"];
let folgas4 = [" Folga", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Trabalha"];
let folgas5 = ["Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Folga", "Trabalha", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha"];
let folgasAdv = ["Folga", "Folga", "Trabalha", "Trabalha", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Trabalha", "Trabalha", "Folga", "Folga", "Trabalha", "Trabalha", "Trabalha", "Folga", "Trabalha", "Trabalha"];
  
  let date  = new Date();
  let pes = document.querySelector("#end")
  let tipologia = document.querySelector(".tip")

  tip = tipologia.value
  
  if(tip === "one"){
    salario = [...folgas1]
  }else if(tip == "two"){
    salario = [...folgas2]
  }else if(tip === "three"){
    salario = [...folgas3]
  }else if(tip === "four"){
    salario = [...folgas4]
  }else if(tip === "five"){
    salario = [...folgas5]
  }else if(tip === "Adv"){
    salario = [...folgasAdv]
  }else{
    salario = [...folgas1]
  }



  



  console.log(tip)
  console.log(salario)

  let a = pes.value
    if(a){
    date = new Date(a)
    }else{
    
  }
  
  
  console.log(date)
console.log(date)
let currYear = date.getFullYear()
let currMonth = date.getMonth()



//getting new date, current year and month



 

const months = ["Janeiro","Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const renderCalendar = ()=>{
  
  let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(); //return day -> sunday-saturday
  let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
  let lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();
  let lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();
  
  let liTag = "";
  
  for(let i = firstDayOfMonth; i > 0; i--){ //creat li of previous month last days
    liTag = liTag + `<li class="inactive">${lastDateOfLastMonth -i +1}</li>`;
    
  }
  
  for(let i = 1; i<= lastDateOfMonth; i++){
    
    
    let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear()? "active": "";
    
    
    let mesatualizado = date.getMonth() + 1
    
    let anoatualizado = date.getFullYear()
    let diaatualizado = i
    
    
    let dateBase = new Date("2024-01-27 ")
    let dateAtual = new Date(`${anoatualizado}-${(mesatualizado)}-${diaatualizado} `)
    //let dateAtual = new Date(`2024-01-28 `)
    //console.log("dia atual "+ dateBase + dateAtual)
    let dif = (dateAtual - dateBase) / (1000*60*60*24)
    

     

    let difEscala = dif < 28 ? dif : dif%28
    let folgasDaEscala = salario[difEscala]
    //console.log(folgas[0].one[difEscala])
    
    
    liTag = liTag + `<li class="${folgasDaEscala}">${i}</li>`;
    //document.getElementById("demo").innerHTML = liTag
    //console.log(date.getDate())
  }
  
  for(let i = lastDayOfMonth; i< 6; i++){
    liTag = liTag + `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
    //document.getElementById("demo").innerHTML = liTag
  }
  
  currentDate.innerHTML = `${months[currMonth]} ${currYear}`;
  
  daysTag.innerHTML = liTag
   
  

  
}
renderCalendar()
}

chamar()
  


// prevNextIcon.forEach(icon =>{
//   icon.addEventListener("click", ()=>{
    
//    currMonth = icon.id === "prev"? currMonth - 1 : currMonth + 1;
   
//     if(currMonth < 0 || currMonth > 11){
//       date = new Date(currYear, currMonth, new Date().getDate());
//       console.log("aaaaaa")
//       currYear = date.getFullYear();
//       currMonth = date.getMonth();
//     } else{
//       date = new Date();
//     }
//     renderCalendar()
    
//   })
// })

































































// ----------------- CODIGO FUNCIONAL -----------------------------

// const daysTag = document.querySelector(".days");
// currentDate = document.querySelector(".current-date");
// prevNextIcon = document.querySelectorAll(".icons span");

// //getting new date, current year and month

// let date  = new Date();
// currYear = date.getFullYear()
// currMonth = date.getMonth()

// const months = ["Janeiro","Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

// const renderCalendar = ()=>{
  
//   let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(); //return day -> sunday-saturday
//   let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
//   let lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();
//   let lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();
  
//   let liTag = "";
  
//   for(let i = firstDayOfMonth; i > 0; i--){ //creat li of previous month last days
//     liTag = liTag + `<li class="inactive">${lastDateOfLastMonth -i +1}</li>`;
    
//   }
  
//   for(let i = 1; i<= lastDateOfMonth; i++){
//     let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear()? "active": "";
//     liTag = liTag + `<li class="${isToday}">${i}</li>`;
//     //document.getElementById("demo").innerHTML = liTag
//     console.log(date.getDate())
//   }
  
//   for(let i = lastDayOfMonth; i< 6; i++){
//     liTag = liTag + `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
//     //document.getElementById("demo").innerHTML = liTag
//   }
  
//   currentDate.innerHTML = `${months[currMonth]} ${currYear}`;
  
//   daysTag.innerHTML = liTag
   
  
// console.log("BULIM1")
  
// }
  
// renderCalendar()

// prevNextIcon.forEach(icon =>{
//   icon.addEventListener("click", ()=>{
    
//    currMonth = icon.id === "prev"? currMonth - 1 : currMonth + 1;
   
//     if(currMonth < 0 || currMonth > 11){
//       date = new Date(currYear, currMonth, new Date().getDate());
//       currYear = date.getFullYear();
//       currMonth = date.getMonth();
//     } else{
//       date = new Date();
//     }
//     renderCalendar()
    
//   })
// })