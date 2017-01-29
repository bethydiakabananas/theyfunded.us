var data;
var entries = [];
var n;
var r, g, b;
var r1, g1, b1;

var l = 0;

// get the data. published by the NEA
function prepList() {
  var url = 'https://spreadsheets.google.com/feeds/list/1-tM404sCGoyRQYeUCge1qFpfRLt92lfuyYAA0ESN2O8/od6/public/values?alt=json';
  data = loadJSON(url);
  document.body.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
}

function setup() {
  getLines();
  noCanvas();
}

function draw() {}

function shuffle(array) {
  var current = array.length, tempValue, randomIndex;

  // while we're still shuffling elements
  while (0 !== current) {
    // pick remaining element
    randomIndex = Math.floor(Math.random() * current);
    current -= 1;

    // swap with current element
    tempValue = array[current];
    array[current] = array[randomIndex];
    array[randomIndex] = tempValue;
  }
  return array;
}

function getLines() {
  for (var i = 0; i < data.feed.entry.length; i++) {
    n = data.feed.entry.length;
    var line = data.feed.entry[i].title.$t + " in " + data.feed.entry[i].gsx$_cokwr.$t + ", " + data.feed.entry[i].gsx$_cpzh4.$t + ".";
    console.log(line);
    entries.push(line);
  }
  entries = shuffle(entries);
  emitEntries();
}

function emitEntries() {
  setInterval(function() {
    r1 = int(random(255));
    g1 = int(random(255));
    b1 = int(random(255));
    var p = document.createElement('p');
    p.style.color = 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')';
    p.textContent = entries[l];
    var items = document.getElementById('items');
    items.insertBefore(p, items.firstChild);
    l++;
    if (l > entries.length - 1) l = 0;
  }, 1200);
}