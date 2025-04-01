// Carrossel
var doubtElements = document.querySelectorAll(".duvida");

doubtElements.forEach(function (duvida) {
  duvida.addEventListener("click", function () {
    duvida.classList.toggle("ativa");
  });
});

const imagesCarrossel = document.getElementById("img-div");
const images = document.querySelectorAll("#img-div .img-e");
let idx = 0;
const intervalo = 1800;

function carrossel() {
  idx++;

  if (idx >= images.length) {
    idx = 0; // Volta para a primeira imagem sem espaço em branco
  }

  images.forEach((img, i) => {
    img.style.display = i === idx ? "block" : "none"; // Mostra apenas a imagem atual
  });
}

setInterval(carrossel, intervalo);

//--------------------------------------------------------------------

//função trocar cor
function toggleScheme() {
  const body = document.body;
  const isDark = body.classList.toggle("dark");

  if (isDark) {
    body.classList.remove("light");
    localStorage.setItem("colorScheme", "dark");
  } else {
    body.classList.add("light");
    localStorage.setItem("colorScheme", "light");
  }
}

// tema inicial
(function initializeScheme() {
  const savedScheme = localStorage.getItem("colorScheme") || "light";
  document.body.classList.add(savedScheme);
})();

// ---------------------------------------------------------------------
// função viaCEP
async function buscarEndereco(cep) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!response.ok) {
      throw new Error("Erro ao buscar o endereço");
    }
    const data = await response.json();
    if (data.erro) {
      exibirMensagem("CEP não encontrado.", "red");
      return;
    }

    // Preenchendo os campos
    document.getElementById("endereco").value = data.logradouro || "";
    document.getElementById("bairro").value = data.bairro || "";
    document.getElementById("cidade").value = data.localidade || "";
    document.getElementById("estado").value = data.uf || "";

    // Validando o estado
    validarEstado(data.uf);
  } catch (error) {
    console.error("Erro:", error);
    exibirMensagem(
      "Erro ao buscar o CEP. Verifique o formato e tente novamente.",
      "red"
    );
  }
}

function validarEstado(estado) {
  const mensagem = document.getElementById("mensagem");
  if (estado.toUpperCase() !== "SP") {
    exibirMensagem(
      "No momento, não atendemos regiões fora do estado de São Paulo.",
      "red"
    );
  } else {
    exibirMensagem("Atendemos sua região!", "green");
  }
}

function exibirMensagem(texto, cor) {
  const mensagem = document.getElementById("mensagem");
  mensagem.textContent = texto;
  mensagem.style.color = cor;
  mensagem.style.display = "block";
}

function onCepBlur(event) {
  const cep = event.target.value.replace(/\D/g, "");
  if (cep.length === 8) {
    buscarEndereco(cep);
  } else {
    exibirMensagem("CEP inválido. Insira um CEP com 8 dígitos.", "red");
  }
}

// ------------------------------------
// função mandar form de contato
const form = document.getElementById("contact-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("eemail").value;
  const message = document.getElementById("message").value;
  const emailBody = `${message}\n\nDados do contato:\nNome: ${name}\nE-mail: ${email}`;

  window.location.href = `mailto:gbwrapcampinas@gmail.com?subject=Contato de ${encodeURIComponent(
    name
  )}&body=${encodeURIComponent(emailBody)}`;
});
