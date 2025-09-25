async function fetchProfile() {
  const username = document.getElementById('username').value;
  const profileDiv = document.getElementById('profile');
  const loadingSpinner = document.getElementById('loading');
  const errorMsg = document.getElementById('error');

  // Reset UI
  profileDiv.style.display = "none";
  errorMsg.textContent = "";

  if (!username) {
    errorMsg.textContent = "⚠️ Please enter a GitHub username!";
    return;
  }

  loadingSpinner.style.display = "block";

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) throw new Error("User not found");

    const data = await response.json();

    profileDiv.innerHTML = `
      <img src="${data.avatar_url}" alt="${data.login}">
      <h2>${data.login}</h2>
      <p>${data.bio ? data.bio : "No bio available"}</p>
      <p><b>Location:</b> ${data.location ? data.location : "Not specified"}</p>
      <p><b>Company:</b> ${data.company ? data.company : "Not specified"}</p>
      <p><b>Twitter:</b> ${data.twitter_username ? data.twitter_username : "Not available"}</p>
      <p><b>Member since:</b> ${new Date(data.created_at).toLocaleDateString()}</p>

      <div class="profile-stats">
        <div class="stat"><h3>${data.public_repos}</h3><p>Repos</p></div>
        <div class="stat"><h3>${data.followers}</h3><p>Followers</p></div>
        <div class="stat"><h3>${data.following}</h3><p>Following</p></div>
      </div>

      <a href="${data.html_url}" target="_blank">Visit GitHub Profile</a>
    `;

    profileDiv.style.display = "block";
  } catch (error) {
    errorMsg.textContent = "❌ User not found!";
  } finally {
    loadingSpinner.style.display = "none";
  }
}
