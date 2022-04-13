import React from "react";
import { getDatabase, ref, onValue } from "firebase/database";

const FB_BASE = "enclave/biao";

export const FB_CONFIG = {
  apiKey: "AIzaSyAxJiwtCxBETHSUPjXogKhWMgauXQIi_uw",
  authDomain: "jposawa-162817.firebaseapp.com",
  databaseURL: "https://jposawa-162817-default-rtdb.firebaseio.com",
  projectId: "jposawa-162817",
  storageBucket: "jposawa-162817.appspot.com",
  messagingSenderId: "421124702668",
  appId: "1:421124702668:web:0b682cbd429f65c64e9d69",
  measurementId: "G-THVV1R47B1"
};

export const lerDados = (tabela) => {
  const [teste3, setTeste3] = React.useState();
  const caminho = tabela ? `${FB_BASE}/${tabela}` : FB_BASE;
  const db = getDatabase();
  const refResposta = ref(db, caminho);
  let teste2;
  const teste = onValue(refResposta, (recorte) => {
    const dados = recorte.val();
    teste2 = dados;
    setTeste3(dados);

    return dados;
  });

  console.table({
    caminho: caminho,
    teste: teste,
    teste2: teste2,
    teste3: teste3,
  });
}