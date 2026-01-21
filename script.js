/**
 * Logika Cerita Naratif
 * Oleh: Miss Efhi Fania Sihotang
 */

const storyData = [
    {
        part: "Orientation (Pengenalan)",
        title: "The calm before the storm...",
        text: `<p>One <span class="vocab-highlight" onclick="alert('Definisi: Mendung / Gelap / Suram')">gloomy</span> Saturday afternoon, three close friends gathered at Budi’s house: Budi, Dino, and Santi. They stood by the window, staring at the dark clouds that were <span class="vocab-highlight" onclick="alert('Definisi: Berkumpul / Menyatu')">gathering</span> in the sky like a silent army.</p>
               <p>They had planned a <span class="vocab-highlight" onclick="alert('Definisi: Sudah lama dinanti-nanti')">long-awaited</span> hiking trip. However, nature had a different plan. Within minutes, a <span class="vocab-highlight" onclick="alert('Definisi: Sangat besar / Dahsyat')">massive</span> thunderstorm broke out, and the wind began to blow <span class="vocab-highlight" onclick="alert('Definisi: Sangat kencang / Ganas')">fiercely</span> against the glass.</p>`,
        emoji: "☁️",
        moodLabel: "The sky is turning grey",
        color: "#475569",
        progress: 25,
        rain: true,
        lightning: false,
        float: true
    },
    {
        part: "Complication (Masalah)",
        title: "Darkness falls upon them",
        text: `<p>"I can't believe this!" Dino shouted as he threw his bag with a loud <span class="vocab-highlight" onclick="alert('Definisi: Suara debuman / Jatuh yang keras')">thud</span>. He felt <span class="vocab-highlight" onclick="alert('Definisi: Frustrasi / Kecewa')">frustrated</span> because he wanted to test his new boots.</p>
               <p>Budi sighed. "The whole weekend is <span class="vocab-highlight" onclick="alert('Definisi: Hancur / Rusak')">ruined</span>," he muttered. Suddenly, a blinding flash hit outside, and the electricity went out, <span class="vocab-highlight" onclick="alert('Definisi: Menjerumuskan / Membuat masuk ke dalam')">plunging</span> the house into darkness.</p>`,
        emoji: "⛈️",
        moodLabel: "Suddenly, total darkness!",
        color: "#1e1b4b",
        progress: 50,
        rain: true,
        lightning: true,
        float: false
    },
    {
        part: "Resolution (Solusi)",
        title: "The Warmth of a Candle",
        text: `<p>Santi took out a small flashlight. In the corner, Budi <span class="vocab-highlight" onclick="alert('Definisi: Menemukan secara tidak sengaja')">stumbled upon</span> an old wooden box. Inside, they found his father’s sketchbook and <span class="vocab-highlight" onclick="alert('Definisi: Arang untuk menggambar')">charcoal</span> pencils.</p>
               <p>"Why don't we draw together?" Budi <span class="vocab-highlight" onclick="alert('Definisi: Membuat sketsa')">sketched</span> the dramatic storm, while Santi taught Dino how to draw. As they drew by the candlelight, they completely <span class="vocab-highlight" onclick="alert('Definisi: Lupa waktu')">lost track of time</span>.</p>`,
        emoji: "🕯️",
        moodLabel: "Art in the candlelight",
        color: "#78350f",
        progress: 75,
        rain: false,
        lightning: false,
        float: true
    },
    {
        part: "Coda (Pesan Moral)",
        title: "A Memory to Cherish",
        text: `<p>The friends realized that even though they missed the hiking trip, they found a wonderful way to spend time together. They felt a deep sense of <span class="vocab-highlight" onclick="alert('Definisi: Pencapaian / Prestasi')">accomplishment</span>.</p>
               <p>They learned that an <span class="vocab-highlight" onclick="alert('Definisi: Tidak terduga / Tiba-tiba')">unexpected</span> change of plans could lead to a beautiful memory. The holiday was just <span class="vocab-highlight" onclick="alert('Definisi: Berubah / Bertransformasi')">transformed</span> into something special.</p>`,
        emoji: "🎨",
        moodLabel: "A perfect mistake",
        color: "#064e3b",
        progress: 100,
        rain: false,
        lightning: false,
        float: true
    }
];

let currentIdx = 0;
const speechSynth = window.speechSynthesis;

// Inisialisasi Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    createRain();
    updateRender();

    document.getElementById('next-btn').addEventListener('click', () => navigateStory(1));
    document.getElementById('prev-btn').addEventListener('click', () => navigateStory(-1));
    document.getElementById('audio-control').addEventListener('click', toggleAudio);
});

function navigateStory(direction) {
    speechSynth.cancel();
    updateAudioUI(false);
    
    currentIdx += direction;
    if (currentIdx < 0) currentIdx = 0;
    if (currentIdx >= storyData.length) currentIdx = 0;
    
    updateRender();
    document.getElementById('scroll-target').scrollTop = 0;
}

function toggleAudio() {
    if (speechSynth.speaking) {
        speechSynth.cancel();
        updateAudioUI(false);
        return;
    }
    
    const rawText = document.getElementById('main-text').innerText;
    const utterance = new SpeechSynthesisUtterance(rawText);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    
    utterance.onstart = () => updateAudioUI(true);
    utterance.onend = () => updateAudioUI(false);
    utterance.onerror = () => updateAudioUI(false);
    
    speechSynth.speak(utterance);
}

function updateAudioUI(isPlaying) {
    const btn = document.getElementById('audio-control');
    const label = document.getElementById('audio-status');
    if (isPlaying) {
        btn.classList.add('bg-red-500', 'audio-playing');
        btn.classList.remove('bg-indigo-600');
        label.innerText = "Stop Reading";
    } else {
        btn.classList.remove('bg-red-500', 'audio-playing');
        btn.classList.add('bg-indigo-600');
        label.innerText = "Read Story";
    }
}

function updateRender() {
    const data = storyData[currentIdx];
    
    document.getElementById('bg-canvas').style.background = data.color;
    document.getElementById('rain-container').style.opacity = data.rain ? "1" : "0";
    document.getElementById('lightning-layer').className = data.lightning ? "fixed inset-0 pointer-events-none z-0 lightning-flash" : "fixed inset-0 pointer-events-none z-0";
    
    document.getElementById('main-emoji').innerText = data.emoji;
    document.getElementById('visual-wrapper').className = `visual-box my-6 ${data.float ? 'float-anim' : ''}`;
    document.getElementById('mood-label').innerText = `"${data.moodLabel}"`;

    document.getElementById('part-tag').innerText = `PART ${currentIdx + 1}: ${data.part}`;
    document.getElementById('current-title').innerText = data.title;
    document.getElementById('main-text').innerHTML = data.text;

    document.getElementById('mobile-prog-val').innerText = `${data.progress}%`;
    document.getElementById('desktop-prog-val').innerText = `${data.progress}%`;
    document.getElementById('progress-fill').style.width = `${data.progress}%`;

    document.getElementById('prev-btn').disabled = (currentIdx === 0);
    document.getElementById('next-btn').innerText = currentIdx === storyData.length - 1 ? "Start Over" : "Continue";
    
    const dotContainer = document.getElementById('page-dots');
    dotContainer.innerHTML = '';
    storyData.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = `h-2 rounded-full transition-all duration-500 ${i === currentIdx ? 'w-8 bg-indigo-600 shadow-md' : 'w-2 bg-slate-300'}`;
        dotContainer.appendChild(dot);
    });

    const contentArea = document.getElementById('narrative-content');
    contentArea.classList.remove('fade-in-up');
    void contentArea.offsetWidth;
    contentArea.classList.add('fade-in-up');
}

function createRain() {
    const container = document.getElementById('rain-container');
    for(let i=0; i<40; i++) {
        const drop = document.createElement('div');
        drop.className = 'drop';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animationDuration = (Math.random() * 0.4 + 0.4) + 's';
        drop.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(drop);
    }
}