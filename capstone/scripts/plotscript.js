let span = document.getElementsByTagName('span');
const ele = document.getElementsByTagName('textarea');


// Here array.values() function is called.
let span2 = [];

let getTArea = () => {
  for (let i = 0; i <= ele.length - 1; i++) {
    if (ele[i].value != '')
      span[i].innerHTML += (ele[i].value);

  }
  span.join(', ');
  addText();
}

///localStorage.clear();

showNotes();
// If user adds a note, add it to the localStorage
let addBtn = document.querySelector('.comment-submit');
addBtn.addEventListener("click", addText);

function addText() {
  let addTxt = document.querySelector('.chtemp');
  let notes = localStorage.getItem("plotNotes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addTxt.innerHTML);
  localStorage.setItem("plotNotes", JSON.stringify(notesObj));

  //   console.log(notesObj);
  return showNotes();
}

// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("plotNotes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Plot Line ${index + 1}</h5>
                        <p class="card-text"> ${element}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
  });
  let notesElm = document.querySelector('.ch2');
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = ``;
  }
}

function deleteNote(index) {
  //   console.log("I am deleting", index);

  let notes = localStorage.getItem("plotNotes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("plotNotes", JSON.stringify(notesObj));
  showNotes();
}

function get() {

  let second = JSON.parse(localStorage.getItem("plotNotes"));
  let please = document.getElementById("displayChara");
  second.forEach(index => please.innerHTML += '<div class="noteCard my-2 mx-2 card" style="width: 18rem;"><div class ="card-body">' + index + '</div></div>');
}
