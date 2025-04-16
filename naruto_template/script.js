/*pegando os elementos do site para criação do script*/

/*os botões de próximo e anteior */
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
/*as thumbnail*/
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
/*a barra de tempo em cima do site*/
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;

/*variável de tempo limite de execução para usar a função setTimeout*/
let timeAutoNext = 7000;

/*quando o botão do próximo slide for clicado, ele vai para o próximo slide*/
nextDom.onclick = function(){
    showSlider('next');    
}

/*quando o botão do slide anterior for clicado, ele vai para o slide anterior*/
prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;

let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)


function showSlider(type){
    /*primeiro, vou obter a lista de todos os itens do controle deslizante e a lista de imagens*/
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    /*se o usuário clicar no próximo slide eu usarei o appendChild para adicionar um novo elemento onde será movido o primeiro item para o final de linha, seguindo a lógica, o segundo item será o primeiro*/
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }

    /*clearTimeout garante que cada vez que a função showSlider for executada, o tempo de contagem regressiva sempre começará do início*/
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);
+
    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}