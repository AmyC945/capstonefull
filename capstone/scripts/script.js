

function capFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateName() {
  var partOne = ["meadow", "stones", "news", "bar", "alcomb", "harth", "glae", "sher", "farn", "saxon"];

  var partTwo = ["glen", "dale", "way", "bury", "hill", "ness", "worth", "sby", "wick", "more"];

  var name = capFirst(
    partOne[getRandomInt(0, partOne.length)]
    + partTwo[getRandomInt(0, partTwo.length)]);
  document.getElementById("random_name").innerHTML = name;
}

// Gets a random element from an array
function randFrom(array) {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}


function getOption() {
  element1 = document.querySelector('#select1');
  element2 = document.querySelector('#select2');
  language = element1.value;
  names = element2.value;

  loadJSON("https://www.behindthename.com/api/random.json?usage=" + language + "&gender=" + names + "&number=1&key=am867801990", myData, 'jsonp');
}


function loadJSON(path, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        success(JSON.parse(xhr.responseText));
      }
      else {
        error(xhr);
      }
    }
  };
  xhr.open('GET', path, true);
  xhr.send();
}

function myData(Data) {
  const json = JSON.stringify(Data);
  const obj = JSON.parse(json);

  document.querySelector('.output').innerHTML = obj.names;

}

//

showNotes();
// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", addText);

function addText() {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  //   console.log(notesObj);
  showNotes();
}

// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
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
                        <h5 class="card-title">Note ${index + 1}</h5>
                        <p class="card-text"> ${element}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Please add notes!`;
  }
}

function deleteNote(index) {
  //   console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

function editNote(index) {
  //   console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let ch = document.getElementById("change");
  ch.innerHTML = "sdgdsg";
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

(function () {

  var list = document.querySelector('#list'),
    form = document.querySelector('form'),
    item = document.querySelector('#item');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    list.innerHTML += '<li>' + item.value + '</li>';
    store();
    item.value = "";
  }, false)

  list.addEventListener('click', function (e) {
    var t = e.target;
    if (t.classList.contains('checked')) {
      t.parentNode.removeChild(t);
    } else {
      t.classList.add('checked');
    }
    store();
  }, false)

  function store() {
    window.localStorage.myitems = list.innerHTML;
  }

  function getValues() {
    var storedValues = window.localStorage.myitems;
    if (!storedValues) {
      list.innerHTML = '<li>Make a to do list</li>' +
        '<li>Check off first thing on the to do list</li>' +
        '<li>Realize you have already accomplished 2 things in the list</li>' +
        '<li>Reward yourself with a nap</li>';
    }
    else {
      list.innerHTML = storedValues;
    }
  }
  getValues();
})();