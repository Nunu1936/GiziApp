// Bank Soal Kuis
const quizData = [
    // Soal dari kamu
    {
        question: "1. Makanan sumber protein adalah...",
        options: ["A. Ikan", "B. Permen", "C. Es Krim", "D. Kerupuk"],
        correct: 0 // Index dari jawaban benar (A. Ikan)
    },
    {
        question: "2. Apa yang dimaksud dengan gizi seimbang?",
        options: ["A. Makan sebanyak-banyaknya", "B. Makan makanan yang mahal", "C. Susunan makanan sehari-hari yang mengandung zat gizi sesuai kebutuhan tubuh", "D. Hanya makan sayur dan buah"],
        correct: 2 
    },
    {
        question: "3. Buah dan sayur penting dikonsumsi karena mengandung…",
        options: ["A. Vitamin dan mineral", "B. Garam", "C. Pewarna makanan", "D. Pengawet"],
        correct: 0 
    },
    {
        question: "4. Manakah yang termasuk sumber karbohidrat?",
        options: ["A. Nasi", "B. Bayam", "C. Telur", "D. Ikan"],
        correct: 0 
    },
    {
        question: "5. Protein berfungsi untuk…",
        options: ["A. Memberi warna makanan", "B. Membantu pertumbuhan dan memperbaiki jaringan tubuh", "C. Membuat makanan manis", "D. Menambah rasa makanan"],
        correct: 1 
    },
    // Tambahan 5 Soal Baru
    {
        question: "6. Vitamin C banyak terdapat pada buah...",
        options: ["A. Pisang", "B. Jeruk", "C. Semangka", "D. Kurma"],
        correct: 1 
    },
    {
        question: "7. Susu merupakan salah satu sumber utama untuk memenuhi kebutuhan mineral...",
        options: ["A. Zat Besi", "B. Kalsium", "C. Yodium", "D. Magnesium"],
        correct: 1 
    },
    {
        question: "8. Lemak yang baik untuk tubuh (lemak tak jenuh) bisa didapatkan secara alami dari...",
        options: ["A. Gorengan", "B. Mentega", "C. Buah Alpukat", "D. Makanan Cepat Saji"],
        correct: 2 
    },
    {
        question: "9. Berapa banyak anjuran minum air putih untuk orang dewasa dalam sehari?",
        options: ["A. 2 gelas", "B. 4 gelas", "C. Sekitar 8 gelas", "D. 15 gelas"],
        correct: 2 
    },
    {
        question: "10. Makanan yang mengandung banyak serat, seperti sayur dan gandum, sangat baik untuk kesehatan...",
        options: ["A. Pencernaan", "B. Mata", "C. Tulang", "D. Rambut"],
        correct: 0 
    }
];

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

// Elemen DOM
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const scoreText = document.getElementById("score-text");
const scoreMessage = document.getElementById("score-message");

// Fungsi untuk memuat soal
function loadQuestion() {
    answered = false;
    feedback.innerHTML = "";
    nextBtn.style.display = "none";
    optionsContainer.innerHTML = "";
    
    const currentQuiz = quizData[currentQuestionIndex];
    questionText.innerHTML = currentQuiz.question;

    currentQuiz.options.forEach((option, index) => {
        const div = document.createElement("div");
        div.classList.add("option");
        div.innerHTML = option;
        div.onclick = () => selectOption(div, index);
        optionsContainer.appendChild(div);
    });
}

// Fungsi untuk mengecek jawaban
function selectOption(element, index) {
    if (answered) return; // Mencegah klik lebih dari sekali
    answered = true;

    const currentQuiz = quizData[currentQuestionIndex];
    const allOptions = document.querySelectorAll(".option");

    // Disable semua opsi
    allOptions.forEach(opt => opt.style.pointerEvents = "none");

    if (index === currentQuiz.correct) {
        element.style.background = "#C8E6C9"; // Hijau untuk benar
        element.style.borderColor = "#4CAF50";
        feedback.innerHTML = "✅ Jawaban tepat!";
        feedback.style.color = "#2E7D32";
        score += 10; // Tiap soal bernilai 10 poin
    } else {
        element.style.background = "#FFCDD2"; // Merah untuk salah
        element.style.borderColor = "#F44336";
        feedback.innerHTML = "❌ Jawaban kurang tepat.";
        feedback.style.color = "#C62828";
        
        // Highlight jawaban yang benar
        allOptions[currentQuiz.correct].style.background = "#C8E6C9";
    }

    nextBtn.style.display = "block"; // Munculkan tombol next
}

// Fungsi untuk pindah ke soal berikutnya atau selesai
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Fungsi menampilkan hasil akhir
function showResults() {
    quizContainer.style.display = "none";
    nextBtn.style.display = "none";
    feedback.style.display = "none";
    resultContainer.style.display = "block";

    scoreText.innerHTML = `Skor Kamu: ${score} / 100`;

    // Logika Pesan Hasil Kuis
    if (score >= 80) {
        scoreMessage.innerHTML = "🌟 Hebat! Kamu sudah memahami gizi seimbang dengan baik.";
    } else if (score >= 60) {
        scoreMessage.innerHTML = "👍 Bagus! Terus pelajari dan praktikkan gizi seimbang.";
    } else {
        scoreMessage.innerHTML = "📚 Yuk, pelajari kembali materi MIEDGIZI agar lebih paham.";
    }
}

// Fungsi mengulang kuis
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.style.display = "block";
    feedback.style.display = "block";
    resultContainer.style.display = "none";
    loadQuestion();
}

// Inisialisasi kuis saat halaman dimuat
loadQuestion();