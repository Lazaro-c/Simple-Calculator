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
      // Wipe an old "Error" before typing a new number
      if (display.value === 'Error') display.value = '';
      display.value += value;
    }
  });
});

function calculate() {
  let expression = display.value;
  if (!expression) return;

  // Only allow digits, operators, brackets, decimal points and spaces
  if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
    display.value = 'Error';
    return;
  }

  // Remove leading zeros ("05" becomes "5") but keep "0.5" and "100"
  expression = expression.replace(/(?<![\d.])0+(?=\d)/g, '');

  try {
    const result = Function(`"use strict"; return (${expression})`)();
    // Round to avoid results like 0.30000000000000004
    display.value = Number.isFinite(result) ? Math.round(result * 1e10) / 1e10 : 'Error';
  } catch {
    display.value = 'Error';
  }
}
