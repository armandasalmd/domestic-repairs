var input1 = document.getElementById('confPass');
var input2 = document.getElementById('newPass');
var passMsg = document.getElementById('p-msg');
var btn = document.getElementById('submit');

input1.oninput = validate;
input2.oninput = validate;

function validate() {
	
	if(input1.value.length < 4 || input2.value.length < 4) {
		btn.setAttribute("disabled", true);
		btn.setAttribute("class", "disabled");
		passMsg.classList.remove('d-none');
		passMsg.innerHTML = "Passwords must be longer than 4 digits!";
	}
	else if(input1.value != input2.value) {
		btn.setAttribute("disabled", true);
		btn.setAttribute("class", "disabled");
		passMsg.classList.remove('d-none');
		passMsg.innerHTML = "Passwords do not match!";
	}
	else {
		btn.removeAttribute("disabled");
		btn.removeAttribute("class");
		passMsg.classList.add('d-none');
	}
}