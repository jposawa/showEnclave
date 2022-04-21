import React from "react";
import {Modal, Holocron, Botao, Carregando} from "../";
import {useControle} from "../../hooks/";

import styles from "./styles.module.css";

export default function Ajuda(props) {
  const {children, mostra, tipo} = props;
  const {fechaAjuda, setAjudaAtiva} = useControle();
  const [mostraBotao, setMostraBotao] = React.useState(false);

  return(
    <Modal className={styles.ajuda} mostra={mostra} proibidoFechar corpoTransparente={tipo === "cartas"}>
      {
        {
          "universitarios": 
            <>
              <div className={styles.containerHolocron}>
                <Holocron tamanho="10vmin"/>
              </div>
              <br/><br/>
              <h3>Consultando convidados</h3>
              <Botao onClick={()=>{setAjudaAtiva()}}>Responder</Botao>
            </>,
          "chat": 
            <div className={styles.ajudaChat}>
              <div className={styles.slotCarregando}>
                <Carregando tempo={15} setMostraBotao={setMostraBotao}/>
              </div>
              
              {mostraBotao ? <Botao onClick={()=>{setAjudaAtiva()}}>Responder</Botao> : <p>Aguardando chat</p>}
            </div>,
          "cartas": <></>,
        }[tipo]
      }
    </Modal>
  )
}