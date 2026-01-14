document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Obtenemos los valores de los inputs del HTML
        const usuarioInput = document.getElementById("usuario").value.trim();
        const passwordInput = document.getElementById("password").value.trim();

        removeError();

        // Validación básica en el cliente
        if (!usuarioInput || !passwordInput) {
            showError("Por favor, completa todos los campos.");
            return;
        }

        const loginButton = document.querySelector(".login-btn");
        loginButton.innerText = "Cargando...";
        loginButton.disabled = true;

        try {
            // 1. LLAMADA A LA API (Subdominio api.sagucre.upv.edu.es)
            const response = await fetch("https://api.sagucre.upv.edu.es/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    // IMPORTANTE: El backend espera 'username'
                    username: usuarioInput, 
                    password: passwordInput
                })
            });

            const data = await response.json();

            if (!response.ok) {
                // Si la API devuelve un error (ej. 401 Credenciales incorrectas)
                showError(data.message || "Usuario o contraseña incorrectos.");
                loginButton.innerText = "Login";
                loginButton.disabled = false;
                return;
            }

            // --- ÉXITO ---

            // 2. Guardar el Token JWT para futuras peticiones
            if (data.token) {
                localStorage.setItem("token", data.token);
            }

            // 3. Guardar el ID del usuario
            if (data.userId) {
                localStorage.setItem("userId", data.userId);
            }

            // 4. REDIRECCIÓN al index.html dentro de la carpeta dashboard
            window.location.href = "/dashboard/index.html";

        } catch (error) {
            console.error("Error en el login:", error);
            showError("Error de conexión con el servidor.");
            loginButton.innerText = "Login";
            loginButton.disabled = false;
        }
    });
});

// ------------------------------
// Funciones auxiliares
// ------------------------------

function showError(msg) {
    const box = document.querySelector(".login-box");
    
    // Evitar duplicados eliminando el error anterior si existe
    removeError();

    const error = document.createElement("p");
    error.classList.add("error-msg");
    error.innerText = msg;

    // Insertar el mensaje al principio del cuadro de login
    box.prepend(error);
}

function removeError() {
    const old = document.querySelector(".error-msg");
    if (old) old.remove();
}