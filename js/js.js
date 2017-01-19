var formColors = document.forms.setColors;
var colorBtns = formColors.elements;
for (var i = 0, len = colorBtns.length; i < len; i++) {
	colorBtns[i].addEventListener("click", function (e) {
		e.preventDefault();
		popUp.dataset.s = this.dataset.s;
		if (popUp.dataset.s == "background-color") {
			bgSet.style.display = "block";
			changeBg();
			bgRadioBtns[0].checked = true;
		}
		else if (popUp.dataset.s == "color") {
			bgSet.style.display = "none";
			changeBg();
		}
		popUp.style.display = "flex";
	})
}
var popUp = document.querySelector(".popUp");
var popContent = document.querySelector(".popContent");
var colorSelect = document.getElementById("colorSelect");
var bgSet = document.getElementById("bgSet");
var bgForm = document.forms.bgForm;
var bgRadioBtns = bgForm.elements.bgSelect;
var myBg = document.getElementById("myBg");
var myBgLabel = document.getElementById("myBgLabel");
for (var i = 0, len = bgRadioBtns.length; i < len; i++) {
	bgRadioBtns[i].addEventListener("change", function (e) {
		popUp.dataset.s = this.value;
		changeBg(this.value);
	})
}
var colorBlocks = document.querySelectorAll(".color");

function changeBg(v) {
	if (v == "background-img") {
		myBgLabel.style.display = "inline-block";
		for (var i = 0, len = colorBlocks.length; i < len; i++) {
			colorBlocks[i].style.backgroundImage = "url(img/" + (i + 1) + ".jpg)";
		}
	}
	else {
		myBgLabel.style.display = "none";
		bgRadioBtns[0].checked = true;
		for (var i = 0, len = colorBlocks.length; i < len; i++) {
			colorBlocks[i].style.backgroundImage = "none";
		}
	}
}
// ******************************************* сделать функцию чендж myBg 
var userImg;
myBg.addEventListener("change", function (e) {
	userSrcGen(this);
})

function userSrcGen(t) {
	var wUrl = window.URL.createObjectURL;
	var src = "url(" + wUrl(t.files[0]) + ")";
    contentStyle("background-img", src);
    /*
    var file = t.files[0];
    var reader = new FileReader();
    reader.onload = function(){
       contentStyle("background-img", reader.result);
    }
	if(file){
        reader.readAsDataURL(file);
    } else {
        contentStyle("background-img", "");
    }
    */
}
popUp.addEventListener("click", function (e) {
	if (e.target == this) {
		popUp.style.display = "none";
	}
	else {
		if (e.target.className == "color") {
			if (popUp.dataset.s == "background-img") {
				contentStyle(this.dataset.s, e.target.style.backgroundImage);
			}
			else {
				contentStyle(this.dataset.s, e.target.style.backgroundColor);
			}
		}
	}
});
var loginBtn = document.getElementById("login");
var logoutBtn = document.getElementById("logout");
var loginModal = document.querySelector(".loginModal");
var userLoginBtn = document.getElementById("userLoginBtn");
var userLogin = document.getElementById("userLogin");
var userPassword = document.getElementById("userPassword");
var initEditor = document.getElementById("initEditor");
loginBtn.addEventListener("click", function (e) {
	loginModal.style.display = "flex";
});
var userL = "";
var userP = "";
userLoginBtn.addEventListener("click", function (e) {
	e.preventDefault();
	if (logValid()) {
		userL = userLogin.value;
		userP = userPassword.value;
		if (checkUser()) {
			alert("Log-in!");
			loginModal.style.display = "none";
			loginBtn.style.display = "none";
			logoutBtn.style.display = "inline-block";
		}
	}
});
// Валидация логина/пароля
function logValid() {
	var v = true;
	if (userLogin.value == "") {
		alert("Вы не ввели логин!");
		v = false;
	}
	else if (/\W/.test(userLogin.value)) {
		alert("Поле \"логин\" содержит запрещённые символы");
		v = false;
	}
	if (userPassword.value == "") {
		alert("Вы не ввели пароль!");
		v = false;
	}
	else if (/\W/.test(userPassword.value)) {
		alert("Поле \"пароль\" содержит запрещённые символы");
		v = false;
	}
	return v;
}
// проверка на админа
var contentBox = document.getElementById("contentBox");

function checkUser() {
	if (userL == "admin") {
		if (userP != "54587913") {
			alert("Не верный пароль!");
			return false;
		}
		else {
			initEditor.style.display = "block";
			contentBox.style.height = "90%";
			return true;
		}
	}
	else return true;
}
logoutBtn.addEventListener("click", function (e) {
		e.preventDefault();
		logOut();
	})
	// логаут...
function logOut() {
	loginModal.style.display = "none";
	loginBtn.style.display = "inline-block";
	logoutBtn.style.display = "none";
	contentBox.style.height = "100%";
	userL = "";
	userP = "";
	initEditor.style.display = "none";
	alert("Log-out");
}
//
var content = document.getElementById("content");

function contentStyle(s, c) {
	switch (s) {
	case "text-align":
		content.style.textAlign = c;
		break;
	case "font-size":
		content.style.fontSize = c;
		break;
	case "font-family":
		content.style.fontFamily = c;
		break;
	case "color":
		content.style.color = c;
		break;
	case "background-color":
		content.style.backgroundColor = c;
		content.style.backgroundImage = "none";
		break;
	case "background-img":
		content.style.backgroundImage = c;
		break;
	}
}

function toggleClass(c) {
	content.classList.toggle(c);
}
//
var form = document.forms.controls;
var fElements = form.elements;
for (var i = 0, len = fElements.length; i < len; i++) {
	if (fElements[i].dataset.t) {
		fElements[i].addEventListener("change", function () {
			contentStyle(this.name, this.value);
		});
	}
	else {
		fElements[i].addEventListener("click", function (e) {
			e.preventDefault();
			toggleClass(this.value);
			this.classList.toggle("active");
		})
	}
}
var mainTxt = document.getElementById("mainTxt");
var mainControls = document.querySelector(".mainControls");
var editControls = document.querySelector(".editControls");
var editBtn = document.getElementById("editBtn");
var backBtn = document.getElementById("backBtn");
var saveBtn = document.getElementById("saveBtn");
editBtn.addEventListener("click", function (e) {
	e.preventDefault();
	changeEdit();
	document.title = "editor";
});
backBtn.addEventListener("click", function (e) {
	e.preventDefault();
	changeBack();
	document.title = "Article";
});
saveBtn.addEventListener("click", function (e) {
	e.preventDefault();
	changeSave();
	document.title = "Article";
})

function changeEdit() {
	mainTxt.value = content.innerHTML;
	mainTxt.style.display = "block";
	content.style.display = "none";
	editControls.style.display = "flex";
	mainControls.style.display = "none";
}

function changeBack() {
	mainTxt.value = "";
	mainTxt.style.display = "none";
	content.style.display = "block";
	editControls.style.display = "none";
	mainControls.style.display = "flex";
}

function changeSave() {
	content.innerHTML = mainTxt.value;
	changeBack();
}
// лист
var radioList = document.getElementsByName("choiseList");
for (var i = 0, len = radioList.length; i < len; i++) {
	radioList[i].addEventListener("change", function (e) {
		var secretSpan = document.getElementById(this.value);
		if (this.value == "sUl") {
			var hiddenSpan = document.getElementById("sOl");
		}
		else {
			var hiddenSpan = document.getElementById("sUl");
		}
		var listItemsLabel = document.getElementById("listItemsLabel");
		listItemsLabel.style.display = "inline-block";
		
		secretSpan.style.display = "inline-block";
		hiddenSpan.style.display = "none";
	})
}
var editPopUp = document.getElementById("editPopUp");
var listCreate = document.getElementById("listCreate");
var tableCreate = document.getElementById("tableCreate");
var tableBtn = document.getElementById("tableBtn");
var listBtn = document.getElementById("listBtn");
tableBtn.addEventListener("click", function (e) {
	e.preventDefault();
	createEditPopUp(this);
});
listBtn.addEventListener("click", function (e) {
	e.preventDefault();
	createEditPopUp(this);
});
editPopUp.addEventListener("click", function (e) {
	if (e.target == this) {
		this.style.display = "none";
		for (var i = 0, len = this.children.length; i < len; i++) {
			this.children[i].style.display = "none";
		}
	}
})

function createEditPopUp(t) {
	editPopUp.style.display = "flex";
	var e = document.getElementById(t.dataset.c);
	e.style.display = "flex";
}
var liBtn = document.getElementById("liBtn");
var listItems = document.getElementById("listItems");
listItems.addEventListener("input",function(){
	checkVal(this);
})
liBtn.addEventListener("click", function (e) {
	e.preventDefault();
	if(valueValid([listItems])){
		mainTxt.value += createList(listItems.value);
	}
	
})

function createList(len) {
	var tag;
	var listStyle;
	if (radioList[0].checked) {
		tag = "ul";
	}
	else if (radioList[1].checked) {
		tag = "ol";
	}
	else {
		return false;
	}
	listStyle = document.getElementById(tag).value;
	var fullTag = "<" + tag + " class=\"" + listStyle + "\">";
	for (var i = 0; i < len; i++) {
		fullTag += "<li>" + "list item " + (i + 1) + "</li>";
	}
	fullTag += "<" + tag + ">";
	return fullTag;
}
/// table
var tableCreate = document.forms.tableCreate;
var tableConfigs = tableCreate.elements;
var inputsArr = [];
for (var i = 0, len = tableConfigs.length; i < len; i++) {
	if (tableConfigs[i].type == "text") {
		inputsArr.push(tableConfigs[i]);
		tableConfigs[i].addEventListener("change", function () {
			checkVal(this);
		});
	}
	else if (tableConfigs[i].type == "select-one") {}
	else if (tableConfigs[i].type == "submit") {
		if (tableConfigs[i].value == "clear") {
			tableConfigs[i].addEventListener("click", function (e) {
				e.preventDefault();
				for (var i = 0, len = inputsArr.length; i < len; i++) {
					inputsArr[i].value = "";
					checkVal(inputsArr[i]);
				}
			})
		}
		else if (tableConfigs[i].value == "create") {
			tableConfigs[i].addEventListener("click", function (e) {
				e.preventDefault();
				if(valueValid(inputsArr)){
					createTable ();
				}
			})
		}
	}
}
//
function checkVal(e) {
	if (e.value == "" || e.value < 1 || isNaN(e.value) || e.value > +e.dataset.m) {
		e.style.border = "2px solid red";
		e.placeholder = "";
	}
	else {
		e.style.border = "2px solid green";
	}
}
// проверка значений всех инпутов
function valueValid(inputs) {
	var j = true;
	for (var i = 0, len = inputs.length; i < len; i++) {
		checkVal(inputs[i]);
		if (inputs[i].style.border != "2px solid green") {
			j = false;
		}
	}
	return j;
}
var bColor = document.getElementById("bColor");
function createTable (){
	var table = "<table border=\""+inputsArr[3].value+"\" style=\"width:"+inputsArr[1].value+"px;height:"+inputsArr[5].value+"px;border:"+inputsArr[3].value+"px solid "+bColor.value+";\" cellspacing=\""+inputsArr[2].value+"\">";
	
	for(var i = 0,len = +inputsArr[0].value;i<len;i++){
		table += "<tr>";
		for(var j = 0,leng = +inputsArr[4].value;j<leng;j++ ){
			table+= "<td>"+i+j+"</td>";
		}
		table += "</tr>";
	}
	table += "</table>";
	mainTxt.value += table;
}


function dragEnter(e){
    if(initEditor.style.display == "block"){
        this.classList.add("userImg");
    }
    
}
function dragLeave(e){
//    this.classList.remove("userImg");
}
function drop(e){
    if(initEditor.style.display == "block"){
        e.preventDefault();
    e.stopPropagation();
    var file = e.dataTransfer.files[0];
    var src = window.URL.createObjectURL(file);
    this.style.backgroundImage = "url("+src+")";
    console.log(src);
    this.classList.remove("userImg");
    return false;
    }
    
}
function dragOver(e){
    if(initEditor.style.display == "block"){
       if(e.preventDefault){
        e.preventDefault();
    }
    // перечитать!!
    e.dataTransfer.dropEffect = "move";
    return false; 
    }
    
}
function dragEnd(e){
    if(initEditor.style.display == "block"){
        content.classList.remove("userImg");
    }
    
}
content.addEventListener("dragenter", dragEnter,true);
content.addEventListener("dragleave", dragLeave, false);
content.addEventListener("drop", drop, false);
content.addEventListener("dragover", dragOver, true);
content.addEventListener("dragend", dragEnd, false);

var closeLog = document.querySelector(".closeLog");
closeLog.addEventListener("click",function(e){
	loginModal.style.display = "none";
})