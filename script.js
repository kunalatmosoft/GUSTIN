document.addEventListener('DOMContentLoaded', () => {
    const comicImg = document.getElementById('comic-img');
    const comicTitle = document.getElementById('comic-title');
    const newComicButton = document.getElementById('new-comic-button');

    const corsProxy = 'https://api.allorigins.win/get?url=';

    const fetchComic = async (comicId = 'info.0.json') => {
        try {
            // Fetch the latest comic to get the maximum comic number
            const response = await fetch(`${corsProxy}https://xkcd.com/${comicId}`);
            const data = await response.json();
            const latestComic = JSON.parse(data.contents);
            const latestComicNum = latestComic.num;

            // Get a random comic number between 1 and the latest comic number
            const randomComicNum = Math.floor(Math.random() * latestComicNum) + 1;

            // Fetch the random comic
            const randomComicResponse = await fetch(`${corsProxy}https://xkcd.com/${randomComicNum}/info.0.json`);
            const randomComicData = await randomComicResponse.json();
            const randomComic = JSON.parse(randomComicData.contents);

            // Update the DOM with the random comic details
            comicImg.style.opacity = 0; // Start fade out animation
            comicImg.onload = () => {
                comicImg.style.opacity = 1; // Fade in the new image
            };
            comicImg.src = randomComic.img;
            comicImg.alt = randomComic.alt;  // Add alt text for accessibility
            comicTitle.textContent = randomComic.title;

            // Trigger confetti animation with gradient colors
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff6f61', '#ffcc00', '#66ff66', '#66ccff', '#cc66ff']
            });
        } catch (error) {
            console.error('Error fetching comic:', error);
        }
    };

    newComicButton.addEventListener('click', () => fetchComic());

    // Fetch a comic when the page loads
    fetchComic();
});
