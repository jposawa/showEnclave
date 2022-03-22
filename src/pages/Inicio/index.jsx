import React from "react";

import Holocron from "../../components/Holocron";
import Carta from "../../components/Carta";

import styles from "./styles.module.css";

export default function Inicio() {
  const [tamanhoHolocron, setTamanhoHolocron] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      setTamanhoHolocron("20vmin");
    }, 1000);
  }, [])
  // <Carta altura="40vmin" virada viraClique positiva valor="2"/>
  // <Holocron animacao tamanho="10rem"/>
  /* <div className={styles.containerHolocron}>
        <Holocron animacao tamanho="10rem"/>
      </div> */
  return (
    <div className={styles.inicio}>
      <h1>Saudações enclavistas</h1>

      <div className={styles.containerHolocron}>
        <Holocron animado tamanho={tamanhoHolocron}/>
      </div>
      
      <div className={styles.corpoTexto}>
        <p>Vamos para mais uma partida de <b>Show do Bião</b>!</p>
        <p>Por favor selecione uma das opções abaixo</p>
      </div>
    </div>
  )
}