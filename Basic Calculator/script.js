let screen = document.getElementById('screen')
let buttons = document.querySelectorAll('button')
let screenV = ''
for(item of buttons){
    item.addEventListener('click', (e) => {
        buttxt = e.target.innerText;
        //console.log('Button text is ', buttxt);
        if(buttxt == 'AC'){
            screenV = '';
            screen.value = screenV;
        }
        else if (buttxt == '=') {
            screen.value = eval(screenV);
        }
        else if (buttxt == '^n') {
            buttxt = '**';
            screenV += buttxt;
            screen.value = screenV;
        }
        else if (buttxt == 'BackSpace'){
            screen.value = screen.value.slice(0, - 1);
            screenV = screen.value;
        }
        else{
            screenV += buttxt;
            screen.value = screenV;
        }
    })
}