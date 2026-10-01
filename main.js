const musica = [
    {
        nome: "Minha música",
        artista: "Meu artista",
        arquivo: "musicas/musica1.mp3"
    },
    {
        nome: "Outra música",
        artista: "Outro artista",
        arquivo: "musicas/musica2.mp3"
    },
    {
        nome: "Terceira música",
        artista: "Outro artista",
        arquivo: "musicas/musica3.mp3"
    }
];

let musicaAtual = 0;

const audio = new Audio(musica[musicaAtual].arquivo);

const botao = document.querySelector("#PlayPause");
const botaoProxima = document.querySelector("#Proxima");
const botaoAnterior = document.querySelector("#Anterior");
const progresso = document.querySelector("#progresso");
const playButton = document.querySelector("#PlayButton");
const tempo = document.querySelector("#tempo");
const volume = document.querySelector("#volume");
let duracaoTotal = 0;
playButton.addEventListener("click", function() {
    audio.play();

    });

const nomeMusica = document.querySelector("#NomeMusica");

nomeMusica.textContent = musica[musicaAtual].nome;
const nomeArtista = document.querySelector("#NomeArtista");
nomeArtista.textContent = musica[musicaAtual].artista;

botao.addEventListener("click", function() {

    if (audio.paused) {
        audio.play();
        botao.textContent = "Pause";
    } else {
        audio.pause();
        botao.textContent = "Play";
    }

});

botaoProxima.addEventListener("click", function() {

    if (musicaAtual < musica.length - 1) {

        musicaAtual++;

        audio.src = musica[musicaAtual].arquivo;
        nomeMusica.textContent = musica[musicaAtual].nome;
        nomeArtista.textContent = musica[musicaAtual].artista;

        audio.play();
    }

});

botaoAnterior.addEventListener("click", function() {

    if (musicaAtual > 0) {

        musicaAtual--;

        audio.src = musica[musicaAtual].arquivo;
        nomeMusica.textContent = musica[musicaAtual].nome;
        nomeArtista.textContent = musica[musicaAtual].artista;

        audio.play();
    }

});

audio.addEventListener("ended", function() {
    if (musicaAtual < musica.length - 1) {
        musicaAtual++;
        audio.src = musica[musicaAtual].arquivo;
        nomeMusica.textContent = musica[musicaAtual].nome;
        nomeArtista.textContent = musica[musicaAtual].artista;
        audio.play();
    }
});

audio.addEventListener("timeupdate", function() {
    const progressoAtual = (audio.currentTime / audio.duration) * 100;
    progresso.value = progressoAtual;

    const minutos = Math.floor(audio.currentTime / 60);
    const segundos = Math.floor(audio.currentTime % 60);

    const segundosFormatados = segundos < 10 ? "0" + segundos : segundos;

    const minutosTotal = Math.floor(duracaoTotal / 60);
    const segundosTotal = Math.floor(duracaoTotal % 60);

    const segundosTotalFormatados = segundosTotal < 10 ? "0" + segundosTotal : segundosTotal;

    tempo.textContent = minutos + ":" + segundosFormatados + " / " + minutosTotal + ":" + segundosTotalFormatados;
});

audio.addEventListener("loadedmetadata", function() {
    const minutosTotal = Math.floor(audio.duration / 60);

    const segundosTotal = Math.floor(audio.duration % 60);

    const segundosFormatados = segundosTotal < 10 ? "0" + segundosTotal : segundosTotal;
    tempo.textContent = minutosTotal + ":" + segundosFormatados;

    duracaoTotal = audio.duration;
    
});

progresso.addEventListener("input", function() {
    const novoTempo = (progresso.value / 100) * audio.duration;
    audio.currentTime = novoTempo;
});

volume.addEventListener("input", function() {
    audio.volume = volume.value / 100;
});

document.addEventListener("keydown", function(event) {

    if (event.code === "Space") {

        if (audio.paused) {
            audio.play();
            botao.textContent = "Pause";
        } else {
            audio.pause();
            botao.textContent = "Play";
        }

    }

});