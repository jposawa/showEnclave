import React from "react";
import {useControle} from "../../hooks/controle";

import styles from "./styles.module.css";

export default function Modal(props) {
  const {children, proibidoFechar} = props;
  const {mostraModal, setMostraModal} = useControle();

  return(
    <div className={`${styles.modal} ${mostraModal ? "" : "oculto"}`}>
      <span className={styles.fundoModal} onClick={() => {setMostraModal(false || proibidoFechar)}}/>

      <div className={styles.corpoModal}>
        {!proibidoFechar && 
          <button className={styles.fechaModal} onClick={() => {setMostraModal(false)}}>&times;</button>
        }
        {children}
      </div>
    </div>
  )
}