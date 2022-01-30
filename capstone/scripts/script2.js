(function(){
  
  var list = document.querySelector('#list'),
      form = document.querySelector('form'),
      item = document.querySelector('#item');
  
  form.addEventListener('submit',function(e){
    e.preventDefault();
    let dateFinal = document.getElementById("demo").innerHTML
    list.innerHTML += '<li>Task: ' + item.value + " Due Date: " + dateFinal + '</li>';
    store();
    item.value = "";
  },false)
  
  list.addEventListener('click',function(e){
    var t = e.target;
    close();
    if(t.classList.contains('checked')){
      t.parentNode.removeChild(t);
    } else {
      t.classList.add('checked');
    }
    store();
    close();
  },false)
  
  function store() {
    window.localStorage.myitems = list.innerHTML;
  }
  
  function getValues() {
    var storedValues = window.localStorage.myitems;
    if(!storedValues) {
      list.innerHTML = '';
    }
    else {
      list.innerHTML = storedValues;
    }
  }
  getValues();
})();

function close() {
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  span.className = "close";
  myNodelist[i].appendChild(span);
}
}

let addDate = document.getElementById("addDate");
addDate.addEventListener("click", setdate);

function setdate() {
  let month = document.getElementById("month");
let year = document.getElementById("year");
let day = document.getElementById("day"); 
var countDownDate = month.value + " " + day.value + ", " + year.value;
var countDownDate2 = new Date(countDownDate).getTime();
localStorage.setItem("countDowns",JSON.stringify(countDownDate2));
countDowns = localStorage.getItem("countDowns");
showDate();
}

function showDate() {

  var now = new Date().getTime();
 
  var distance = countDowns - now;
    
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  document.getElementById("demo").innerHTML = days + "d " + hours + "h ";
  
  if (distance < 0) {
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}