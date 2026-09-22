/* =========================================
   USER PROFILE - HALAMAN 3
========================================= */


/* =========================================
   AMBIL ELEMENT HTML
========================================= */

const profilePhoto =
  document.getElementById("profilePhoto");

const userInitial =
  document.getElementById("userInitial");

const userPhoto =
  document.getElementById("userPhoto");

const profileUpload =
  document.getElementById("profileUpload");

const userRoleText =
  document.getElementById("userRoleText");


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

const profileGoogleUser =
  localStorage.getItem("googleUser");

const profileLoginEmail =
  localStorage.getItem("loginEmail");


let profileUserName = "User";

let profileUserEmail = "";

let profileGooglePhoto = "";


/* =========================================
   LOGIN GOOGLE
========================================= */

if (profileGoogleUser) {

  try {

    const googleData =
      JSON.parse(profileGoogleUser);

    profileUserName =
      googleData.name || "User";

    profileUserEmail =
      googleData.email || "";

    profileGooglePhoto =
      googleData.picture || "";

  } catch (error) {

    console.error(
      "Data Google tidak valid:",
      error
    );

  }

}


/* =========================================
   LOGIN EMAIL
========================================= */

else if (profileLoginEmail) {

  profileUserEmail =
    profileLoginEmail;

  profileUserName =
    profileLoginEmail.split("@")[0];

}


/* =========================================
   ROLE USER
========================================= */

const profileUserRole =
  localStorage.getItem("userRole");


if (userRoleText) {

  if (profileUserRole === "driver") {

    userRoleText.textContent =
      "DRIVER";

  } else {

    userRoleText.textContent =
      "PENGGUNA";

  }

}


/* =========================================
   KEY FOTO KHUSUS USER
========================================= */

/*
 * Setiap user mempunyai key berbeda
 * berdasarkan email login.
 *
 * Contoh:
 *
 * profilePhoto_ariksakha53@gmail.com
 * profilePhoto_driver@gmail.com
 */

const profileUserKey =
  profileUserEmail
    .toLowerCase()
    .trim();


const profilePhotoKey =
  "profilePhoto_" + profileUserKey;


/* =========================================
   AMBIL FOTO USER
========================================= */

const savedProfilePhoto =
  localStorage.getItem(
    profilePhotoKey
  );


/* =========================================
   TAMPILKAN FOTO
========================================= */


/*
 * PRIORITAS 1
 * Foto yang pernah di-upload user
 */

if (savedProfilePhoto) {

  if (profilePhoto) {

    profilePhoto.src =
      savedProfilePhoto;

    profilePhoto.style.display =
      "block";

  }


  if (userInitial) {

    userInitial.style.display =
      "none";

  }

}


/*
 * PRIORITAS 2
 * Foto Google
 */

else if (profileGooglePhoto) {

  if (profilePhoto) {

    profilePhoto.src =
      profileGooglePhoto;

    profilePhoto.style.display =
      "block";

  }


  if (userInitial) {

    userInitial.style.display =
      "none";

  }

}


/*
 * PRIORITAS 3
 * Huruf awal user
 */

else {

  if (profilePhoto) {

    profilePhoto.style.display =
      "none";

  }


  if (userInitial) {

    userInitial.textContent =
      profileUserName
        .charAt(0)
        .toUpperCase();

    userInitial.style.display =
      "block";

  }

}


/* =========================================
   KLIK FOTO
   BUKA FILE EXPLORER
========================================= */

if (
  userPhoto &&
  profileUpload
) {

  userPhoto.addEventListener(
    "click",
    function () {

      profileUpload.click();

    }
  );

}


/* =========================================
   UPLOAD FOTO
========================================= */

if (profileUpload) {

  profileUpload.addEventListener(
    "change",
    function () {

      const file =
        this.files[0];


      /* Tidak ada file */

      if (!file) {

        return;

      }


      /* =====================================
         CEK FILE
      ====================================== */

      if (
        !file.type.startsWith("image/")
      ) {

        alert(
          "File yang dipilih harus berupa gambar."
        );

        this.value = "";

        return;

      }


      /* =====================================
         BATASI UKURAN
      ====================================== */

      const maxSize =
        5 * 1024 * 1024;


      if (file.size > maxSize) {

        alert(
          "Ukuran foto maksimal 5 MB."
        );

        this.value = "";

        return;

      }


      /* =====================================
         BACA FOTO
      ====================================== */

      const reader =
        new FileReader();


      reader.onload =
        function (event) {

          const imageData =
            event.target.result;


          /* =================================
             SIMPAN FOTO KHUSUS USER
          ================================= */

          try {

            localStorage.setItem(
              profilePhotoKey,
              imageData
            );

          } catch (error) {

            console.error(
              "Gagal menyimpan foto:",
              error
            );

            alert(
              "Foto terlalu besar untuk disimpan di browser."
            );

            return;

          }


          /* =================================
             TAMPILKAN FOTO
          ================================= */

          if (profilePhoto) {

            profilePhoto.src =
              imageData;

            profilePhoto.style.display =
              "block";

          }


          /* =================================
             HILANGKAN HURUF
          ================================= */

          if (userInitial) {

            userInitial.style.display =
              "none";

          }


          console.log(
            "Foto berhasil disimpan untuk:",
            profileUserEmail
          );

        };


      reader.onerror =
        function () {

          alert(
            "Gagal membaca file foto."
          );

        };


      reader.readAsDataURL(file);

    }
  );

}


/* =========================================
   HOVER / CURSOR
========================================= */

if (userPhoto) {

  userPhoto.style.cursor =
    "pointer";

}