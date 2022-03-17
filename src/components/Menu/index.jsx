import React from "react";
import {HomeOutlined, AppstoreOutlined, ProjectOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

import styles from "./styles.module.css";

export default function Menu() {
  return (
    <nav className={styles.menu}>
      <Link to="/jogadores">
        <ProjectOutlined style={{transform: "rotate(180deg)"}} />
        <p>Placar</p>
      </Link>
      
      <Link to="/inicio">
        <HomeOutlined />
        <p>Início</p>
      </Link>
      
      <Link to="/jogo">
        <AppstoreOutlined />
        <p>Jogo</p>
      </Link>
    </nav>
  )
}