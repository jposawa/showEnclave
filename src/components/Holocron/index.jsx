import React from "react";

import HolocronFace from "./HolocronFace/";

import styles from "./styles.module.css";

export default function Holocron(props) {
  const {animado} = props;
  
  return (
    <div className={styles.holocron}>
      <span className={styles.luzInterior}/>
      <HolocronFace className={styles.frente}/>
      <HolocronFace className={styles.tras}/>
      <HolocronFace className={styles.direita}/>
      <HolocronFace className={styles.esquerda}/>
      <HolocronFace className={styles.cima}/>
      <HolocronFace className={styles.baixo}/>
    </div>
  )
}