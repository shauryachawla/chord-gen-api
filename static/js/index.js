var counter = 0;
var urls;

var var_map = {
  'Major': '',
  'Minor': 'm',
  'Augmented': 'aug',
  'Diminished': 'dim',
  'Seventh': '7',
  'MajorSeventh': 'maj7',
  'MinorSeventh': 'min7',
  'Sus2': 'sus2',
  'Sus4': 'sus4',
  'MinorMajorSeventh': 'minMaj7',
  'DiminishedSeventh': 'dim7',
  'MajorNinth': '9',
  'MinorNinth': 'm9',
  'AddNinth': 'add9',
  'AddEleventh': 'add11',
  'MinorSixth': 'm6',
  'MajorSixth': '6',
  'AddSixthAddNinth': '6/9'
}

document.querySelectorAll('.dropdown').forEach(item => {
  item.addEventListener('click', function (event) {
    event.stopPropagation();
    item.classList.toggle('is-active');
  });
});

function counterplus() {
  if (counter == urls.length - 1) counter = 0;
  else counter++;
  updateImage(counter);
}

function counterminus() {
  if (counter == 0) counter = urls.length - 1;
  else counter--;
  updateImage(counter);
}

function generate() {
  counter = 0;
  let note = document.getElementById("note-select").value;
  let variation = document.getElementById("variation-select").value;

  if (note == "" || variation == "") {
    alert("Values can't be null");
    return;
  }

  var structures = file_se_nikalo_arrays(note, variation)
  var array_to_url_mapper = (structure) => {
    return 'https://chordgenerator.net/' + note.replace("Sharp", "%23") + var_map[variation] + '.png?p=' + convertStructureToString(structure) + '&s=100';
  }
  urls = structures.map(s => array_to_url_mapper(s))
  // console.log(urls);
  updateImage(counter);
}

function updateImage(index) {
  document.getElementById("myImage").setAttribute("src", urls[index]);
}

function convertStructureToString(structure) {
  let txt = "";
  structure.forEach((fret) => {
    if (fret == -1) fret = 'x';
    txt += fret
  });
  // console.log(txt);
  return txt;
}

function file_se_nikalo_arrays(note, variation) {
  var request = new XMLHttpRequest();
  request.open("GET", "./static/jsons/out.json", false);
  request.send(null)
  var my_JSON_object = JSON.parse(request.responseText);
  return my_JSON_object[note][variation];
}

const getGeneratedChordImage = async (note, variation) => {
  // alert("Calling: " + 'http://127.0.0.1:5000/getChord?note=' + note + '&variation=' + variation)
  const response = await fetch('http://127.0.0.1:5000/getChord?note=' + note + '&variation=' + variation);
  // const myJson = await response.json(); //extract JSON from the http response
  // do something with myJson
  return response.blob
}

