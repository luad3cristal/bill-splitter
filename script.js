// Alterar algumas regras de estilização

const bill = document.querySelector("#bill");
const botoes = document.querySelectorAll(".botao");
const customPercentage = document.querySelector("#percentage");
const qtdPessoas = document.querySelector("#people");
const invalidMessage = document.querySelector("#invalidMessage");
let tip = document.querySelector("#tip");
let total = document.querySelector("#total");
const resetButton = document.querySelector("#reset");

// Mostra a mensagem de erro caso qtdPessoas > 0
qtdPessoas.addEventListener("input", () => {
  const validacao = qtdPessoas.value > 0;
  // Mostra a mensagem de erro
  !validacao
    ? (invalidMessage.style.display = "block")
    : (invalidMessage.style.display = "none");
  // Muda a estilização do input
  !validacao
    ? (qtdPessoas.style.outline = "2px solid rgba(255, 0, 0, 0.8)")
    : (qtdPessoas.style.outline = "");
});

// Calcula o resultado final e coloca no HTML
function result() {
  // Testa se existe uma tag com a classe seleiconado, e tenta pegar o value da porcentagem, o conteúdo da tag ou o valor do input.
  let porcentagem = document.querySelector(".selecionado");
  porcentagem =
    porcentagem?.value ||
    porcentagem?.textContent.slice(0, -1) ||
    customPercentage.value;

  // Se a qtdPessoas > 0, faz o display do valor a ser pago
  if (qtdPessoas.value > 0) {
    tip.textContent = `$ ${(
      (+porcentagem * +bill.value) /
      +qtdPessoas.value /
      100
    ).toFixed(2)}`;

    total.textContent = `$ ${(
      (+tip.textContent.slice(1) + +bill.value) /
      +qtdPessoas.value
    ).toFixed(2)}`;
  } else {
    // Se não, mantém zerado
    tip.textContent = "$ 0.00";
    total.textContent = "$ 0.00";
  }
}

//Coleta o botão selecionado
botoes.forEach((botao) => {
  // vai em cada botão e tenta escutar um click, caso escute
  botao.addEventListener("click", () => {
    botoes.forEach((b) => b.classList.remove("selecionado"));

    botao.classList.add("selecionado");

    customPercentage.value = ""; // Se um botao for selecionado, limpa a porcentagem do input

    result(); // e chama a função pra fazer o calculo
  });
});

// Reseta a calculadora para o padrão
function reset() {
  // Reseta os valores dos inputs
  customPercentage.value = "";
  bill.value = "";
  qtdPessoas.value = 1;

  // Reseta os valores exibidos
  tip.textContent = "$ 0.00";
  total.textContent = "$ 0.00";

  // Oculta mensagem de erro e limpa estilização
  invalidMessage.style.display = "none";
  qtdPessoas.style.outline = "";

  // Remove a classe 'selecionado' de qualquer botão ativo
  botoes.forEach((botao) => botao.classList.remove("selecionado"));
}

//Procura por mudanças na calculadora
bill.addEventListener("input", result);
qtdPessoas.addEventListener("input", result);
customPercentage.addEventListener("input", result);
resetButton.addEventListener("click", reset);
