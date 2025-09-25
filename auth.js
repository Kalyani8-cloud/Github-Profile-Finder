function toggleForms(type) {
  document.getElementById('signInBox').classList.add('hidden');
  document.getElementById('signUpBox').classList.add('hidden');
  if (type === 'signup') {
    document.getElementById('signUpBox').classList.remove('hidden');
  } else {
    document.getElementById('signInBox').classList.remove('hidden');
  }
}

function signUp() {
  const username = document.getElementById('signupUsername').value;
  const password = document.getElementById('signupPassword').value;

  if (!username || !password) {
    document.getElementById('loginError').textContent = "⚠️ Enter username & password!";
    return;
  }

  localStorage.setItem('user', JSON.stringify({ username, password }));
  alert("✅ Account created! Please Sign In.");
  toggleForms('signin');
}

function signIn() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.username === username && user.password === password) {
    alert("🎉 Login successful!");
    window.location.href = "index.html";
  } else {
    document.getElementById('loginError').textContent = "❌ Invalid credentials!";
  }
}
