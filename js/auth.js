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

loginBtn.onclick = () => {
    modal.style.display = "block";
    modalTitle.textContent = "Login";
    loginForm.style.display = "block";
    registerForm.style.display = "none";
};

closeModal.onclick = () => modal.style.display = "none";
modal.onclick = () => modal.style.display = "none";
modal.querySelector(".modal-content").onclick = e => e.stopPropagation();

toggleForm.onclick = () => {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    modalTitle.textContent = "Register";
};

toggleToLogin.onclick = () => {
    registerForm.style.display = "none";
    loginForm.style.display = "block";
    modalTitle.textContent = "Login";
};

hamburger.onclick = () => dropdownMenu.classList.toggle("show");

document.getElementById("loginSubmitBtn").onclick = () => {
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!username || !password) {
        alert("Please enter username and password");
        return;
    }

    console.log("LOGIN:", { username, password });
};

document.getElementById("registerSubmitBtn").onclick = () => {
    const username = document.getElementById("regUsername").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value.trim();

    if (!username || !email || !password) {
        alert("Please fill all registration fields");
        return;
    }

    console.log("REGISTER:", { username, email, password });
};
