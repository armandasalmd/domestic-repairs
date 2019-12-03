for (i = 0; i < document.getElementsByClassName('orderBtn').length; i++) {
    document.getElementsByClassName('orderBtn')[i].onclick = modal;
}

function modal(clicked) {
    let close = document.getElementById('close');
    let modalElem = document.getElementById('modal');
    let elemId = document.getElementById('orderId');
    if (!modalElem.classList.contains('d-modal')) {
        let orderId = clicked.target;
        orderId = orderId.parentElement.children[0].innerHTML.slice(10);
        elemId.value = orderId;
        elemId.innerHTML = orderId;
        elemId.textContent = orderId;
    }


    modalElem.classList.toggle('d-modal');
}