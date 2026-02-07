function check(el,status){
    document.querySelectorAll('.option').forEach(o=>{
        o.style.pointerEvents='none';
    });

    if(status==='benar'){
        el.style.background='#C8E6C9';
        result.innerHTML='Jawaban benar!';
    }else{
        el.style.background='#FFCDD2';
        result.innerHTML='Jawaban kurang tepat.';
    }
}
