//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
function downloadImage(url) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(`Failed to download image: ${url}`);
        img.src = url;
      });
    }

    // Main function to handle image downloading
    function downloadImages(urls) {
      const loadingDiv = document.getElementById('loading');
      const errorDiv = document.getElementById('error');
      const outputDiv = document.getElementById('output');

      // Reset previous state
      loadingDiv.style.display = 'block';
      errorDiv.textContent = '';
      outputDiv.innerHTML = '';

      const imagePromises = urls.map(downloadImage);

      Promise.all(imagePromises)
        .then(images => {
          images.forEach(img => outputDiv.appendChild(img));
        })
        .catch(err => {
          errorDiv.textContent = err;
        })
        .finally(() => {
          loadingDiv.style.display = 'none';
        });
    }

    // Trigger the download on page load (or call on button click)
    downloadImages(imageUrls);9