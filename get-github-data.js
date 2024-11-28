async function github_api_handling() {
	const GITHUB_URL = "https://api.github.com/users/herneri";

	const response = await fetch(GITHUB_URL);;
	if (!response.ok) {
		document.write("ERROR: Failed to gather data from GitHub");
		return;
	}

	return await response.json();
}
