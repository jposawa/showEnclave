import React from "react";
import { useControle } from "../../../hooks/controle.jsx";
import {Botao, Modal} from "../../../components";

import styles from "./styles.module.css";

export default function Musicas() {
  const { 
    configJogo, 
    dadosJogo, 
    formataTextoPontos, 
    ajustaNomeDificuldade, 
    verificaRespostaPontos,
    mostraProximo,
    setMostraProximo,
    proximaFase,
    setMostraModal,
    proximaEtapa,
  } = useControle();
  const { jogadorAtual, faseAtual } = dadosJogo?.andamento;
  const perguntaAtual = dadosJogo?.perguntas[jogadorAtual][faseAtual];
  const [resposta, setResposta] = React.useState();

  return(
    <div className={styles.musicas}></div>
  )
}