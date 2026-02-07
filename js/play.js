const foodsData = [
    { name:"Nasi", type:"Karbohidrat", img:"nasi.png" },
    { name:"Roti", type:"Karbohidrat", img:"roti.png" },
    { name:"Kentang", type:"Karbohidrat", img:"kentang.png" },

    { name:"Ikan", type:"Protein", img:"ikan.png" },
    { name:"Ayam", type:"Protein", img:"ayam.png" },
    { name:"Telur", type:"Protein", img:"telur.png" },
    { name:"Tempe", type:"Protein", img:"tempe.png" },

    { name:"Wortel", type:"Sayur", img:"wortel.png" },
    { name:"Bayam", type:"Sayur", img:"bayam.png" },
    { name:"Brokoli", type:"Sayur", img:"brokoli.png" },

    { name:"Apel", type:"Buah", img:"apel.png" },
    { name:"Pisang", type:"Buah", img:"pisang.png" },
    { name:"Jeruk", type:"Buah", img:"jeruk.png" },
    { name:"Anggur", type:"Buah", img:"anggur.png" }
];

let draggedFood = null;

/**
 * plate akan selalu punya 4 slot
 * setiap slot bisa diganti kapan saja
 */
let plate = [null, null, null, null];

function loadFoods() {
    const container = document.getElementById("foods");
    container.innerHTML = "";

    foodsData.forEach(food => {
        const div = document.createElement("div");
        div.className = "food-item";
        div.draggable = true;

        div.innerHTML = `
            <img src="../assets/images/${food.img}">
            <div class="food-name">${food.name}</div>
            <div class="food-type">${food.type}</div>
        `;

        div.addEventListener("dragstart", () => {
            draggedFood = food;
        });

        container.appendChild(div);
    });
}

document.querySelectorAll(".zone").forEach((zone, index) => {

    zone.addEventListener("dragover", e => e.preventDefault());

    zone.addEventListener("drop", () => {
        if (!draggedFood) return;

        // GANTI isi slot (boleh overwrite)
        plate[index] = draggedFood.type;

        zone.classList.add("filled");
        zone.innerText = draggedFood.name;
    });
});

function checkNutrition() {
    const score = document.getElementById("result-score");
    const reason = document.getElementById("result-reason");
    const suggestion = document.getElementById("result-suggestion");

    if (plate.includes(null)) {
        score.innerText = "Lengkapi piring dengan 4 makanan.";
        score.style.color = "#C62828";
        reason.innerText = "";
        suggestion.innerText = "";
        return;
    }

    const counts = {};
    plate.forEach(type => {
        counts[type] = (counts[type] || 0) + 1;
    });

    const unique = Object.keys(counts).length;
    const dominant = Object.keys(counts).filter(k => counts[k] > 1);

    if (unique === 4) {
        score.innerText = "100% - Gizi Seimbang";
        score.style.color = "#2E7D32";
        reason.innerText = "Semua zat gizi terpenuhi secara seimbang.";
        suggestion.innerText = "Pertahankan pola makan ini.";
    }
    else if (unique === 3) {
        score.innerText = "75% - Gizi Kurang Seimbang";
        score.style.color = "#F9A825";
        reason.innerText = `${dominant.join(" dan ")} terlalu banyak.`;
        suggestion.innerText = "Kurangi yang berlebihan dan tambahkan jenis gizi yang belum ada.";
    }
    else if (unique === 2) {
        score.innerText = "50% - Gizi Tidak Seimbang";
        score.style.color = "#EF6C00";
        reason.innerText = `${dominant.join(" dan ")} sangat mendominasi.`;
        suggestion.innerText = "Tambahkan sayur dan buah untuk menyeimbangkan gizi.";
    }
    else {
        score.innerText = "Gizi Sangat Tidak Seimbang";
        score.style.color = "#C62828";
        reason.innerText = "Hanya satu jenis gizi yang dikonsumsi.";
        suggestion.innerText = "Tambahkan protein, sayur, dan buah.";
    }
}

function resetPlate() {
    plate = [null, null, null, null];

    document.querySelectorAll(".zone").forEach(zone => {
        zone.classList.remove("filled");
        zone.innerText = "";
    });

    document.getElementById("result-score").innerText = "";
    document.getElementById("result-reason").innerText = "";
    document.getElementById("result-suggestion").innerText = "";
}

loadFoods();
