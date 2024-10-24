import EleventyFetch from '@11ty/eleventy-fetch';

export default async function() {
    try {
        let url = "https://raw.githubusercontent.com/ai-robots-txt/ai.robots.txt/refs/heads/main/robots.txt";

        return EleventyFetch(url, {
            duration: "1w",
            type: "text"
        });
    } catch (error) {
        console.log('Error fetching bad bots from github.com/ai-robots-txt/ai.robots.txt:', error);
    }
};