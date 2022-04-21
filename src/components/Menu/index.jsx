import React from "react";
import {useControle} from "../../hooks";
import {HomeOutlined, AppstoreOutlined, ProjectOutlined} from "@ant-design/icons";
import {Link, useLocation} from "react-router-dom";

import styles from "./styles.module.css";

export default function Menu() {
  const location = useLocation();
  const {setMostraModal} = useControle();

  const isThisLocation = (nomePagina) => {
    return location.pathname === `/${nomePagina}`;
  }
  
  return (
    <nav className={styles.menu} onClick={() => {setMostraModal(false)}}>
      <span className={styles.fundo}/>
      <Link to="/placar" className={isThisLocation("placar") ? styles.selecionado : undefined}>
        <ProjectOutlined style={{transform: "rotate(180deg)"}} />
        <p>Placar</p>
      </Link>
      
      <Link to="/inicio" className={(isThisLocation("inicio") || isThisLocation("")) ? styles.selecionado : undefined}>
        <HomeOutlined />
        <p>Início</p>
      </Link>
      
      <Link to="/jogo" className={isThisLocation("jogo") ? styles.selecionado : undefined}>
        <AppstoreOutlined />
        <p>Jogo</p>
      </Link>
    </nav>
  )
}