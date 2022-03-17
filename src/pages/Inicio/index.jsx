import React from "react";

import Holocron from "../../components/Holocron";
import Carta from "../../components/Carta";

import styles from "./styles.module.css";

export default function Inicio() {
  // <Carta altura="40vmin" virada viraClique positiva valor="2"/>
  return (
    <>
      <h1>Início</h1>
      <div className={styles.containerHolocron}>
        <Holocron/>
      </div>
    </>
  )
}