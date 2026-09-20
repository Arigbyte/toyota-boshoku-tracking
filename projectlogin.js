/* =========================================
   LOGIN
========================================= */

const openLogin = document.getElementById("openLogin");
const closeLogin = document.getElementById("closeLogin");
const loginOverlay = document.getElementById("loginOverlay");


// BUKA LOGIN
if (openLogin) {

const openLogin = document.getElementById("openLogin");
const closeLogin = document.getElementById("closeLogin");
const loginOverlay = document.getElementById("loginOverlay");


/* =========================================
   BUKA LOGIN
========================================= */

openLogin.addEventListener("click", function (event) {

    event.preventDefault();

    /* Animasi tombol */
    openLogin.classList.add("login-clicked");

    /* Tunggu sedikit */
    setTimeout(function () {

        openLogin.classList.remove("login-clicked");

    }, 200);


    /* Munculkan login setelah sedikit delay */
    setTimeout(function () {

        loginOverlay.classList.add("active");

    }, 250);

});


/* =========================================
   TUTUP LOGIN
========================================= */

closeLogin.addEventListener("click", function () {

    loginOverlay.classList.remove("active");

});

}


// TUTUP LOGIN
if (closeLogin) {

    closeLogin.addEventListener("click", function () {

        loginOverlay.classList.remove("active");

        document.body.style.overflow = "";

    });

}


// KLIK AREA GELAP UNTUK MENUTUP
loginOverlay.addEventListener("click", function (event) {

    if (event.target === loginOverlay) {

        loginOverlay.classList.remove("active");

        document.body.style.overflow = "";

    }

});


// TEKAN ESC UNTUK MENUTUP
document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        loginOverlay.classList.remove("active");

        document.body.style.overflow = "";

    }

});


// =========================================
// CONTINUE WITH EMAIL
// =========================================

const continueEmail =
    document.getElementById("continueEmail");

const loginEmail =
    document.getElementById("loginEmail");


if (continueEmail) {

    continueEmail.addEventListener("click", function () {

        const email = loginEmail.value.trim();

        if (email === "") {

            alert("Silakan masukkan email terlebih dahulu.");

            loginEmail.focus();

            return;

        }

        if (!loginEmail.checkValidity()) {

            alert("Silakan masukkan alamat email yang valid.");

            loginEmail.focus();

            return;

        }

        alert("Email berhasil dimasukkan: " + email);

    });

}