import React from "react";
import { useControle } from "../../hooks/controle.jsx";

import Holocron from "../../components/Holocron";
import { Carta, Campo, Botao, Modal } from "../../components";

import styles from "./styles.module.css";

export default function Inicio() {
  const [tamanhoHolocron, setTamanhoHolocron] = React.useState(0);
  const { dadosJogo, atualizaJogadores, iniciaJogo, mostraModal, setMostraModal } = useControle();
  const refJogador1 = React.createRef();
  const refJogador2 = React.createRef();
  const refPrimeiro = React.useRef();
  /* React.useEffect(() => {
    setTimeout(() => {
      setTamanhoHolocron("20vmin");
    }, 1000);
  }, []) */
  // <Carta altura="40vmin" virada viraClique positiva valor="2"/>
  // <Holocron animacao tamanho="10rem"/>
  /* <div className={styles.containerHolocron}>
        <Holocron animacao tamanho="10rem"/>
      </div> */

  const alteraJogadores = (event) => {
    event.preventDefault();
    const jogador1 = refJogador1.current.value;
    const jogador2 = refJogador2.current.value;
    const primeiro = refPrimeiro.current.value;

    atualizaJogadores({
      jogador1: jogador1,
      jogador2: jogador2,
      primeiro: primeiro
    }, true);
    setMostraModal(false);
  }
  
  return (
    <>
      <div className={styles.inicio}>
        <h1>Saudações enclavistas</h1>
  
        <div className={styles.containerHolocron}>
          <Holocron animado tamanho="20vmin"/>
        </div>
        
        <div className={styles.corpoTexto}>
          <p>Vamos para mais uma partida de <b>Show do Bião</b>!</p>
          <br/>
          <p>Por favor selecione uma das opções abaixo</p>
          <div className={styles.containerOpcoes}>
            <Botao largura="6rem" onClick={iniciaJogo}>Iniciar</Botao>
            <Botao largura="6rem" secundario onClick={() => {setMostraModal(true)}}>Jogadores</Botao>
          </div>
        </div>
      </div>

      <Modal>
        <form className={styles.formModal} onSubmit={alteraJogadores}>
          <p>
            <span>Jogador 1: </span>
            <Campo placeholder="Nome jogador 1" ref={refJogador1} value={dadosJogo?.jogadores?.jogador1?.nome}/>
          </p>
          <p>
            <span>Jogador 2: </span>
            <Campo placeholder="Nome jogador 2" ref={refJogador2} value={dadosJogo?.jogadores?.jogador2?.nome}/>
          </p>
          <p>
            <span>Jogador inicial: </span>
            <select ref={refPrimeiro}>
              <option value="jogador1">Jogador 1</option>
              <option value="jogador2">Jogador 2</option>
            </select>
          </p>
          <br/>
          <div className={styles.slotBotao}>
            <Botao type="submit">Salvar</Botao>
          </div>
        </form>
      </Modal>
    </>
  )
}