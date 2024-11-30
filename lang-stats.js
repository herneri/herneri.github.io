/*
	Copyright 2024 Eric Hernandez

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

		https://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
*/

/*
	Store number of lines per language in an object
*/
export function track_language_count(languages_count, language_string, value) {
	if (language_string in languages_count) {
		languages_count[language_string] += value;
		return;
	}

	languages_count[language_string] = value;
	return;
}

/* 
	Pass data that was retrieved from the API
	and calculate the percent of usage for the languages.

	NOTE: The total amount that languages are used is
	calculated as they are being retrieved from the API.
*/
export function language_makeup(languages_count, total_count) {
	var largest = -1;
	var language_stats = {
		"most_used": null
	};

	const keys = Object.keys(languages_count);
	keys.forEach(function(key) {
		language_stats[key] = languages_count[key] / total_count;
		if (language_stats[key] > largest) {
			language_stats["most_used"] = key;
			largest = language_stats[key];
		}
	});

	return language_stats;
}
