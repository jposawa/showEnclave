import React from "react";

import Carta from "../../components/Carta";

import styles from "./styles.module.css";

export default function Inicio() {
  return (
    <>
      <h1>Início</h1>
      <Carta altura="40vmin" virada viraClique positiva valor="2"/>
    </>
  )
}