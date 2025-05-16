document.addEventListener('DOMContentLoaded', () => {
    // Element Cache
    const playPauseButton = document.getElementById('playPauseButton');
    const playPauseIcon = playPauseButton ? playPauseButton.querySelector('img') : null;
    const randomButton = document.getElementById('randomButton');
    const currentMusicSpan = document.getElementById('currentMusic');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const volumeSlider = document.getElementById('volumeSlider');

    const bgButton = document.getElementById('bgButton');
    const bgButtonIcon = bgButton ? bgButton.querySelector('img') : null;
    const rainOverlay = document.getElementById('rain-overlay');

    const enButton = document.getElementById('enButton');
    const ptButton = document.getElementById('ptButton');

    const headerTextEl = document.getElementById('headerText');

    const parallaxContainer = document.querySelector('.parallax-container');
    const parallaxImage = document.querySelector('.parallax-image');

    const currentMusicContainer = document.querySelector('.current-music-container');
    const musicPlaylistPopup = document.querySelector('.music-playlist-popup');
    const musicPlaylistItemsUl = document.getElementById('musicPlaylistItems');
    const smallGif = document.querySelector('.small-gif');


    // --- 3D Tilt Parallax Effect for Main Image ---
    if (parallaxContainer && parallaxImage) {
        const MAX_ROTATION = 25;
        const POP_OUT_DISTANCE = 50;

        parallaxContainer.addEventListener('mousemove', (e) => {
            const rect = parallaxContainer.getBoundingClientRect();
            const mouseX = e.clientX - rect.left - rect.width / 2;
            const mouseY = e.clientY - rect.top - rect.height / 2;

            const dynamicRotateY = (mouseX / (rect.width / 2)) * MAX_ROTATION;
            const dynamicRotateX = -(mouseY / (rect.height / 2)) * MAX_ROTATION;

            requestAnimationFrame(() => {
                 parallaxImage.style.transform = `
                    rotateX(${dynamicRotateX}deg)
                    rotateY(${dynamicRotateY}deg)
                    translateZ(${POP_OUT_DISTANCE}px)`;
            });
        });

        parallaxContainer.addEventListener('mouseleave', () => {
            requestAnimationFrame(() => {
                parallaxImage.style.transform = `
                    rotateX(0deg)
                    rotateY(0deg)
                    translateZ(0px)`;
            });
        });
    }


    // --- Translations ---
    const translations = {
        en: {
            title: "☁️ Caravela's Corner! ☁️",
            // Order matters for weighted selection:
            // 1. 75%
            // 2. 15%
            // 3. 10%
            headerTexts: [
                '✦ Hey there, Welcome to my website! ✦', // 75%
                '✦ Glad to see you here! ✦',             // 15%
                'Man... Did i miss you.'                  // 10%
            ],
            greetingText: "I'm Leo! Nice to meet you.",
            introText: "I'm into all sorts of things, like a good anime series, discovering new music, enjoying nature, and pretty much anything computer-related.",
            descriptionText: "Just a regular person trying to figure things out and sharing some thoughts along the way.",
            invitationText: "I consider myself pretty approachable and I enjoy chatting and making new friends, so feel free to reach out!",
            musicControllerTitle: 'Music Controller',
            pauseButtonAlt: 'Pause',
            playButtonAlt: 'Play',
            rainToggleTitle: 'Toggle Rain Ambience',
            rainOnAlt: 'Rain ON',
            rainOffAlt: 'Rain OFF',
            upNextTitle: 'Next Track'
        },
        pt: {
            title: "☁️ O Cantinho do Caravela! ☁️",
            // Order matters for weighted selection:
            headerTexts: [
                '✦ Olá, Bem-vindo ao meu website! ✦',   // 75%
                '✦ Que bom ver-te por aqui! ✦',         // 15%
                'Aaah... Como senti a tua falta.'       // 10%
            ],
            greetingText: 'Eu sou o Leo! Prazer em conhecer-te.',
            introText: 'Gosto de todo o tipo de coisas: animes, música nova, natureza e tudo relacionado com computadores.',
            descriptionText: 'Sou uma pessoa normal a tentar perceber as coisas e a partilhar alguns pensamentos pelo caminho.',
            invitationText: 'Considero-me bastante acessível e gosto de conversar e fazer novos amigos, por isso, sente-te à vontade para mandar mensagem!',
            musicControllerTitle: 'Controlador de Música',
            pauseButtonAlt: 'Pausar',
            playButtonAlt: 'Tocar',
            rainToggleTitle: 'Alternar Ambiente de Chuva',
            rainOnAlt: 'Chuva LIGADA',
            rainOffAlt: 'Chuva DESLIGADA',
            upNextTitle: 'Próxima Faixa'
        }
    };

    let currentLanguage = 'en';

    function applyTranslations(lang) {
        if (!translations[lang]) return;
        currentLanguage = lang;
        document.documentElement.lang = lang;
        document.title = translations[lang].title;

        if (headerTextEl) {
            const T = translations[lang];
            if (T.headerTexts && T.headerTexts.length === 3) { // Ensure we have 3 for weighted logic
                const rand = Math.random() * 100; // Get a number between 0 and 99.99...
                if (rand < 75) { // 0-74.99... (75% chance)
                    headerTextEl.innerHTML = T.headerTexts[0];
                } else if (rand < 90) { // 75-89.99... (15% chance)
                    headerTextEl.innerHTML = T.headerTexts[1];
                } else { // 90-99.99... (10% chance)
                    headerTextEl.innerHTML = T.headerTexts[2];
                }
            } else if (T.headerTexts && T.headerTexts.length > 0) { // Fallback for non-weighted
                 headerTextEl.innerHTML = T.headerTexts[Math.floor(Math.random() * T.headerTexts.length)];
            }
        }
        // Update other text elements
        const greetingEl = document.getElementById('greetingText');
        if (greetingEl) greetingEl.textContent = translations[lang].greetingText;
        const introEl = document.getElementById('introText');
        if (introEl) introEl.textContent = translations[lang].introText;
        const descEl = document.getElementById('descriptionText');
        if (descEl) descEl.textContent = translations[lang].descriptionText;
        const invEl = document.getElementById('invitationText');
        if (invEl) invEl.textContent = translations[lang].invitationText;

        if (playPauseButton) playPauseButton.title = translations[lang].musicControllerTitle;
        if (bgButton) bgButton.title = translations[lang].rainToggleTitle;
        if (randomButton) randomButton.title = translations[lang].upNextTitle;

        updatePlayPauseButtonVisuals();
        updateRainButtonVisuals();

        if (enButton) enButton.classList.toggle('active', lang === 'en');
        if (ptButton) ptButton.classList.toggle('active', lang === 'pt');
    }

    if (enButton) enButton.addEventListener('click', () => applyTranslations('en'));
    if (ptButton) ptButton.addEventListener('click', () => applyTranslations('pt'));

    function setInitialLanguage() {
        const userLang = navigator.language || navigator.userLanguage;
        if (userLang.startsWith('pt')) {
            applyTranslations('pt');
        } else {
            applyTranslations('en');
        }
    }

    // --- Music Player ---
    const musicList = [
        { name: 'Fly Me To The Moon by Nursena Yener', src: 'https://github.com/Missiion/WWW/raw/main/Fly%20Me%20To%20The%20Moon%20by%20Nursena%20Yener.mp3' },
        { name: 'Lost Chapter: Acoustic', src: 'https://github.com/Missiion/WWW/raw/main/Lightbringer%20(Acoustic)%20%20Pentakill%20III-%20Lost%20Chapter%20%20Riot%20Games%20Music.mp3' },
        { name: 'CAPAREZZA - EL SENDERO', src: 'https://github.com/Missiion/WWW/raw/main/CAPAREZZA%20-%20EL%20SENDERO%20(feat.%20Mishel%20Domenssain).mp3' },
        { name: 'Teddy Swims - Lose Control', src: 'https://github.com/Missiion/WWW/raw/main/Teddy%20Swims%20-%20Lose%20Control%20(Official%20Audio).mp3' },
        { name: '1 Thing Piano - Remix', src: 'https://github.com/Missiion/WWW/raw/main/spotifydown.com%20-%201%20Thing%20Piano%20-%20Remix.mp3' },
        { name: 'Day \'n\' Nite', src: 'https://github.com/Missiion/WWW/raw/main/spotifydown.com%20-%20Day%20\'n\'%20Nite.mp3' },
        { name: 'Outra Metade', src: 'https://github.com/Missiion/WWW/raw/main/spotifydown.com%20-%20Outra%20Metade.mp3' },
        { name: 'Stay Fly', src: 'https://github.com/Missiion/WWW/raw/main/spotifydown.com%20-%20Stay%20Fly.mp3' },
        { name: 'Rain and Thunder Background', src: 'https://github.com/Missiion/WWW/raw/main/Rain-and-thunder-loop.mp3' },
    ];

    let currentIndex = -1;
    let isPlaying = true;

    function loadMusic(index, autoplay = false) {
        if (index < 0 || index >= musicList.length) {
            if(currentMusicSpan) currentMusicSpan.textContent = "";
            return;
        }
        const selectedMusic = musicList[index];
        if(currentMusicSpan) currentMusicSpan.textContent = selectedMusic.name;
        if(backgroundMusic) backgroundMusic.src = selectedMusic.src;

        if (autoplay && backgroundMusic) {
            backgroundMusic.play().catch(error => {
                console.warn("Autoplay was prevented for music:", error.message);
                isPlaying = false;
                updatePlayPauseButtonVisuals();
            });
        }
        updatePlaylistActiveSong();
    }

    function selectRandomMusicAndLoad(autoplay = false) {
        if (musicList.length === 0) {
             if(currentMusicSpan) currentMusicSpan.textContent = "No music available";
             return;
        }
        let newIndex;
        if (musicList.length <= 1) {
            newIndex = 0;
        } else {
            do {
                newIndex = Math.floor(Math.random() * musicList.length);
            } while (newIndex === currentIndex && musicList.length > 1);
        }
        currentIndex = newIndex;
        loadMusic(currentIndex, autoplay);
    }

    function playNextMusic() {
        if (musicList.length === 0) return;
        currentIndex = (currentIndex + 1) % musicList.length;
        loadMusic(currentIndex, true);
        isPlaying = true;
        updatePlayPauseButtonVisuals();
    }

    function updatePlayPauseButtonVisuals() {
        if (!playPauseIcon || !translations[currentLanguage]) return;
        if (isPlaying) {
            playPauseIcon.src = "https://raw.githubusercontent.com/Missiion/WWW/main/ji7jjojo798.png?format=webp&quality=lossless&width=40&height=40";
            playPauseIcon.alt = translations[currentLanguage].pauseButtonAlt;
            if (randomButton) randomButton.style.display = 'inline-block';
        } else {
            playPauseIcon.src = "https://raw.githubusercontent.com/Missiion/WWW/main/i8iiiiiiiiiiiii.png?quality=lossless&width=40&height=40";
            playPauseIcon.alt = translations[currentLanguage].playButtonAlt;
            if (randomButton) randomButton.style.display = 'none';
        }
    }

    if (playPauseButton) {
        playPauseButton.addEventListener('click', () => {
            if (musicList.length === 0) return;
            if (isPlaying) {
                if (backgroundMusic) backgroundMusic.pause();
            } else {
                if (currentIndex === -1 || !backgroundMusic.src ||
                    (musicList[currentIndex] && backgroundMusic.src.split('/').pop() !== musicList[currentIndex].src.split('/').pop()) ) {
                    if (currentIndex === -1 && musicList.length > 0) {
                         selectRandomMusicAndLoad(true);
                    } else if (musicList.length > 0) {
                        loadMusic(currentIndex, true);
                    }
                } else if (backgroundMusic) {
                    backgroundMusic.play().catch(error => console.error("Error playing audio:", error.message));
                }
            }
            if (musicList.length > 0) {
                 isPlaying = !isPlaying;
            }
            updatePlayPauseButtonVisuals();
        });
    }

    if (randomButton) randomButton.addEventListener('click', playNextMusic);

    if (backgroundMusic && volumeSlider) {
        backgroundMusic.volume = parseFloat(volumeSlider.value) / 100;
        volumeSlider.addEventListener('input', () => {
            backgroundMusic.volume = parseFloat(volumeSlider.value) / 100;
        });
    }

    // --- Music Playlist Popup & Cat Animation ---
    function populateMusicPlaylist() {
        if (!musicPlaylistItemsUl || !musicPlaylistPopup) return;
        if (musicList.length === 0) {
            musicPlaylistPopup.style.display = 'none';
            if(currentMusicContainer) currentMusicContainer.style.cursor = 'default';
            return;
        }
        musicPlaylistPopup.style.display = '';
        if(currentMusicContainer) currentMusicContainer.style.cursor = 'default';

        musicPlaylistItemsUl.innerHTML = '';
        musicList.forEach((song, index) => {
            const li = document.createElement('li');
            li.textContent = song.name;
            li.dataset.index = index;
            li.addEventListener('click', () => {
                if (currentIndex === index && isPlaying && backgroundMusic && !backgroundMusic.paused) {
                    return;
                }
                currentIndex = index;
                loadMusic(currentIndex, true);
                isPlaying = true;
                updatePlayPauseButtonVisuals();
            });
            musicPlaylistItemsUl.appendChild(li);
        });
        updatePlaylistActiveSong();
    }

    function updatePlaylistActiveSong() {
        if (!musicPlaylistItemsUl) return;
        const items = musicPlaylistItemsUl.querySelectorAll('li');
        items.forEach((item) => {
            if (parseInt(item.dataset.index) === currentIndex) {
                item.classList.add('active-song');
            } else {
                item.classList.remove('active-song');
            }
        });
    }

    if (currentMusicContainer && smallGif) {
        if (musicList.length > 0) {
            currentMusicContainer.addEventListener('mouseenter', () => {
                smallGif.classList.add('lifted-with-playlist');
            });
            currentMusicContainer.addEventListener('mouseleave', () => {
                smallGif.classList.remove('lifted-with-playlist');
            });
        } else {
            if (musicPlaylistPopup) musicPlaylistPopup.style.pointerEvents = 'none';
        }
    }

    // --- Rain Background Toggle ---
    let isRainOn = false;
    function updateRainButtonVisuals() {
        if (!bgButtonIcon || !rainOverlay || !translations[currentLanguage]) return;
        if (isRainOn) {
            rainOverlay.style.display = 'block';
            bgButtonIcon.src = "https://raw.githubusercontent.com/Missiion/WWW/main/765uy5.png?format=webp&quality=lossless&width=40&height=40";
            bgButtonIcon.alt = translations[currentLanguage].rainOnAlt;
        } else {
            rainOverlay.style.display = 'none';
            bgButtonIcon.src = "https://raw.githubusercontent.com/Missiion/WWW/main/86765765.png?format=webp&quality=lossless&width=40&height=40";
            bgButtonIcon.alt = translations[currentLanguage].rainOffAlt;
        }
    }

    if (bgButton) {
        bgButton.addEventListener('click', () => {
            isRainOn = !isRainOn;
            updateRainButtonVisuals();
        });
    }

    // --- Initial Setup Calls ---
    setInitialLanguage();
    populateMusicPlaylist();

    if (musicList.length > 0) {
        if (!backgroundMusic || !backgroundMusic.src || backgroundMusic.src === window.location.href) {
             selectRandomMusicAndLoad(isPlaying);
        } else {
            const existingSrcFilename = backgroundMusic.src.split('/').pop();
            const existingSrcIndex = musicList.findIndex(song => song.src.split('/').pop() === existingSrcFilename);
            if (existingSrcIndex !== -1) {
                currentIndex = existingSrcIndex;
                if (currentMusicSpan) currentMusicSpan.textContent = musicList[currentIndex].name;
                isPlaying = backgroundMusic && !backgroundMusic.paused;
            } else {
                 selectRandomMusicAndLoad(isPlaying);
            }
        }
    } else {
        if(currentMusicSpan) currentMusicSpan.textContent = "No music available";
        isPlaying = false;
    }

    updatePlayPauseButtonVisuals();
    updateRainButtonVisuals();
    updatePlaylistActiveSong();
});