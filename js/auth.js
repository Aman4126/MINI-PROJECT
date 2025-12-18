document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("loginModal");
    const loginBtn = document.getElementById("loginBtn");
    const closeModal = document.getElementById("closeModal");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const hamburger = document.getElementById("hamburger");

    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const modalTitle = document.getElementById("modalTitle");
    const toggleForm = document.getElementById("toggleForm");
    const toggleToLogin = document.getElementById("toggleToLogin");

    // OPEN MODAL
    loginBtn.addEventListener("click", () => {
        modal.style.display = "block";
        modalTitle.textContent = "Login";
        loginForm.style.display = "block";
        registerForm.style.display = "none";
    });

    // CLOSE MODAL
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    modal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    modal.querySelector(".modal-content").addEventListener("click", e => {
        e.stopPropagation();
    });

    // TOGGLE FORMS
    toggleForm.addEventListener("click", () => {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
        modalTitle.textContent = "Register";
    });

    toggleToLogin.addEventListener("click", () => {
        registerForm.style.display = "none";
        loginForm.style.display = "block";
        modalTitle.textContent = "Login";
    });

    // MOBILE MENU
    hamburger.addEventListener("click", () => {
        dropdownMenu.classList.toggle("show");
    });

    // LOGIN
    document.getElementById("loginSubmitBtn").addEventListener("click", () => {
        const username = document.getElementById("loginUsername").value.trim();
        const password = document.getElementById("loginPassword").value.trim();

        if (!username || !password) {
            alert("Please enter username and password");
            return;
        }

          fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
    })
    .catch(err => {
        alert("Login failed");
        console.error(err);
    }); 
    });
     // REGISTER
    document.getElementById("registerSubmitBtn").addEventListener("click", () => {
        const username = document.getElementById("regUsername").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const password = document.getElementById("regPassword").value.trim();

        if (!username || !email || !password) {
            alert("Please fill all registration fields");
            return;
        }

    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
    })
    .then(async res => {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
})
.then(data => {
  alert(data.message);
})
.catch(err => {
  alert(err.message);
});
    .catch(err => {
        alert("Registration failed");
        console.error(err);
    });
});
});
