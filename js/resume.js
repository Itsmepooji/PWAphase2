var param;
var paramValue;
var query;
query=window.location.search.substring(1).split("?");
for(i in query){
  param=query[i].split("=");
  paramValue = parseInt(param[1]);
}
var request;

var idb=window.indexedDB || window.mozIndexedDB || window.msIndexedDB || window.webkitIndexedDB;
var open=idb.open("StoreData",1);
console.log("IndexedDB is created");
open.onupgradeneeded= function(event){
  var request=event.target.result;
   var storeDB =request.createObjectStore("Formdata",{keyPath:"id",autoIncrement:true});
}
open.onerror=function (error) {
  console.log("object store is not created"+error);
  }
open.onsuccess=function (event) {
  request=event.target.result;
  var transaction= request.transaction("Formdata","readwrite");
  var storeDB=transaction.objectStore("Formdata");
  var info=storeDB.get(paramValue);
  info.onsuccess=function (data) {
    console.log(data.target.result);
 display(data.target.result);
 resume(data.target.result);
  }
}
var left=document.querySelector(".left");
var right=document.querySelector(".right");
function display(data) {

  var img= document.createElement("img");
  img.src="profile.jpg";
  left.append(img);
  var h3=document.createElement("h3");
  h3.textContent=data.name;
  left.append(h3);
  var h4=document.createElement("h4");
  h4.textContent=data.email;
  left.append(h4);
  var h3=document.createElement("h3");
  h3.textContent=data.role;
  left.append(h3);
  var h3=document.createElement("h3");
  h3.textContent=data.phonenumber;
  left.append(h3);
}
function resume(data) {

  var h3=document.createElement("h3");
  h3.textContent="careerObjective";
  right.append(h3);
  var h6=document.createElement("h6");
  h6.textContent=data.career;
  right.append(h6);
  var h3=document.createElement("h3");
  h3.textContent="educationDetails";
  right.append(h3);
  var table=document.createElement('table');
  let row='';
  row+= "<tr>"+"<th>"+"college"+"</th>"+"<th>"+"degree"+"</th>"+"<th>"+"branch"+"</th>"+"<th>"+"marks"+"</th>"+"</tr>";
  for(i in data.education){
  row += "<tr>"+"<td>"+data.education[i].college+"</td>"+"<td>"+data.education[i].degree+"</td>"+"<td>"+data.education[i].branch+"</td>"+"<td>"+data.education[i].marks+"</td>"+"</tr>";
   }
table.innerHTML=row;
right.append(table);
// main.appendChild(right);
}
