// Aparecer o total mesmo sem a porcentagem ser inserida
// Organizar o código (variáveis, funções, etc)
// Adicionar comentários ✅
// Melhorar as funções
// Diminuir a repetição de código
// Alterar algumas regras de estilização


const bill = document.querySelector("#bill");
const botoes = document.querySelectorAll(".botao");
const customPercentage = document.querySelector("#percentage");
const qtdPessoas = document.querySelector("#people");
const invalidMessage = document.querySelector("#invalidMessage");
let tip = document.querySelector("#tip");
let total = document.querySelector("#total");
const reset = document.querySelector("#reset");

// Mostra a mensagem de erro caso qtdPessoas <= 0
qtdPessoas.addEventListener("input", () => {
  // Se a quantidade de pessoas for < 1 faz o display de uma mensagem de erro
  if (qtdPessoas.value <= 0) {
    invalidMessage.style.display = "block";
    qtdPessoas.style.outline = "2px solid rgba(255, 0, 0, 0.8)";
  } else { // Caso contrário a mensagem de erro se mantém oculta
    invalidMessage.style.display = "none";
    qtdPessoas.style.outline = "";
  }
});

// Calcula o resultado final e coloca no HTML
result = () => {
  // Coleta a porcentagem selecionada na função selecionarBotao()
  let porcentagem = document.querySelector(".selecionado");

  //Se a porcentagem tiver um value (ou seja, estiver um input), pega o value
  if (porcentagem.value) {
    porcentagem = porcentagem.value;
  } else { // caso contrário, pega o texto dentro da tag do começo até o penúltimo digito da tag = slice(0/começo, -1/ignora o último digito)
    porcentagem = porcentagem.outerText.slice(0, -1);
  }

  // se a quantidade de pessoas for > 0...
  if (qtdPessoas.value > 0) {
    // pega os valores, converte pra numero, faz a equação e arredonda pra decimal 
    tip.innerHTML =
      "$ " +
      ((+porcentagem * +bill.value) / +qtdPessoas.value / 100).toFixed(2);
    // pega o valor da gorjeta, soma com a conta e divide pra cada pessoa arredondando pra decimal 
    total.innerHTML =
      "$ " +
      ((+tip.outerText.slice(1) + +bill.value) / qtdPessoas.value).toFixed(2);
  } else { // caso contrário, mantem os valores zerados
    tip.innerHTML = "$ 0.00";
    total.innerHTML = "$ 0.00";
  }
};

//Coletar o botão selecionado
function selecionarBotao() {
  for (let i = 0; i < botoes.length; i++) { // vai em cada botão e tenta escutar um click, caso escute
    botoes[i].addEventListener("click", () => {
      for (let j = 0; j < botoes.length; j++) { // percorre os botões dnv
        if (botoes[j] == botoes[i]) {  // se o botão clicado e o botão percorrido forem iguais, ele adiciona a tag selecionado
          botoes[j].classList.add("selecionado");
        } else { // se não, ele remove a classe selecionado
          botoes[j].classList.remove("selecionado");
        }
      }
      result(); // e chama a função pra fazer o calculo
    });
  }
}

// para pra escutar por mudanças na calculadora
bill.addEventListener("input", result);
qtdPessoas.addEventListener("input", result);
customPercentage.addEventListener("input", result);
selecionarBotao();

//Reseta o site respectivamente: porcentagem customizada, conta, qtd de Pessoas, calculo da gorjeta e do total, algumas estilizações e os botões selecionados.
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
