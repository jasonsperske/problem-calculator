const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
let mode = 'receiving';
const secretFunctionMap = {
    '-/+': (x) => `-${x}`,
    '%': (x) => (eval(x) / 100).toString()
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.dataset.action === 'number' || button.dataset.action === 'operator') {
            if (mode === 'receiving') {
                display.value += button.textContent;
            } else if (mode === 'displaying') {
                display.value = button.textContent;
                mode = 'receiving';
            }
        } else if (button.dataset.action === 'mode') {
            const func = secretFunctionMap[button.textContent];
            if (func) {
                display.value = func(display.value);
                mode = 'displaying';
            }
        } else if (button.dataset.action === 'execute') {
            display.value = eval(display.value);
            mode = 'displaying';
        } else if (button.dataset.action === 'clear') {
            mode = 'receiving';
            display.value = '';
        }
    });
});