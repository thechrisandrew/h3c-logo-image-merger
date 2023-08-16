const image1Path = "./h3c-logo-modified.png";
const image2Input = document.getElementById("image2Input");
const mergeButton = document.getElementById("mergeButton");
const mergedCanvas = document.getElementById("mergedCanvas");
const downloadButton = document.getElementById("downloadButton");

const ctx = mergedCanvas.getContext("2d");

mergeButton.addEventListener("click", mergeImages);

downloadButton.addEventListener("click", downloadCanvasAsImage);

function mergeImages() {
    const image2Input = document.getElementById("image2Input");

    const bottomImageFile = image2Input.files[0];

    const topImage = new Image();
    topImage.src = image1Path;

    const bottomImage = new Image();
    bottomImage.src = URL.createObjectURL(bottomImageFile);

    topImage.onload = () => {
        bottomImage.onload = () => {
            // Clear canvas and set white background
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, mergedCanvas.width, mergedCanvas.height);

            // Define maximum dimensions for top image
            const maxTopImageSize = 140; // Maximum size for both width and height

            // Calculate dimensions for top image
            const topImageWidth = Math.min(maxTopImageSize, topImage.width);
            const topImageHeight = Math.min(maxTopImageSize, topImage.height);

            // Calculate dimensions for bottom image
            const maxBottomImageWidth = 375; // Maximum width for bottom image
            const maxBottomImageHeight = 320; // Maximum height for bottom image

            const scaleFactor2Width = maxBottomImageWidth / bottomImage.width;
            const scaleFactor2Height = maxBottomImageHeight / bottomImage.height;
            const scaleFactor2 = Math.min(scaleFactor2Width, scaleFactor2Height);

            const bottomImageWidth = bottomImage.width * scaleFactor2;
            const bottomImageHeight = bottomImage.height * scaleFactor2;

            // Calculate total canvas height
            const totalCanvasHeight = topImageHeight + bottomImageHeight + 10; // 10px gap

            // Calculate start positions for top and bottom images
            const topImageX = (mergedCanvas.width - topImageWidth) / 2;
            const topImageY = (mergedCanvas.height - totalCanvasHeight) / 2;

            const bottomImageX = (mergedCanvas.width - bottomImageWidth) / 2;
            const bottomImageY = topImageY + topImageHeight + 10; // 10px gap

            // Draw top image
            ctx.drawImage(topImage, topImageX, topImageY, topImageWidth, topImageHeight);

            // Draw bottom image
            ctx.drawImage(bottomImage, bottomImageX, bottomImageY, bottomImageWidth, bottomImageHeight);
        };
    };
}

function downloadCanvasAsImage() {
    const image = mergedCanvas.toDataURL("image/jpeg");
    this.href = image;
}

// mergeImages();
