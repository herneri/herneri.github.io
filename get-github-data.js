async function github_api_handling() {
	const GITHUB_URL = "https://api.github.com/users/herneri";

	const user_data = await fetch(GITHUB_URL);;
	const event_data = await fetch(GITHUB_URL + "/events");;

	if (!user_data.ok) {
		document.write("ERROR: Failed to gather user data from GitHub <br/>");
		return;
	} else if (!event_data.ok) {
		document.write("ERROR: Failed to gather event data from GitHub <br/>");
		return;
	}

	return [await user_data.json(), await event_data.json()];
}

async function write_github_data() {
	const api_data = await github_api_handling();
	var data_section = document.getElementById("github_content");

	var public_repos = document.createElement("p");
	var most_recent_repo = document.createElement("p");

	public_repos.textContent = "Number of Public Repos: " + api_data[0]["public_repos"];
	data_section.appendChild(public_repos);

	most_recent_repo.textContent = "Most Recently Updated Repo: " + api_data[1][0]["repo"]["name"];
	data_section.appendChild(most_recent_repo);
}

write_github_data();
