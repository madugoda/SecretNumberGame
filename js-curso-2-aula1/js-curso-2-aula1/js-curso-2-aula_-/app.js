//query.Selector seleciona o que eu quero do html
//innerHTML insere no HTML o texto que eu quero
let numerosSorteados = [];
let numeroLimite =  10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//função com parâmetro e sem retorno
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag)
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

exibirTextoNaTela('h1', 'Jogo do Número Secreto');
exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);

//função sem parâmetro e sem retorno
function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
    exibirTextoNaTela('h1', 'PARABÉNS');
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagem = `Você descobriu o número secreto em ${tentativas} ${palavraTentativa}!`;
    exibirTextoNaTela('p', mensagem);
    document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', `O número é menor que ${chute}`);
        } else {
            exibirTextoNaTela('p', `O número é maior que ${chute}`);
        }
        tentativas++;
        limparCampo();
    }
}

//função sem parâmetro e com retorno
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = numerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite){
        numerosSorteados = [];
    }

    if (numerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        numerosSorteados.push(numeroEscolhido);
        console.log(numerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciar(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagensIniciais();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

function exibirMensagensIniciais(){
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);
}

