/* =========================================
   LOGIN
========================================= */

const openLogin = document.getElementById("openLogin");
const closeLogin = document.getElementById("closeLogin");
const loginOverlay = document.getElementById("loginOverlay");

/* =========================================
   BUKA LOGIN
========================================= */

if (openLogin && loginOverlay) {
  openLogin.addEventListener("click", function (event) {
    event.preventDefault();

    /* Animasi tombol */
    openLogin.classList.add("login-clicked");

    setTimeout(function () {
      openLogin.classList.remove("login-clicked");
    }, 200);

    /* Tampilkan login */
    setTimeout(function () {
      loginOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }, 250);
  });
}

/* =========================================
   TUTUP LOGIN
========================================= */

if (closeLogin && loginOverlay) {
  closeLogin.addEventListener("click", function () {
    loginOverlay.classList.remove("active");
    document.body.style.overflow = "";
  });
}

/* =========================================
   KLIK AREA GELAP
========================================= */

if (loginOverlay) {
  loginOverlay.addEventListener("click", function (event) {
    if (event.target === loginOverlay) {
      loginOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

/* =========================================
   TEKAN ESC
========================================= */

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    if (loginOverlay) {
      loginOverlay.classList.remove("active");
    }

    if (otpOverlay) {
      otpOverlay.classList.remove("active");
    }

    document.body.style.overflow = "";
  }
});

/* =========================================
   SUPABASE EMAIL OTP
========================================= */

const continueEmailBtn = document.getElementById("continueEmailBtn");

const loginEmail = document.getElementById("loginEmail");

const otpOverlay = document.getElementById("otpOverlay");

const otpEmail = document.getElementById("otpEmail");

const otpInput = document.getElementById("otpInput");

const verifyOtpBtn = document.getElementById("verifyOtpBtn");

const closeOtp = document.getElementById("closeOtp");

const otpMessage = document.getElementById("otpMessage");

const resendOtpBtn = document.getElementById("resendOtpBtn");

/* Email yang sedang melakukan verifikasi */

let currentOtpEmail = "";

/* =========================================
   FUNGSI KIRIM OTP
========================================= */

async function sendEmailOtp(email) {
  const { error } = await supabaseClient.auth.signInWithOtp({
    email: email,

    options: {
      shouldCreateUser: true,
    },
  });

  if (error) {
    throw error;
  }
}

/* =========================================
   CONTINUE WITH EMAIL
========================================= */

if (continueEmailBtn) {
  continueEmailBtn.addEventListener("click", async function () {
    const email = loginEmail.value.trim();

    /* Cek email kosong */

    if (email === "") {
      alert("Silakan masukkan email terlebih dahulu.");

      loginEmail.focus();

      return;
    }

    /* Cek format email */

    if (!loginEmail.checkValidity()) {
      alert("Silakan masukkan alamat email yang valid.");

      loginEmail.focus();

      return;
    }

    /* Simpan email */

    currentOtpEmail = email;

    /* Disable tombol sementara */

    continueEmailBtn.disabled = true;

    continueEmailBtn.textContent = "Mengirim kode...";

    try {
      /* Kirim OTP melalui Supabase */

      await sendEmailOtp(email);

      /* Tampilkan email di OTP */

      if (otpEmail) {
        otpEmail.textContent = email;
      }

      /* Kosongkan OTP sebelumnya */

      if (otpInput) {
        otpInput.value = "";
      }

      /* Bersihkan pesan */

      if (otpMessage) {
        otpMessage.textContent =
          "Kode OTP 6 digit telah dikirim ke email kamu.";
      }

      /* Tutup login */

      if (loginOverlay) {
        loginOverlay.classList.remove("active");
      }

      /* Buka OTP */

      if (otpOverlay) {
        otpOverlay.classList.add("active");
      }

      document.body.style.overflow = "hidden";

      /* Fokus ke OTP */

      if (otpInput) {
        setTimeout(function () {
          otpInput.focus();
        }, 300);
      }
    } catch (error) {
      console.error("Gagal mengirim OTP:", error);

      alert("Gagal mengirim kode OTP.\n\n" + error.message);
    } finally {
      continueEmailBtn.disabled = false;

      continueEmailBtn.textContent = "Continue with email";
    }
  });
}

/* =========================================
   VERIFIKASI OTP
========================================= */

if (verifyOtpBtn) {
  verifyOtpBtn.addEventListener("click", async function () {
    const token = otpInput.value.trim();

    /* Cek OTP */

    if (token === "") {
      if (otpMessage) {
        otpMessage.textContent = "Silakan masukkan kode OTP.";
      }

      otpInput.focus();

      return;
    }

    /* OTP harus 6 digit */

    if (!/^\d{6}$/.test(token)) {
      if (otpMessage) {
        otpMessage.textContent = "Kode OTP harus terdiri dari 6 angka.";
      }

      otpInput.focus();

      return;
    }

    /* Disable tombol */

    verifyOtpBtn.disabled = true;

    verifyOtpBtn.textContent = "Memverifikasi...";

    try {
      /* Verifikasi OTP */

      const { data, error } = await supabaseClient.auth.verifyOtp({
        email: currentOtpEmail,

        token: token,

        type: "email",
      });

      if (error) {
        throw error;
      }

      console.log("OTP berhasil diverifikasi:", data);

      // Simpan status login email
      if (data?.user) {
        localStorage.setItem(
          "emailUser",
          JSON.stringify({
            id: data.user.id,
            email: data.user.email,
          }),
        );

        localStorage.setItem("loginMethod", "email");
      }

      if (otpMessage) {
        otpMessage.textContent = "Login berhasil!";
      }

      /*
       * Beri sedikit waktu agar
       * pesan berhasil terlihat
       */

      setTimeout(function () {
        window.location.href = "pilih-role.html";
      }, 500);
    } catch (error) {
      console.error("Verifikasi OTP gagal:", error);

      if (otpMessage) {
        otpMessage.textContent = "Kode OTP salah atau sudah kedaluwarsa.";
      }

      otpInput.focus();
    } finally {
      verifyOtpBtn.disabled = false;

      verifyOtpBtn.textContent = "Verifikasi OTP";
    }
  });
}

/* =========================================
   TUTUP OTP
========================================= */

if (closeOtp && otpOverlay) {
  closeOtp.addEventListener("click", function () {
    otpOverlay.classList.remove("active");

    document.body.style.overflow = "";
  });
}

/* =========================================
   KLIK AREA GELAP OTP
========================================= */

if (otpOverlay) {
  otpOverlay.addEventListener("click", function (event) {
    if (event.target === otpOverlay) {
      otpOverlay.classList.remove("active");

      document.body.style.overflow = "";
    }
  });
}

/* =========================================
   KIRIM ULANG OTP
========================================= */

if (resendOtpBtn) {
  resendOtpBtn.addEventListener("click", async function () {
    if (!currentOtpEmail) {
      return;
    }

    resendOtpBtn.disabled = true;

    resendOtpBtn.textContent = "Mengirim...";

    try {
      await sendEmailOtp(currentOtpEmail);

      if (otpMessage) {
        otpMessage.textContent = "Kode OTP baru telah dikirim.";
      }

      if (otpInput) {
        otpInput.value = "";
        otpInput.focus();
      }
    } catch (error) {
      console.error("Gagal mengirim ulang OTP:", error);

      if (otpMessage) {
        otpMessage.textContent = "Gagal mengirim ulang OTP: " + error.message;
      }
    } finally {
      /*
       * Supabase memiliki pembatasan
       * pengiriman ulang email.
       */

      let countdown = 60;

      resendOtpBtn.textContent = "Kirim ulang (" + countdown + ")";

      const resendTimer = setInterval(function () {
        countdown--;

        resendOtpBtn.textContent = "Kirim ulang (" + countdown + ")";

        if (countdown <= 0) {
          clearInterval(resendTimer);

          resendOtpBtn.disabled = false;

          resendOtpBtn.textContent = "Kirim ulang kode";
        }
      }, 1000);
    }
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
  if (!window.google || !google.accounts || !google.accounts.oauth2) {
    console.error("Google Identity Services belum siap.");

    return;
  }

  googleTokenClient = google.accounts.oauth2.initTokenClient({
    client_id: GOOGLE_CLIENT_ID,

    scope: "openid email profile",

    callback: async function (response) {
      /* Login gagal */

      if (response.error) {
        console.error("Google login error:", response);

        return;
      }

      console.log("Google login berhasil!");

      try {
        /* =================================
                           AMBIL DATA USER GOOGLE
                        ================================= */

        const userResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: "Bearer " + response.access_token,
            },
          },
        );

        if (!userResponse.ok) {
          throw new Error("Gagal mengambil data user Google.");
        }

        const userData = await userResponse.json();

        console.log("Data user:", userData);

        /* =================================
                           SIMPAN DATA USER
                        ================================= */

        localStorage.setItem("googleUser", JSON.stringify(userData));

        /* =================================
                           PINDAH KE HALAMAN ROLE
                        ================================= */

        window.location.href = "pilih-role.html";
      } catch (error) {
        console.error("Terjadi kesalahan setelah login:", error);
      }
    },
  });
}

/* =========================================
   TOMBOL CONTINUE WITH GOOGLE
========================================= */

if (googleLoginBtn) {
  googleLoginBtn.addEventListener("click", function () {
    if (!googleTokenClient) {
      console.error("Google Token Client belum siap.");

      return;
    }

    googleTokenClient.requestAccessToken({
      prompt: "select_account",
    });
  });
}

/* =========================================
   TUNGGU GOOGLE IDENTITY SERVICES
========================================= */

if (window.google && google.accounts && google.accounts.oauth2) {
  initializeGoogleLogin();
} else {
  window.onGoogleLibraryLoad = initializeGoogleLogin;
}
