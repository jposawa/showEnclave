import React from "react";
import { useControle } from "../../../hooks/controle.jsx";
import {Botao} from "../../../components";

import styles from "./styles.module.css";

export default function Perguntas() {
  const { 
    configJogo, 
    dadosJogo, 
    formataTextoPontos, 
    ajustaNomeDificuldade, 
    verificaRespostaPontos,
    mostraProximo,
    setMostraProximo,
  } = useControle();
  const { jogadorAtual, faseAtual } = dadosJogo?.andamento;
  const perguntaAtual = dadosJogo?.perguntas[jogadorAtual][faseAtual];
  const [resposta, setResposta] = React.useState();

  const alteraResposta = (respostaInformada) => {
    if(!mostraProximo){
      setResposta(respostaInformada !== resposta ? respostaInformada : undefined);
    }
  }
  
  return (
    <div className={styles.perguntas}>
      {dadosJogo && (
      <>
        <header>
          <h2>
            Pergunta {faseAtual} - {ajustaNomeDificuldade(perguntaAtual?.dificuldade)}
          </h2>
          
          <h3>[{configJogo?.pontos?.perguntas[perguntaAtual?.dificuldade]}]</h3>
        </header>
        
        <section className={styles.corpoPergunta}>
          <div className={styles.enunciado}>
            {perguntaAtual.enunciado}
          </div>
          
          <div className={styles.slotAlternativas}>
            {Object.entries(perguntaAtual.opcoes).map(([letra, opcao]) => (
              <Botao
                key={letra}
                name={letra}
                secundario={letra === resposta}
                className={letra === resposta ? styles.respostaAtiva : undefined}
                onClick={() => {alteraResposta(letra)}}
              >
                {opcao.texto}
              </Botao>
            ))}
          </div>
        </section>
        
        <section className={styles.slotBotoes}>
          <Botao
            className={`${styles.btnConfirma} ${resposta && !mostraProximo ? undefined : "oculto"}`}
            largura="7rem"
            onClick={() => {verificaRespostaPontos(resposta, styles)}}
          >
            CONFIRMAR
          </Botao>
          <Botao
            className={mostraProximo ? undefined : "oculto"}
            largura="7rem"
          >
            PRÓXIMA
          </Botao>
        </section>
      </>
      )}
    </div>
  )
}