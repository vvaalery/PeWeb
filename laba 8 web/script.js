document.addEventListener('DOMContentLoaded', () => {
    const videoCatalog = new Map([
        [1, { title: "Реклама 1", url: "https://v1.pinimg.com/videos/mc/expMp4/ea/b6/82/eab6824afb8e423015f36bca4149f4a4_t1.mp4" }],
        [2, { title: "Реклама 2", url: "https://v1.pinimg.com/videos/mc/expMp4/ea/b6/82/eab6824afb8e423015f36bca4149f4a4_t1.mp4" }],
        [3, { title: "Реклама 3", url: "https://v1.pinimg.com/videos/mc/expMp4/ea/b6/82/eab6824afb8e423015f36bca4149f4a4_t1.mp4" }],
        [4, { title: "Реклама 4", url: "https://v1.pinimg.com/videos/mc/expMp4/ea/b6/82/eab6824afb8e423015f36bca4149f4a4_t1.mp4" }],
        [5, { title: "Реклама 5", url: "https://v1.pinimg.com/videos/mc/expMp4/ea/b6/82/eab6824afb8e423015f36bca4149f4a4_t1.mp4" }],
        [6, { title: "Реклама 6", url: "https://v1.pinimg.com/videos/mc/expMp4/ea/b6/82/eab6824afb8e423015f36bca4149f4a4_t1.mp4" }],
        [7, { title: "Реклама 7", url: "https://v1.pinimg.com/videos/mc/expMp4/ea/b6/82/eab6824afb8e423015f36bca4149f4a4_t1.mp4" }],
        [8, { title: "Реклама 8", url: "https://v1.pinimg.com/videos/mc/expMp4/ea/b6/82/eab6824afb8e423015f36bca4149f4a4_t1.mp4" }],
        [9, { title: "Реклама 9", url: "https://v1.pinimg.com/videos/mc/expMp4/ea/b6/82/eab6824afb8e423015f36bca4149f4a4_t1.mp4" }],
        [10, { title: "Реклама 10", url: "https://v1.pinimg.com/videos/mc/expMp4/ea/b6/82/eab6824afb8e423015f36bca4149f4a4_t1.mp4" }]
    ]);

    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const intervalInput = document.getElementById('interval');
    const videoPlayer = document.getElementById('video-player');
    const playerContainer = document.querySelector('.player-container');
    const currentVideoSpan = document.getElementById('current-video');
    const nextVideoSpan = document.getElementById('next-video');

    let currentVideoIndex = 1;
    let timerId = null;
    let isPaused = false;
    let interval = 5;

    function initPlayer() {
        interval = parseInt(intervalInput.value) || 5;
        playerContainer.classList.add('active');
        playVideo(currentVideoIndex);
    }

    function playVideo(index) {
        const video = videoCatalog.get(index);
        if (!video) return;

        videoPlayer.src = video.url;
        videoPlayer.load();
        videoPlayer.play();
        
        currentVideoIndex = index;
        currentVideoSpan.textContent = `${index}/${videoCatalog.size}`;
        
        updateNextVideoTimer();
        
        videoPlayer.onended = function() {
            if (!isPaused) {
                scheduleNextVideo();
            }
        };
    }

    function scheduleNextVideo() {
        clearTimeout(timerId);
        
        timerId = setTimeout(() => {
            const nextIndex = currentVideoIndex % videoCatalog.size + 1;
            playVideo(nextIndex);
        }, interval * 1000);
        
        updateNextVideoTimer();
    }

    function updateNextVideoTimer() {
        if (isPaused) {
            nextVideoSpan.textContent = "На паузе";
            return;
        }
        
        let seconds = interval;
        nextVideoSpan.textContent = `Следующее через: ${seconds}s`;
        
        const countdown = setInterval(() => {
            seconds--;
            nextVideoSpan.textContent = `Следующее через: ${seconds}s`;
            
            if (seconds <= 0 || isPaused) {
                clearInterval(countdown);
            }
        }, 1000);
    }

    startBtn.addEventListener('click', function() {
        this.disabled = true;
        initPlayer();
    });

    pauseBtn.addEventListener('click', function() {
        isPaused = !isPaused;
        
        if (isPaused) {
            this.textContent = "Продолжить";
            videoPlayer.pause();
            clearTimeout(timerId);
        } else {
            this.textContent = "Пауза";
            videoPlayer.play();
            scheduleNextVideo();
        }
        
        updateNextVideoTimer();
    });

    intervalInput.addEventListener('change', function() {
        if (this.value < 1) this.value = 1;
        if (this.value > 60) this.value = 60;
    });

    const particles = document.querySelector('.particles');
    document.addEventListener('mousemove', (e) => {
        particles.style.backgroundPosition = `${e.clientX / 20}px ${e.clientY / 20}px`;
    });
});