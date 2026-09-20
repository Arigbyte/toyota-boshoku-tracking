/* =========================================
   USER PROFILE - HALAMAN 3
========================================= */

/* =========================================
   AMBIL ELEMENT HTML
========================================= */

const profilePhoto = document.getElementById("profilePhoto");

const userInitial = document.getElementById("userInitial");

const userPhoto = document.getElementById("userPhoto");

const profileUpload = document.getElementById("profileUpload");

const userRoleText = document.getElementById("userRoleText");

/* =========================================
   CEK ELEMENT
========================================= */

if (!userPhoto) {
  console.error("Element #userPhoto tidak ditemukan.");
}

if (!profileUpload) {
  console.error("Element #profileUpload tidak ditemukan.");
}

/* =========================================
   AMBIL DATA LOGIN
========================================= */

/*
 * Nama variabel dibuat berbeda supaya
 * tidak bentrok dengan JavaScript inline
 * yang ada di halaman3.html.
 */

const profileGoogleUser = localStorage.getItem("googleUser");

const profileLoginEmail = localStorage.getItem("loginEmail");

let profileUserName = "User";

let profileUserEmail = "";

let profileGooglePhoto = "";

/* =========================================
   LOGIN GOOGLE
========================================= */

if (profileGoogleUser) {
  try {
    const googleData = JSON.parse(profileGoogleUser);

    profileUserName = googleData.name || "User";

    profileUserEmail = googleData.email || "";

    profileGooglePhoto = googleData.picture || "";
  } catch (error) {
    console.error("Data Google tidak valid:", error);
  }
} else if (profileLoginEmail) {

/* =========================================
   LOGIN EMAIL
========================================= */
  profileUserEmail = profileLoginEmail;

  profileUserName = profileLoginEmail.split("@")[0];
}

/* =========================================
   ROLE USER
========================================= */

const profileUserRole = localStorage.getItem("userRole");

if (userRoleText) {
  if (profileUserRole === "driver") {
    userRoleText.textContent = "DRIVER";
  } else {
    userRoleText.textContent = "PENGGUNA";
  }
}

/* =========================================
   FOTO YANG SUDAH DIUPLOAD
========================================= */

const savedProfilePhoto = localStorage.getItem("profilePhoto");

/* =========================================
   TAMPILKAN FOTO
========================================= */

if (savedProfilePhoto) {
  /*
   * Prioritas pertama:
   * foto yang pernah diupload user.
   */

  if (profilePhoto) {
    profilePhoto.src = savedProfilePhoto;

    profilePhoto.style.display = "block";
  }

  if (userInitial) {
    userInitial.style.display = "none";
  }
} else if (profileGooglePhoto) {

/* =========================================
   KALAU BELUM ADA FOTO UPLOAD
   GUNAKAN FOTO GOOGLE
========================================= */
  if (profilePhoto) {
    profilePhoto.src = profileGooglePhoto;

    profilePhoto.style.display = "block";
  }

  if (userInitial) {
    userInitial.style.display = "none";
  }
} else {

/* =========================================
   KALAU TIDAK ADA FOTO
========================================= */
  if (userInitial) {
    userInitial.textContent = profileUserName.charAt(0).toUpperCase();

    userInitial.style.display = "block";
  }
}

/* =========================================
   KLIK FOTO
   BUKA FILE EXPLORER
========================================= */

if (userPhoto && profileUpload) {
  userPhoto.addEventListener("click", function () {
    profileUpload.click();
  });
}

/* =========================================
   UPLOAD FOTO
========================================= */

if (profileUpload) {
  profileUpload.addEventListener("change", function () {
    const file = this.files[0];

    /* Tidak ada file */

    if (!file) {
      return;
    }

    /* =====================================
               CEK FILE
            ====================================== */

    if (!file.type.startsWith("image/")) {
      alert("File yang dipilih harus berupa gambar.");

      this.value = "";

      return;
    }

    /* =====================================
               BATASI UKURAN
            ====================================== */

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("Ukuran foto maksimal 5 MB.");

      this.value = "";

      return;
    }

    /* =====================================
               BACA FOTO
            ====================================== */

    const reader = new FileReader();

    reader.onload = function (event) {
      const imageData = event.target.result;

      /* =================================
                       SIMPAN FOTO
                    ================================= */

      try {
        localStorage.setItem("profilePhoto", imageData);
      } catch (error) {
        console.error("Gagal menyimpan foto:", error);

        alert("Foto terlalu besar untuk disimpan di browser.");

        return;
      }

      /* =================================
                       TAMPILKAN FOTO
                    ================================= */

      if (profilePhoto) {
        profilePhoto.src = imageData;

        profilePhoto.style.display = "block";
      }

      if (userInitial) {
        userInitial.style.display = "none";
      }

      console.log("Foto berhasil diupload.");
    };

    reader.onerror = function () {
      alert("Gagal membaca file foto.");
    };

    reader.readAsDataURL(file);
  });
}

/* =========================================
   HOVER / CURSOR
========================================= */

if (userPhoto) {
  userPhoto.style.cursor = "pointer";
}
