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

const continueEmail = document.getElementById("continueEmail");

const loginEmail = document.getElementById("loginEmail");

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
/* =========================================
   GOOGLE LOGIN
========================================= */

const googleLoginBtn = document.getElementById("googleLoginBtn");

let googleTokenClient = null;

const GOOGLE_CLIENT_ID =
    "909297775425-p79llaju4h5qvrh728lm33633o6cbfir.apps.googleusercontent.com";


/* =========================================
   INISIALISASI GOOGLE
========================================= */

function initializeGoogleLogin() {

    if (
        !window.google ||
        !google.accounts ||
        !google.accounts.oauth2
    ) {
        console.error("Google Identity Services belum siap.");
        return;
    }

    googleTokenClient = google.accounts.oauth2.initTokenClient({

        client_id: GOOGLE_CLIENT_ID,

        scope: "openid email profile",

        callback: async function (response) {

            /* Jika login gagal */
            if (response.error) {
                console.error("Google login error:", response);
                return;
            }

            console.log("Google login berhasil!");

            try {

                /* =========================================
                   AMBIL DATA USER GOOGLE
                ========================================= */

                const userResponse = await fetch(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers: {
                            Authorization:
                                "Bearer " + response.access_token
                        }
                    }
                );

                if (!userResponse.ok) {
                    throw new Error("Gagal mengambil data user Google.");
                }

                const userData = await userResponse.json();

                console.log("Data user:", userData);


                /* =========================================
                   SIMPAN DATA USER
                ========================================= */

                localStorage.setItem(
                    "googleUser",
                    JSON.stringify(userData)
                );


                /* =========================================
                   PINDAH KE HALAMAN 3
                ========================================= */

                window.location.href = "pilih-role.html";

            } catch (error) {

                console.error(
                    "Terjadi kesalahan setelah login:",
                    error
                );

            }

        }

    });

}


/* =========================================
   TOMBOL CONTINUE WITH GOOGLE
========================================= */

if (googleLoginBtn) {

    googleLoginBtn.addEventListener("click", function () {

        if (!googleTokenClient) {

            console.error(
                "Google Token Client belum siap."
            );

            return;
        }

        googleTokenClient.requestAccessToken({

            /*
             * Meminta Google menampilkan
             * pilihan akun
             */
            prompt: "select_account"

        });

    });

}


/* =========================================
   TUNGGU GOOGLE IDENTITY SERVICES
========================================= */

if (
    window.google &&
    google.accounts &&
    google.accounts.oauth2
) {

    initializeGoogleLogin();

} else {

    window.onGoogleLibraryLoad = initializeGoogleLogin;

}
