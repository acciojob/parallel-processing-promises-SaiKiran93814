//your JS code here. If required.

// ✅ Define the array BEFORE it's used
const imageUrls = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/id/238/200/300",
  "https://picsum.photos/id/239/200/300"
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to download image: ${url}`);
    img.src = url;
  });
}

function downloadImages(urls) {
  const loading = document.getElementById("loading");
  const error = document.getElementById("error");
  const output = document.getElementById("output");

  // Reset state
  loading.style.display = "block";
  error.textContent = "";
  output.innerHTML = "";

  Promise.all(urls.map(downloadImage))
    .then(images => {
      images.forEach(img => output.appendChild(img));
    })
    .catch(err => {
      error.textContent = err;
    })
    .finally(() => {
      loading.style.display = "none";
    });
}

// ✅ Add click listener AFTER the DOM and variable are defined
document.getElementById("download-images-button")
  .addEventListener("click", () => downloadImages(imageUrls));
