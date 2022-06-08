const password = document.getElementById('password');
const confirmed = document.getElementById('confirm');

function compare() {
    if (password.value !== confirmed.value) {
        document.querySelector('.validation').style.visibility = 'visible';
    } else {
        document.querySelector('.validation').style.visibility = 'hidden';
    }
}
confirmed.addEventListener('keyup', compare);

