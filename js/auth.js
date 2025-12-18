document.addEventListener("DOMContentLoaded", () => {
    console.log("auth.js loaded");

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

    const API_BASE = "https://mini-project-backend-mam6.onrender.com";

    /* ---------- OPEN MODAL ---------- */
    loginBtn.addEventListener("click", () => {
        modal.style.display = "block";
        modalTitle.textContent = "Login";
        loginForm.style.display = "block";
        registerForm.style.display = "none";
    });

    /* ---------- CLOSE MODAL ---------- */
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // ❌ REMOVED modal click close (VERY IMPORTANT)

    modal.querySelector(".modal-content").addEventListener("click", e => {
        e.stopPropagation();
    });

    /* ---------- TOGGLE FORMS ---------- */
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

    /* ---------- MOBILE MENU ---------- */
    hamburger.addEventListener("click", () => {
        dropdownMenu.classList.toggle("show");
    });

    /* ---------- LOGIN ---------- */
    document.getElementById("loginSubmitBtn").addEventListener("click", async () => {
        const username = document.getElementById("loginUsername").value.trim();
        const password = document.getElementById("loginPassword").value.trim();

        if (!username || !password) {
            alert("Please enter username and password");
            return;
        }

        try {
            const res = await fetch(`${API_BASE}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message);
                return;
            }

            alert("Login successful");
            modal.style.display = "none";

        } catch (err) {
            alert("Login failed");
            console.error(err);
        }
    });

    /* ---------- REGISTER ---------- */
    document.getElementById("registerSubmitBtn").addEventListener("click", async () => {
        const username = document.getElementById("regUsername").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const password = document.getElementById("regPassword").value.trim();

        if (!username || !email || !password) {
            alert("Please fill all registration fields");
            return;
        }

        try {
            const res = await fetch(`${API_BASE}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message); // e.g. "Username or email already exists"
                return;
            }

            alert("Registration successful");
            registerForm.style.display = "none";
            loginForm.style.display = "block";
            modalTitle.textContent = "Login";

        } catch (err) {
            alert("Registration failed");
            console.error(err);
        }
    });
});
