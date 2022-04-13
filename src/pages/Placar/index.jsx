import React from "react";
import { useControle } from "../../hooks/controle.jsx";

import styles from "./styles.module.css";

export default function Placar() {
  const { dadosJogo } = useControle();
  const vencendo = dadosJogo?.jogadores?.jogador1?.pontos > dadosJogo?.jogadores?.jogador2?.pontos ? "jogador1" : dadosJogo?.jogadores?.jogador1?.pontos < dadosJogo?.jogadores?.jogador2?.pontos ? "jogador2" : "";
  // <Carta altura="40vmin" virada viraClique positiva valor="2"/>
  const formataTextoPontos = (pontos) => {
    if(pontos === 1) {
      return `${pontos} ponto`;
    }

    return `${pontos} pontos`;
  }
  return (
    <div className={styles.placar}>
      <h1>Placar</h1>
      {dadosJogo ? (
      <>
        <h2>Rodada {dadosJogo?.numeroRodada}</h2>
        <div className={styles.corpoPlacar}>
          <h3>Placar atual</h3>
          <p className={vencendo === "jogador1" ? styles.vencendo : undefined}>
            {dadosJogo?.jogadores?.jogador1?.nome}&nbsp;
            <span>[{formataTextoPontos(dadosJogo?.jogadores?.jogador1?.pontos)}]</span>
          </p>
          <p className={vencendo === "jogador2" ? styles.vencendo : undefined}>
            {dadosJogo?.jogadores?.jogador2?.nome}&nbsp;
            <span>[{formataTextoPontos(dadosJogo?.jogadores?.jogador2?.pontos)}]</span>
          </p>
        </div>
      </>
      ) : (
        <h2>Aguardando dados do jogo</h2>
      )}
    </div>
  )
}