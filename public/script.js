const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
let workingMessage = "...Working...";
let mode = "receiving";
const secretFunctionMap = {
  "+/-": (x) => evaluate(`-(${x})`),
  "%": (x) => evaluate(`${x} / 100`),
};

function evaluate(text) {
  display.value = workingMessage;
  const buttons = document.querySelectorAll("button[data-action='number']");
  const randomButton = buttons[Math.floor(Math.random() * buttons.length)];

  fetch("/evaluate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, randomButton: randomButton.textContent }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.evaluation.answer) {
        display.value = data.evaluation.answer;
      } else {
        display.value = "ERROR!";
        console.error(data.error);
      }
      if (data.evaluation.button) {
        randomButton.textContent = data.evaluation.button;
      }
      if (data.evaluation.message) {
        workingMessage = data.evaluation.message;
      }
    });
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (
      button.dataset.action === "number" ||
      button.dataset.action === "operator"
    ) {
      if (mode === "receiving") {
        display.value += button.textContent;
      } else if (mode === "displaying") {
        display.value = button.textContent;
        mode = "receiving";
      }
    } else if (button.dataset.action === "mode") {
      const func = secretFunctionMap[button.textContent];
      if (func) {
        func(display.value);
        mode = "displaying";
      }
    } else if (button.dataset.action === "execute") {
      evaluate(display.value);
      mode = "displaying";
    } else if (button.dataset.action === "clear") {
      mode = "receiving";
      display.value = "";
    }
  });
});
