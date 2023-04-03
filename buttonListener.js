const swBtn = document.getElementById('swichButtn');

export const buttonListener = (...events) => {
    events.forEach((event) => {
        swBtn.addEventListener('click', event);
        console.log('buttonListener is active')
    })
    
}