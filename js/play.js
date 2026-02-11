const foodsData = [
    { name:"Nasi", type:"Karbohidrat", img:"nasi.png" },
    { name:"Roti", type:"Karbohidrat", img:"roti.png" },
    { name:"Kentang", type:"Karbohidrat", img:"kentang.png" },
    { name:"Jagung", type:"Karbohidrat", img:"jagung.png" },
    { name:"Singkong", type:"Karbohidrat", img:"singkong.png" },
    { name:"Ubi", type:"Karbohidrat", img:"ubi.png" },

    { name:"Daging", type:"Protein", img:"daging.png" },
    { name:"Ikan", type:"Protein", img:"ikan.png" },
    { name:"Ayam", type:"Protein", img:"ayam.png" },
    { name:"Telur", type:"Protein", img:"telur.png" },
    { name:"Tempe", type:"Protein", img:"tempe.png" },
    { name:"Tahu", type:"Protein", img:"tahu.png" },
    { name:"Kacang Panjang", type:"Protein", img:"kacang-panjang.png" },
    { name:"Susu", type:"Protein", img:"susu.png" },

    { name:"Wortel", type:"Sayur", img:"wortel.png" },
    { name:"Bayam", type:"Sayur", img:"bayam.png" },
    { name:"Brokoli", type:"Sayur", img:"brokoli.png" },
    { name:"Labu Kuning", type:"Sayur", img:"labu.png" },
    { name:"Tomat", type:"Sayur", img:"tomat.png" },
    { name:"Terong", type:"Sayur", img:"terong.png" },

    { name:"Apel", type:"Buah", img:"apel.png" },
    { name:"Pisang", type:"Buah", img:"pisang.png" },
    { name:"Jeruk", type:"Buah", img:"jeruk.png" },
    { name:"Anggur", type:"Buah", img:"anggur.png" },
    { name:"Strawberry", type:"Buah", img:"strawberry.png" },
    { name:"Pepaya", type:"Buah", img:"pepaya.png" },
    { name:"Mangga", type:"Buah", img:"mangga.png" },
    { name:"Alpukat", type:"Buah", img:"alpukat.png" },
];

let selectedFood = null;

/**
 * plate selalu punya 4 slot
 * slot bisa diganti kapan saja
 */
let plate = [null, null, null, null];

/* ===============================
   LOAD FOOD (TAP FRIENDLY)
================================ */
function loadFoods() {
    const container = document.getElementById("foodSlider");
    container.innerHTML = "";

    foodsData.forEach(food => {
        const div = document.createElement("div");
        div.className = "food";

        div.innerHTML = `
            <img src="../assets/images/${food.img}" alt="${food.name}">
            <div class="food-name">${food.name}</div>
            <div class="food-type">${food.type}</div>
        `;

        /* TAP / CLICK */
        div.addEventListener("click", () => {
            document.querySelectorAll(".food").forEach(f => f.classList.remove("selected"));
            div.classList.add("selected");
            selectedFood = food;
        });

        container.appendChild(div);
    });
}

/* ===============================
   TAP ZONE PIRING
================================ */
document.querySelectorAll(".zone").forEach((zone, index) => {

    zone.addEventListener("click", () => {
        if (!selectedFood) return;

        // simpan tipe gizi
        plate[index] = selectedFood.type;

        zone.classList.add("filled");
        zone.innerHTML = `
            <div>
                <strong>${selectedFood.name}</strong><br>
                <small>(${selectedFood.type})</small>
            </div>
        `;
    });
});


function checkNutrition() {
    const score = document.getElementById("result-score");
    const reason = document.getElementById("result-reason");
    const suggestion = document.getElementById("result-suggestion");

    if (plate.includes(null)) {
        score.innerText = "Piring Belum Lengkap 🍽️";
        score.style.color = "#C62828";
        reason.innerText = "";
        suggestion.innerText = "Ayo lengkapi piringmu dengan 4 makanan agar tubuh mendapatkan gizi yang seimbang.";
        return;
    }

    const counts = {};
    plate.forEach(type => {
        counts[type] = (counts[type] || 0) + 1;
    });

    const types = Object.keys(counts);
    const dominant = types.filter(t => counts[t] > 1);
    const missing = ["Karbohidrat", "Protein", "Sayur", "Buah"].filter(t => !counts[t]);

    // ===== GIZI SEIMBANG =====
    if (types.length === 4) {
        score.innerText = "100% - Gizi Seimbang 🌟";
        score.style.color = "#2E7D32";
        reason.innerText =
            "Pilihan makananmu sudah sangat baik karena mengandung karbohidrat sebagai sumber energi, protein untuk pertumbuhan, serta sayur dan buah yang kaya vitamin dan serat.";
        suggestion.innerText =
            "Pola makan seperti ini membantu tubuh tetap sehat, kuat, dan berenergi sepanjang hari. Pertahankan ya!";
        return;
    }

    // ===== GIZI KURANG SEIMBANG =====
    score.style.color = "#F57C00";

    let explanation = "";

    if (dominant.length > 0) {
        explanation += `Kamu terlalu banyak memilih ${dominant.join(" dan ")}. `;
        explanation += `Jika dikonsumsi berlebihan, ${dominant.join(" dan ")} bisa menyebabkan tubuh menjadi kurang seimbang, seperti mudah lelah, berat badan naik, atau kekurangan vitamin tertentu. `;
    }

    if (missing.length > 0) {
        explanation += `Selain itu, tubuhmu kekurangan ${missing.join(" dan ")}. `;
        explanation += `Zat gizi ini penting karena membantu menjaga daya tahan tubuh, melancarkan pencernaan, dan mendukung pertumbuhan yang sehat. `;
    }

    explanation +=
        "Agar tubuh tetap sehat dan aktif, sebaiknya kamu mengombinasikan semua jenis gizi dalam piringmu.";

    score.innerText =
        types.length === 3
            ? "75% - Gizi Kurang Seimbang ⚠️"
            : types.length === 2
            ? "50% - Gizi Tidak Seimbang ❗"
            : "Gizi Sangat Tidak Seimbang ❌";

    reason.innerText = explanation;

    suggestion.innerText =
        "Coba tambahkan makanan dari jenis gizi yang belum ada agar tubuhmu mendapatkan nutrisi yang lengkap dan seimbang.";
}

/* ===============================
   RESET
================================ */
function resetPlate() {
    plate = [null, null, null, null];
    selectedFood = null;

    document.querySelectorAll(".zone").forEach(zone => {
        zone.classList.remove("filled");
        zone.innerHTML = "";
    });

    document.querySelectorAll(".food").forEach(f => f.classList.remove("selected"));

    document.getElementById("result-score").innerText = "";
    document.getElementById("result-reason").innerText = "";
    document.getElementById("result-suggestion").innerText = "";
}

/* INIT */
loadFoods();
