
document.addEventListener("DOMContentLoaded", function () {
    Fancybox.bind('[data-fancybox="seminars-gallery"]', {
        Thumbs: {
            autoStart: false, // Open thumbnails by default
            axis: "y" // Move thumbnails to the right (vertical alignment)
        },
        Video: {
            youtube: {
                controls: 1, // Show player controls
                modestbranding: 1, // Minimal YouTube branding
                rel: 0, // Disable related videos
            },
            vimeo: {
                color: "ff0000", // Change Vimeo player color
                portrait: 0, // Hide portrait
            },
        },
        loop: false, // Enable looping through the gallery
        infinite: false,
        Hash: false,
    });
});

