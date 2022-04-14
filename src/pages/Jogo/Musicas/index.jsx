import React from "react";
import { useControle, useMusica } from "../../../hooks";
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
    mostraModal,
    proximaEtapa,
    atualizaPontos,
  } = useControle();
  const { jogadorAtual, faseAtual } = dadosJogo?.andamento;
  const perguntaAtual = dadosJogo?.perguntas[jogadorAtual][faseAtual];
  const [resposta, setResposta] = React.useState();
  const [musicaAtiva, setMusicaAtiva] = React.useState();
  const {tocando, alterna, para} = useMusica(musicaAtiva?.url);

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

  React.useMemo(() => {
    if(!mostraModal && musicaAtiva && tocando) {
      alterna();
    }
  }, [mostraModal]);

  return(
    <div className={styles.musicas}>
      {dadosJogo && (
      <>
        {Object.entries(dadosJogo?.musicas).map(([numero, musica]) => (
          musica && 
            <Botao
              key={numero}
              name={numero}
              onClick={() => {ativaMusica({...musica, numero: numero})}}
              disabled={musica?.tocada}
            >
              Música {numero}
            </Botao>
        ))}
      </>
    )}

      <Modal>
        <h2>Música {musicaAtiva?.numero}</h2>
        <div className={styles.player}>
          <button onClick={alterna}>Play/Pause</button>
          <button onClick={para}>Stop</button>
        </div>
        <br/>
        <div className={styles.slotBotoesModal}>
          <Botao complementar onClick={() => {escolhaPerguntaFinal()}}>Errou</Botao>
          <Botao onClick={() => {escolhaPerguntaFinal(true)}}>Acertou</Botao>
        </div>
      </Modal>
    </div>
  )
}