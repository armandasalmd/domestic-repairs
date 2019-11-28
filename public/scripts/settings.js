function MyFun() {
    var a = document.getElementById("passwords").value;
    var b = document.getElementById("passwordss").value;

    if (a == "") {
        document.getElementById("messages").innerHTML = "** Please Fill Password";
        return false;
    }
    if (a.length < 5) {
        document.getElementById("messages").innerHTML = "**password length must be greater then 5 characters";
        return false;
    }
    if (a.length > 25) {
        document.getElementById("messages").innerHTML = "Password length must be smaller then 25 characters";
        return false;
    }

    if (a != b) {
        document.getElementById("messages").innerHTML = "Password are not same";
        return false;
    }
}