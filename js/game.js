let dragged = null;
document.querySelectorAll('.food').forEach(f=>{
    f.addEventListener('dragstart',()=>dragged=f.dataset.type);
});

document.querySelectorAll('.dropzone').forEach(zone=>{
    zone.addEventListener('dragover',e=>e.preventDefault());
    zone.addEventListener('drop',()=>{
        if(zone.dataset.zone===dragged){
            zone.innerHTML="✔ Benar";
            zone.style.background="#C8E6C9";
        }
    });
});
