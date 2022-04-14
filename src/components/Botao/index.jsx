import React from "react";
import styles from "./styles.module.css";

export default function Triangulo(props) {
  const {className, type, children, onClick, largura, secundaria, secundario, complementar, name, disabled} = props;

  const classeSecundaria = secundaria || secundario;

  const handleClick = (event) => {
    if(onClick) {
      onClick();
    }
  }

  return (
    <button
      name={name}
      className={`
        ${styles.botao} 
        ${className} 
        ${complementar ? styles.modoComplementar : classeSecundaria ? styles.modoSecundario : undefined}
      `} 
      type={type} 
      onClick={handleClick}
      style={{"--largura":largura}}
      disabled={disabled}
    >
      {children ? children : "Botão"}
    </button>
  );
}