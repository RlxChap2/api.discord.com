const video = document.querySelector('.videoInner_de2fa0');

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        video.play().catch(() => {});
    }
});

const originalPause = HTMLVideoElement.prototype.pause;
HTMLVideoElement.prototype.pause = function () {
    this.play().catch(() => {});
};

const forcePlay = () => {
    if (video.paused) {
        video.play().catch(() => {
            setTimeout(forcePlay, 1000);
        });
    }
};

['blur', 'mouseleave', 'visibilitychange'].forEach((event) => {
    window.addEventListener(event, () => {
        video.play().catch(() => {});
    });
});

setInterval(forcePlay, 500);
