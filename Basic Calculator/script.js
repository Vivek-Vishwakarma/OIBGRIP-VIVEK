let screen = document.getElementById('screen')
let buttons = document.querySelectorAll('button')
let screenV = ''
const viewer = document.querySelector('.viewer')

for(item of buttons){
    item.addEventListener('click', (e) => {
        buttxt = e.target.innerText;
        if(buttxt == 'AC'){
            screenV = '';
            screen.value = screenV;
        }
        else if (buttxt == '=') {
            viewer.innerHTML = screenV
            screen.value = eval(screenV);
        }
        else if (buttxt == '^n') {
            buttxt = '**';
            screenV += buttxt;
            screen.value = screenV;
        }
        else if (buttxt == "BackSpace"){
            screen.value = screen.value.slice(0, - 1);
            screenV = screen.value;
        }
        else{
            screenV += buttxt;
            screen.value = screenV;
        }
    })
}