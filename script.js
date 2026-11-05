const palavras = ["GATO", "AMOR", "CASA", "TERMO", "LIVRO", "PEDRA", "BRASIL", "JARDIM", "PLANTA", "CIDADE"];
let palavra, tentativa, coluna, fim;

iniciar();

function iniciar() {
    palavra = palavras[Math.floor(Math.random() * palavras.length)];
    tentativa = 0;
    coluna = 0;
    fim = false;

    document.getElementById("msg").innerText = "Digite com o teclado físico (Backspace apaga / Enter envia)";
    document.getElementById("btn").style.display = "none";
    
    const board = document.getElementById("board");
    board.innerHTML = "";
    for (let r = 0; r < 6; r++) {
        const linha = document.createElement("div");
        linha.className = "linha";
        for (let c = 0; c < palavra.length; c++) {
            linha.innerHTML += `<div class="celula" id="c-${r}-${c}"></div>`;
        }
        board.appendChild(linha);
    }
}

document.addEventListener("keydown", (e) => {
    if (fim) return;

    if (e.key === "Enter" && coluna === palavra.length) {
        verificar();
    } else if (e.key === "Backspace" && coluna > 0) {
        coluna--;
        document.getElementById(`c-${tentativa}-${coluna}`).innerText = "";
    } else if (e.key.length === 1 && e.key.match(/[a-z]/i) && coluna < palavra.length) {
        document.getElementById(`c-${tentativa}-${coluna}`).innerText = e.key.toUpperCase();
        coluna++;
    }
});

function verificar() {
    let palpite = "";
    for (let c = 0; c < palavra.length; c++) {
        palpite += document.getElementById(`c-${tentativa}-${c}`).innerText;
    }

    let copiaPalavra = palavra.split("");

    for (let i = 0; i < palavra.length; i++) {
        let el = document.getElementById(`c-${tentativa}-${i}`);
        if (palpite[i] === palavra[i]) {
            el.classList.add("correto");
            copiaPalavra[i] = null;
        }
    }

    for (let i = 0; i < palavra.length; i++) {
        let el = document.getElementById(`c-${tentativa}-${i}`);
        if (!el.classList.contains("correto")) {
            let index = copiaPalavra.indexOf(palpite[i]);
            if (index !== -1) {
                el.classList.add("errado");2
                copiaPalavra[index] = null;
            } else {
                el.classList.add("ausente");
            }
        }
    }

    if (palpite === palavra) {
        finalizar("Você acertou! 🎉");
    } else if (tentativa === 5) {
        finalizar(`Fim de jogo! A palavra era: ${palavra}`);
    } else {
        tentativa++;
        coluna = 0;
    }
}

function finalizar(txt) {
    fim = true;
    document.getElementById("msg").innerText = txt;
    document.getElementById("btn").style.display = "block";
}