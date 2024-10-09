// Aparecer o total mesmo sem a porcentagem ser inserida
// Organizar o código (variáveis, funções, etc)
// Melhorar as funções
// Diminuir a repetição de código
// Alterar algumas regras de estilização


// Mostra a mensagem de erro caso qtdPessoas <= 0
const qtdPessoas = document.querySelector("#people");
const invalidMessage = document.querySelector("#invalidMessage");

qtdPessoas.addEventListener("input", () => {
  if (qtdPessoas.value <= 0) {
    invalidMessage.style.display = "block";
    qtdPessoas.style.outline = "2px solid rgba(255, 0, 0, 0.8)";
  } else {
    invalidMessage.style.display = "none";
    qtdPessoas.style.outline = "";
  }
});

const bill = document.querySelector("#bill");
const customPercentage = document.querySelector("#percentage");
let tip = document.querySelector("#tip");
let total = document.querySelector("#total");
result = () => {
  let porcentagem = document.querySelector(".selecionado");

  if (porcentagem.value) {
    porcentagem = porcentagem.value;
  } else {
    porcentagem = porcentagem.outerText.slice(0, -1);
  }

  if (qtdPessoas.value > 0) {
    tip.innerHTML =
      "$ " +
      ((+porcentagem * +bill.value) / +qtdPessoas.value / 100).toFixed(2);
    total.innerHTML =
      "$ " +
      ((+tip.outerText.slice(1) + +bill.value) / qtdPessoas.value).toFixed(2);
  } else {
    tip.innerHTML = "$ 0.00";
    total.innerHTML = "$ 0.00";
  }
};

//Coletar o botão selecionado
const botoes = document.querySelectorAll(".botao");

function selecionarBotao() {
  for (let i = 0; i < botoes.length; i++) {
    botoes[i].addEventListener("click", () => {
      for (let j = 0; j < botoes.length; j++) {
        if (botoes[j] == botoes[i]) {
          botoes[j].classList.add("selecionado");
        } else {
          botoes[j].classList.remove("selecionado");
        }
      }
      result();
    });
  }
}

bill.addEventListener("input", result);
qtdPessoas.addEventListener("input", result);
customPercentage.addEventListener("input", result);
selecionarBotao();

//Resetar o valor da conta
const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
  customPercentage.value = "";
  bill.value = "";
  qtdPessoas.value = 1;
  tip.innerHTML = "$ 0.00";
  total.innerHTML = "$ 0.00";

  customPercentage.style.outline = " ";

  invalidMessage.style.display = "none";
  qtdPessoas.style.outline = "";
  for (let i = 0; i < botoes.length; i++) {
    if (botoes[i].classList.contains("selecionado")) {
      botoes[i].classList.remove("selecionado");
    }
  }

});
