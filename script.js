const container=document.querySelector(".container");
const movieSelect=document.querySelector("#movie");
const seats=document.querySelectorAll(".row .seat");
const seatCount=document.querySelector("#count");
const total=document.querySelector("#cost");

var ticketPrice=+movieSelect.value;
populateUI();
//retrieves data from localStorage
function populateUI(){
     const selectedSeats=JSON.parse(localStorage.getItem('seatStorage'));
    
    if(selectedSeats!==null&&selectedSeats.length>0){
    seats.forEach(function(seat,index){
        if(selectedSeats.indexOf(index)>-1)
        seat.classList.add('selected');
    });

    if(localStorage.movieIndex!==null)
    movieSelect.selectedIndex=localStorage.movieIndex;
    ticketPrice=movieSelect.value;
}
}
//collect movieIndex and movie price in localStorage
function movieData(index,value){
    localStorage.movieIndex=index;
    localStorage.moviePrice=value;
}
//changes ticketPrice
movieSelect.addEventListener('change',function(e){
    ticketPrice=+e.target.value;
    movieData(e.target.selectedIndex,e.target.value);
    updateSeats();
});
//updates selected seats total and stores data in localStorage
function updateSeats(){
    const selectedSeats=document.querySelectorAll(".row .seat.selected");

    const seatIndex=[...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat);
    });
   localStorage.setItem('seatStorage',JSON.stringify(seatIndex));
    seatCount.innerText=selectedSeats.length;
    total.innerText=ticketPrice*selectedSeats.length;
}
//to toggle the seats betweeen selected and unselected
container.addEventListener("click",function(e){
    if(e.target.classList.contains('seat')&&!e.target.classList
    .contains('occupied')){
        e.target.classList.toggle('selected');
        updateSeats();
    }
});

updateSeats();