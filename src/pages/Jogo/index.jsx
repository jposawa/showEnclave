import React from "react";
import { useControle } from "../../hooks/controle.jsx";
import Perguntas from "./Perguntas";
import Musicas from "./Musicas";

import styles from "./styles.module.css";

export default function Jogo() {
  const { dadosJogo, formataTextoPontos } = useControle();
  const dadosJogadorAtual = dadosJogo?.jogadores[dadosJogo?.andamento?.jogadorAtual];
  
  return (
    <div className={styles.jogo}>
      {!dadosJogo ? <h1>Carregando jogo...</h1> : (
      <>
        <header>
          <h2>{dadosJogadorAtual?.nome}</h2>
          <h3>{formataTextoPontos(dadosJogadorAtual?.pontos)}</h3>
        </header>
        
        <section className={styles.slotEtapa}>
        {
          {
            "perguntas": <Perguntas/>,
            "musicas": <Musicas/>
          }[dadosJogo?.andamento?.etapaAtual]
        }
        </section>
      </>
    )}
    </div>
  )
}