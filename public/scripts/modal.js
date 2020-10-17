for (let i = 0; i < document.getElementsByClassName('orderBtn').length; i++) {
	document.getElementsByClassName('orderBtn')[i].onclick = modal;
}

function modal(clicked) {
	const close = document.getElementById('close');
	const modalElem = document.getElementById('modal');
	const elemId = document.getElementById('orderId');
	if (!modalElem.classList.contains('d-modal')) {
		let orderId = clicked.target;
		orderId = orderId.parentElement.children[0].innerHTML.slice(10);
		elemId.value = orderId;
		elemId.innerHTML = orderId;
		elemId.textContent = orderId;
	}

	modalElem.classList.toggle('d-modal');
}
