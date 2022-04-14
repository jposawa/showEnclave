import React from "react";
import { useControle } from "../../../hooks/controle.jsx";
import {Botao, Modal} from "../../../components";

import styles from "./styles.module.css";

export default function Musicas() {
  const { 
    configJogo, 
    dadosJogo,
    setDadosJogo,
    copiaDadosJogo,
    formataTextoPontos, 
    ajustaNomeDificuldade, 
    verificaRespostaPontos,
    mostraProximo,
    setMostraProximo,
    proximaFase,
    setMostraModal,
    proximaEtapa,
    atualizaPontos,
  } = useControle();
  const { jogadorAtual, faseAtual } = dadosJogo?.andamento;
  const perguntaAtual = dadosJogo?.perguntas[jogadorAtual][faseAtual];
  const [resposta, setResposta] = React.useState();
  const [musicaAtiva, setMusicaAtiva] = React.useState();

  const ativaMusica = (musica) => {
    setMusicaAtiva(musica);
    setMostraModal(!!musica);
  }

  const aplicaResultado = (acertou) => {
    const _musicaAtiva = {...musicaAtiva};
    const _dadosJogo = copiaDadosJogo();
    let modPonto = configJogo?.pontos.musicas.padrao;
    
    _musicaAtiva.tocada = true;
    _dadosJogo.musicas[musicaAtiva.numero] = {..._musicaAtiva};

    if(!acertou) {
      modPonto *= configJogo?.pontos.musicas.proporcaoPerda;
    }

    atualizaPontos(modPonto, _dadosJogo);
  }

  return(
    <div className={styles.musicas}>
      {dadosJogo && (
      <>
        {Object.entries(dadosJogo?.musicas).map(([numero, musica]) => (
          <>
            {musica && 
              <Botao
                key={numero}
                name={numero}
                onClick={() => {ativaMusica({...musica, numero: numero})}}
                disabled={musica?.tocada}
              >
                Música {numero}
              </Botao>
            }
          </>
        ))}
      </>
    )}

      <Modal>
        <h2>Música {musicaAtiva?.numero}</h2>
        <p><button>Play/Stop</button></p>
        <br/>
        <div className={styles.slotBotoesModal}>
          <Botao complementar onClick={() => {escolhaPerguntaFinal()}}>Não</Botao>
          <Botao onClick={() => {escolhaPerguntaFinal(true)}}>Sim</Botao>
        </div>
      </Modal>
    </div>
  )
}