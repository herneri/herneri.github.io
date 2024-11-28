async function github_api_handling() {
	const GITHUB_URL = "https://api.github.com/users/herneri";
	var user_data;
	var event_data;

	try {
		user_data = await fetch(GITHUB_URL);;
		event_data = await fetch(GITHUB_URL + "/events");;
	} catch (NetworkError) {
		return -100;
	}

	if (!user_data.ok) {
		return -1;
	} else if (!event_data.ok) {
		return -2;
	}

	return [await user_data.json(), await event_data.json()];
}

async function write_github_data() {
	const api_data = await github_api_handling();
	var data_section = document.getElementById("github_content");
	var error_message;

	if (api_data < 0) {
		error_message = document.createElement("p");
		error_message.style.color = "red";
		data_section.appendChild(error_message);
	}

	switch (api_data) {
	case -100:
		error_message.textContent = "NETWORK ERROR: GitHub data is unavailable";
		return;
	case -1:
		error_message.textContent = "ERROR: Failed to gather user data from GitHub";
		return;
	case -2:
		error_message.textContent = "ERROR: Failed to gather event data from GitHub";
		return;
	}

	var public_repos = document.createElement("p");
	var most_recent_repo = document.createElement("p");

	public_repos.textContent = "Number of Public Repos: " + api_data[0]["public_repos"];
	data_section.appendChild(public_repos);

	most_recent_repo.textContent = "Most Recently Updated Repo: " + api_data[1][0]["repo"]["name"];
	data_section.appendChild(most_recent_repo);
}

write_github_data();
