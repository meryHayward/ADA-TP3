const load = () =>{
    const modal = document.querySelector('.modal');
    const backgroundModal = document.querySelector('.background-modal')
    const btnModalClose = document.querySelector('#btn-modal-close')

    document.getElementById('btn-modal').addEventListener('click',function(){
        backgroundModal.style.display = "block";
        modal.style.top = "0";
        modal.style.right = "50";
    });

    document.getElementById('btn-modal-close').addEventListener('click',function(){
        backgroundModal.style.display = "none";
        modal.style.top = "-1000px";
        modal.style.right = "50";
    });
}