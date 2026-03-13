function evaluateTrade(){

let a = Number(document.getElementById("valueA").value);
let b = Number(document.getElementById("valueB").value);

let diff = Math.abs(a-b);

if(diff < 10){
document.getElementById("result").innerText = "Fair Trade";
}
else if(a > b){
document.getElementById("result").innerText = "Team A wins trade";
}
else{
document.getElementById("result").innerText = "Team B wins trade";
}

}
