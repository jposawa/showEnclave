import React from "react";
import {HomeOutlined, AppstoreOutlined, ProjectOutlined} from "@ant-design/icons";
import {Link, useLocation} from "react-router-dom";

import styles from "./styles.module.css";

export default function Menu() {
  const location = useLocation();
  console.log(location);

  const isThisLocation = (nomePagina) => {
    return location.pathname === `/${nomePagina}`;
  }
  
  return (
    <nav className={styles.menu}>
      <span className={styles.fundo}/>
      <Link to="/placar" className={isThisLocation("placar") && styles.selecionado}>
        <ProjectOutlined style={{transform: "rotate(180deg)"}} />
        <p>Placar</p>
      </Link>
      
      <Link to="/inicio" className={(isThisLocation("inicio") || isThisLocation("")) && styles.selecionado}>
        <HomeOutlined />
        <p>Início</p>
      </Link>
      
      <Link to="/jogo" className={isThisLocation("jogo") && styles.selecionado}>
        <AppstoreOutlined />
        <p>Jogo</p>
      </Link>
    </nav>
  )
}