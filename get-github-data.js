import {track_language_count} from "./lang-stats.js";

async function github_api_handling() {
	const GITHUB_URL = "https://api.github.com/users/herneri";
	var event_data;
	var repo_data;

	try {
		event_data = await fetch(GITHUB_URL + "/events");
		repo_data = await fetch(GITHUB_URL + "/repos");
	} catch (NetworkError) {
		return -100;
	}

	if (!event_data.ok) {
		return -2;
	}

	repo_data = await repo_data.json();
	return [Object.keys(repo_data).length, await event_data.json(), repo_data];
}

async function gather_repo_language_data(repos_json) {
	const REPO_URL_BASE = "https://api.github.com/repos/herneri";
	var repo_language_count = {};
	const keys = Object.keys(repos_json);

	keys.forEach(async function(key) {
		const repo_language_data = await fetch(REPO_URL_BASE + "/" + repos_json[key]["name"] + "/languages");
		if (!repo_language_data.ok) {
			return -1;
		}

		const repo_language_json = await repo_language_data.json();

		Object.keys(repo_language_json).forEach(function(repo_key) {
			track_language_count(repo_language_count, repo_key, repo_language_json[repo_key]);
		});

		window.setTimeout(null, 20000);
	});

	return repo_language_count;
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
	case -2:
		error_message.textContent = "ERROR: Failed to gather event data from GitHub";
		return;
	}

	var public_repos = document.createElement("p");
	var most_recent_repo = document.createElement("p");

	public_repos.textContent = "Number of Public Repos: " + api_data[0];
	data_section.appendChild(public_repos);

	most_recent_repo.textContent = "Most Recently Updated Repo: " + api_data[1][0]["repo"]["name"];
	data_section.appendChild(most_recent_repo);
}

write_github_data();
