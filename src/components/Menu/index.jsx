import React from "react";
import {HomeOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

import styles from "./styles.module.css";

export default function Menu() {
  return (
    <nav className={styles.menu}>
      <Link to="/inicio">
        <HomeOutlined />
        Início
      </Link>
    </nav>
  )
}