// === JOGO DE TRILHA (perguntas, acerto = avança uma casa) ===
const perguntas = [
    { texto: "Qual prática ajuda a economizar água na agricultura?", alternativas: ["Irrigação por aspersão sem controle", "Irrigação por gotejamento", "Deixar a água correndo livre"], correta: 1 },
    { texto: "O que é agricultura sustentável?", alternativas: ["Produzir sem se preocupar com o meio ambiente", "Produzir alimentos preservando recursos naturais", "Usar muitos agrotóxicos"], correta: 1 },
    { texto: "Qual destes é um impacto negativo do desmatamento?", alternativas: ["Aumento da biodiversidade", "Perda de solo fértil", "Melhora na qualidade da água"], correta: 1 },
    { texto: "Como as queimadas afetam o solo?", alternativas: ["Tornam o solo mais fértil permanentemente", "Destroem nutrientes e micro-organismos", "Não causam danos"], correta: 1 },
    { texto: "Qual é uma fonte de energia renovável ideal para o campo?", alternativas: ["Carvão mineral", "Energia solar", "Diesel"], correta: 1 }
];

let perguntaAtual = 0;
let progresso = 0;      // 0 a 5 (casas avançadas)
let jogoAtivo = false;
let aguardandoProxima = false;

const personagem = document.getElementById("personagem");
const progressoElem = document.getElementById("progresso");
const perguntaTexto = document.getElementById("perguntaTexto");
const alternativasDiv = document.getElementById("alternativas");
const btnProximo = document.getElementById("btnProximo");
const btnIniciar = document.getElementById("btnIniciarJogo");
const btnReiniciar = document.getElementById("btnReiniciar");
const mensagemFinalDiv = document.getElementById("mensagemFinal");

function atualizarPosicao() {
    const porcentagem = (progresso / 5) * 90;
    personagem.style.left = `${porcentagem}%`;
    progressoElem.innerText = progresso;
    if (progresso >= 5) finalizarJogo(true);
}

function exibirPergunta() {
    if (perguntaAtual >= perguntas.length) {
        if (progresso < 5) finalizarJogo(false);
        return;
    }
    const p = perguntas[perguntaAtual];
    perguntaTexto.innerText = p.texto;
    alternativasDiv.innerHTML = "";
    p.alternativas.forEach((alt, idx) => {
        const botao = document.createElement("button");
        botao.innerText = alt;
        botao.addEventListener("click", () => responder(idx));
        alternativasDiv.appendChild(botao);
    });
    btnProximo.style.display = "none";
    aguardandoProxima = false;
}

function responder(respostaIndex) {
    if (!jogoAtivo || aguardandoProxima) return;
    const acertou = (respostaIndex === perguntas[perguntaAtual].correta);
    if (acertou) {
        if (progresso < 5) {
            progresso++;
            atualizarPosicao();
            mensagemFinalDiv.innerText = "✅ Acertou! Você avançou uma casa!";
            setTimeout(() => { if (mensagemFinalDiv.innerText.includes("Acertou")) mensagemFinalDiv.innerText = ""; }, 1500);
        }
        perguntaAtual++;
        if (progresso < 5 && perguntaAtual < perguntas.length) {
            aguardandoProxima = true;
            btnProximo.style.display = "block";
        } else if (progresso >= 5) {
            finalizarJogo(true);
        } else if (perguntaAtual >= perguntas.length && progresso < 5) {
            finalizarJogo(false);
        }
    } else {
        mensagemFinalDiv.innerText = "❌ Resposta errada! Tente na próxima.";
        setTimeout(() => { if (mensagemFinalDiv.innerText.includes("Resposta errada")) mensagemFinalDiv.innerText = ""; }, 1500);
        perguntaAtual++;
        if (perguntaAtual < perguntas.length) {
            aguardandoProxima = true;
            btnProximo.style.display = "block";
        } else if (progresso < 5) {
            finalizarJogo(false);
        }
    }
}

btnProximo.addEventListener("click", () => {
    if (jogoAtivo && perguntaAtual < perguntas.length) exibirPergunta();
    else if (perguntaAtual >= perguntas.length && progresso < 5) finalizarJogo(false);
});

function finalizarJogo(venceu) {
    jogoAtivo = false;
    if (venceu) {
        mensagemFinalDiv.innerHTML = "🏆 PARABÉNS! Você chegou ao final da trilha sustentável! 🏆<br>Lembre-se: pequenas atitudes preservam o meio ambiente.";
    } else {
        mensagemFinalDiv.innerHTML = "😓 Você não conseguiu chegar ao final. Clique em Reiniciar para tentar novamente e aprender mais!";
    }
    perguntaTexto.innerText = "Jogo finalizado. Clique em Reiniciar para jogar novamente.";
    alternativasDiv.innerHTML = "";
    btnProximo.style.display = "none";
}

function iniciarJogo() {
    perguntaAtual = 0;
    progresso = 0;
    jogoAtivo = true;
    atualizarPosicao();
    mensagemFinalDiv.innerHTML = "";
    exibirPergunta();
}

function reiniciarJogo() {
    iniciarJogo();
}

btnIniciar.addEventListener("click", iniciarJogo);
btnReiniciar.addEventListener("click", reiniciarJogo);

// Acessibilidade
let tamanhoFonte = 100;
function ajustarFonte(delta) {
    let novo = tamanhoFonte + delta;
    if (novo >= 80 && novo <= 150) {
        tamanhoFonte = novo;
        document.body.style.fontSize = tamanhoFonte + "%";
    }
}
document.getElementById("btnAumentarFonte").addEventListener("click", () => ajustarFonte(10));
document.getElementById("btnDiminuirFonte").addEventListener("click", () => ajustarFonte(-10));
document.getElementById("btnAltoContraste").addEventListener("click", () => {
    document.body.classList.toggle("alto-contraste");
});

// Inicialização
jogoAtivo = false;
progresso = 0;
atualizarPosicao();
