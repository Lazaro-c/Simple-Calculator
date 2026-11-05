const display = document.getElementById('display');

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    const { value, action } = button.dataset;
    console.log("Clicked:", value, action);

    if (action === 'clear') {
      display.value = '';
    } else if (action === 'calculate') {
      calculate();
    } else if (value !== undefined) {
    
      if (display.value === 'Error') display.value = '';
      display.value += value;
    }
  });
});

function calculate() {
  let expression = display.value;
  if (!expression) return;


  if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
    display.value = 'Error';
    return;
  }


  expression = expression.replace(/(?<![\d.])0+(?=\d)/g, '');

  try {
    const result = Function(`"use strict"; return (${expression})`)();
  
    display.value = Number.isFinite(result) ? Math.round(result * 1e10) / 1e10 : 'Error';
  } catch {
    display.value = 'Error';
  }
}
