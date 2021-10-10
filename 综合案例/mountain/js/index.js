const bg=document.querySelector('.bg');
document.addEventListener('scroll',function(){
    const scrollY = window.scrollY;
    if(scrollY != 0){
        bg.style.backgroundPosition = `calc(50% + ${scrollY}px) calc(50% + ${scrollY}px)`
    }else{
        bg.style.backgroundPosition = ''
    }
    // console.log(bg.style.backgroundPositionX);
})