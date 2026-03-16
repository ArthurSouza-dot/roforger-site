// site/js/auth.js — Helpers de auth para o site GitHub Pages

// Envia token de volta ao Electron via deep link
async function sendTokenToElectron(user) {
  const token = await user.getIdToken();
  const userData = JSON.stringify({
    uid:         user.uid,
    email:       user.email,
    displayName: user.displayName || user.email.split('@')[0],
    photoURL:    user.photoURL,
    token,
  });
  const encoded = encodeURIComponent(userData);
  // Tenta deep link roforger://
  window.location.href = `roforger://auth?data=${encoded}`;
  // Mostra tela de sucesso após 500ms
  setTimeout(() => showSuccess(user), 500);
}

function showSuccess(user) {
  document.getElementById('auth-form').style.display     = 'none';
  document.getElementById('success-screen').style.display = 'block';
  const nameEl = document.getElementById('success-name');
  if (nameEl) nameEl.textContent = user.displayName || user.email;
}
