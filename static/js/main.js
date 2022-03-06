// main.js

"use strict";

var spinner = document.getElementById('spinner');
var com = document.getElementById('comunitats');
var prov = document.getElementById('provincies');
var mun = document.getElementById('municipis');
var tbody = document.getElementById('tbody');
var table = document.getElementById('table');

var url = [];

function getIframe(c){
  var iframe = `
  <iframe width="300" height="150" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?q=${c}&output=embed"></iframe>
  `;
  return iframe;
}

function get(s, is_list) {
  const xhttp = new XMLHttpRequest();
  
  s.innerHTML = '';
  s.style.display = 'none';
  table.style.display = 'none';
  
  xhttp.onreadystatechange = function(){
    if(xhttp.readyState == 4 && xhttp.status == 200){
      spinner.style.display = 'none';
      loadData(xhttp.responseText, s, is_list);
    } else {
      spinner.style.display = 'block';
    }
  };
  
  xhttp.open("GET", `http://localhost:3000/app/${url.join('/')}`, true);
  xhttp.send();
}

function loadData(resp, s, is_list){

  var data = JSON.parse(resp);
  console.log(data);
  
  if(is_list){
    var tr, td1, td2, td3, td4, a;

    tbody.innerHTML = '';
    data.forEach((x, i) => {
      tr = document.createElement('tr');
      td1 = document.createElement('td');
      td2 = document.createElement('td');
      td3 = document.createElement('td');
      td4 = document.createElement('td');
      a = document.createElement('a');

      td1.innerHTML = i;
      td2.innerHTML = x.municipi;
      td4.innerHTML = getIframe(x.municipi.toString().replace(/ /g,"_"));

      a.href = `https://ca.wikipedia.org/wiki/${x.municipi.toString().replace(/ /g,"_")}`;
      a.innerHTML = "Viquipedia";

      td3.appendChild(a);

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tbody.appendChild(tr);
    });

    table.style.display = 'block';

    return;
  }

  var option;

  option = document.createElement('option');
  option.innerHTML = "Escull una opció";
  option.value = "Escull una opció";
  option.setAttribute('selected', '');
  s.appendChild(option);
  
  for(var x in data){
    option = document.createElement('option');
    option.innerHTML = data[x].comunitat || data[x].provincia;
    option.value = data[x].comunitat || data[x].provincia;
    s.appendChild(option);
  }
  
  s.style.display = 'block';
}

function loadComunitats() { get(com, false); }

com.onchange = (e) => {mun

  if(e.target.value == "Escull una opció"){
    table.style.display = 'none';
    mun.style.display = 'none';
    prov.style.display = 'none';
    return; 
  }

  url = []
  url[0] = e.target.value;
  mun.style.display = 'none';
  get(prov, false);
}

prov.onchange = (e) => {
  if(e.target.value == "Escull una opció"){
    table.style.display = 'none';
    prov.style.display = 'none';
    return; 
  }

  url[1] = e.target.value;
  get(mun, true);
}


loadComunitats();






