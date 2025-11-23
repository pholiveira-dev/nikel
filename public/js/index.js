const myModal = new bootstrap.Modal(document.getElementById("registerModal"));
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

// Logar no sistema
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;
  const checkSession = document.getElementById("session-check").checked;

  const account = getAccount(email);

  if (!account) {
    alert("Opps! Verifique o usuário ou a senha.");
    return;
  }

  if (account.password !== password) {
    alert("Opps! Verifique o usuário ou a senha.");
    return;
  }

  saveSession(email, checkSession);

  window.location.href = "home.html";
});

// Criar conta
document.getElementById("create-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email-create-input").value;
  const password = document.getElementById("password-create-input").value;

  if (email.length < 5) {
    alert("Preencha o campo com um e-mail válido.");
    return;
  }

  if (password.length < 5) {
    alert("Preencha a senha com no mínimo 5 dígitos.");
    return;
  }

  saveAccount({
    login: email,
    password: password,
    transactions: [],
  });

  alert("Conta criada com sucesso!");
  myModal.hide();
});

// Verifica se já está logado
function checkLogged() {
  if (session) {
    sessionStorage.setItem("logged", session);
    logged = session;
  }

  if (logged) {
    window.location.href = "home.html";
  }
}

// Salvar conta no localStorage
function saveAccount(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}

// Salvar sessão
function saveSession(data, save) {
  sessionStorage.setItem("logged", data);

  if (save) {
    localStorage.setItem("session", data);
  }
}

// Buscar conta no localStorage
function getAccount(key) {
  const account = localStorage.getItem(key);
  if (account) {
    return JSON.parse(account);
  }
  return null;
}
