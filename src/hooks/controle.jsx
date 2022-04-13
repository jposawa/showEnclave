import React, {createContext, useContext, useState, useEffect} from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { useNavigate } from "react-router-dom";

import questoes from "../data/questoes.json";


export const ControleContext = createContext();

export const ControleProvider = ({children}) => {
  const CONFIG = {
    PREFIXO_LS: "showBiao@",
    BASE_FB: "enclave/biao",
    FB_CONFIG: {
      apiKey: "AIzaSyAxJiwtCxBETHSUPjXogKhWMgauXQIi_uw",
      authDomain: "jposawa-162817.firebaseapp.com",
      databaseURL: "https://jposawa-162817-default-rtdb.firebaseio.com",
      projectId: "jposawa-162817",
      storageBucket: "jposawa-162817.appspot.com",
      messagingSenderId: "421124702668",
      appId: "1:421124702668:web:0b682cbd429f65c64e9d69",
      measurementId: "G-THVV1R47B1"
    },
    ETAPAS: {
      ORDEM: ["perguntas", "musicas", "frases"],
      perguntas: {
        nome: "perguntas",
        alterna: false,
        sequencial: true,
        numFases: 15,
      },
      musicas: {
        nome: "musicas",
        alterna: true,
        sequencial: false,
        numFases: 12,
      },
      frases: {
        nome: "frases",
        alterna: false,
        sequencial: true,
        numFases: 3,
      },
    },
  };
  const [fbApp, setFbApp] = React.useState();
  /* const [dadosJogo, setDadosJogo] = useState({
    etapaAtual: "perguntas", //Qual dos quadros do jogo
    jogadorAtual: "jogador1", //Jogador que está jogando atualmente
    faseAtual: 1, //Aqui é para quadros/etapas que tenham mais de uma fase, como o das frases, ou o número da pergunta...
    sequencia: [], //Sequência da ordem de jogadores para a etapaAtual
  }); */
  const [placar, setPlacar] = useState({
    jogador1: {
      nome: "",
      perguntas: 0,
      musicas: 0,
      frases: 0,
      total: 0,
    },
    jogador2: {
      nome: "",
      perguntas: 0,
      musicas: 0,
      frases: 0,
      total: 0,
    },
  });
  const [mensagem, setMensagem] = useState();
  const [configJogo, setConfigJogo] = React.useState();
  const [dadosJogo, setDadosJogo] = React.useState();
  const [jogoIniciado, setJogoIniciado] = React.useState(false);
  const navigate = useNavigate();

  const recuperarPlacarLS = () =>{
    const {PREFIXO_LS} = CONFIG;
    const _placar = localStorage.getItem(`${PREFIXO_LS}placar`);

    if(_placar === undefined || _placar === null){
      return false;
    }
    
    return JSON.parse(_placar);
  }

  const atualizarPlacarLS = (novoPlacar) =>{
    const _placar = {...placar};
    const {PREFIXO_LS} = CONFIG;

    if(novoPlacar){
      localStorage.setItem(`${PREFIXO_LS}placar`, JSON.stringify(novoPlacar));
    }
    else{
      localStorage.setItem(`${PREFIXO_LS}placar`, JSON.stringify(_placar));
    }
  }

  /* const atualizarPlacar = (novaPontuacao, jogador, etapa) => {
    const _placar = JSON.parse(JSON.stringify(placar));
    jogador = jogador ? jogador : dadosJogo.jogadorAtual;
    etapa = etapa ? etapa : dadosJogo.etapaAtual;
    novaPontuacao = novaPontuacao && !isNaN(parseInt(novaPontuacao)) ? parseInt(novaPontuacao) : 0;

    _placar[jogador][etapa] = novaPontuacao;
    
    _placar[jogador].total = _placar[jogador].perguntas + _placar[jogador].musicas + _placar[jogador].frases;

    setPlacar(_placar);
  } */

  /* const defineSequencia = (nomePrimeiroJogador) => {
    const _dadosJogo = JSON.parse(JSON.stringify(dadosJogador));
    const [dadosJogadorInicial] = Object.values(questoes.jogadores).filter(jogador => (jogador.nome == nomePrimeiroJogador));
    let numProxJogador;

    _dadosJogo.sequencia.push(dadosJogadorInicial.id);
    numProxJogador = parseInt(dadosJogadorInicial.id[dadosJogadorInicial.id.length-1]);

    _dadosJogo.sequencia.push(`jogador${(numProxJogador % 2) + 1}`);

    setDadosJogo(_dadosJogo);
  } */

  /* const proximoJogador = () => {
    const {ETAPAS} = CONFIG;
    const _dadosJogo = {...dadosJogo};
    const {jogadorAtual, sequencia, etapaAtual} = _dadosJogo;
    const indiceJogadorAtual = sequencia.findIndex(jogador => jogador === jogadorAtual);

    _dadosJogo.jogadorAtual = sequencia[(indiceJogadorAtual + 1) % 2];

    setDadosJogo(_dadosJogo);
  } */

  /* const proximaEtapa = () => {
    const {ETAPAS} = CONFIG;
    const _dadosJogo = {...dadosJogo};
    const numEtapaAtual = ETAPAS.ORDEM.findIndex(etapa => etapa === _dadosJogo.etapaAtual);

    _dadosJogo.etapaAtual = ETAPAS.ORDEM[(numEtapaAtual + 1) % ETAPAS.ORDEM.length];

    setDadosJogo(_dadosJogo);
  } */

  /* const proximaFase = (resetaFase) => {
    const _dadosJogo = {...dadosJogo};

    _dadosJogo.faseAtual = resetaFase ? 1 : _dadosJogo.faseAtual + 1;

    setDadosJogo(_dadosJogo);
  } */

  /* const selecionaFase = (numFase) => {
    const {ETAPAS} = CONFIG;
    const _dadosJogo = {...dadosJogo};
    numFase = parseInt(numFase);

    if(isNaN(numFase)){
      proximaFase(true);
    }
    else {
      const proxFase = (Math.abs(numFase) + 1) % ETAPAS[_dadosJogo.etapaAtual].numFases;
    }
  } */

  const pegarDados = (tabela) => {
    const caminho = tabela ? `${CONFIG.BASE_FB}/${tabela}` : CONFIG.BASE_FB;
    const db = getDatabase();
    const refResposta = ref(db, caminho);

    return refResposta;
  }

  const atualizarDados = (tabela, novosDados, idDados) => {
    const caminho = tabela ? `${CONFIG.BASE_FB}/${tabela}` : CONFIG.BASE_FB
    idDados = idDados ? idDados : "";
    const db = getDatabase();
    const updates = {};
    updates[`${caminho}/${idDados}`] = novosDados;

    update(ref(db), updates).then(() => {
      setDadosJogo(novosDados);
    }).catch((erro) => {
      console.error(erro);
    });
  }

  const pegarConfigJogo = () => {
    const refConfig = pegarDados("config");

    onValue(refConfig, (recorte) => {
      setConfigJogo(recorte.val());
    })
  }

  const verificaRodada = (dadosRodada) => {
    if(!dadosRodada.finalizada) {
      setDadosJogo(dadosRodada);
    }
    else {
      const _configJogo = {...configJogo};
      dadosRodada.finalizada = false;
      dadosRodada.numeroRodada += 1;
      dadosRodada.jogadores.jogador1.nome = "";
      dadosRodada.jogadores.jogador2.nome = "";
      _configJogo.rodadaAtual = dadosRodada.numeroRodada;

      atualizarDados("rodadas", dadosRodada, dadosRodada.numeroRodada);
      atualizarDados("config", _configJogo);
    }
  }

  const pegaConfigJogo = () => {
    const refConfig = pegarDados("config");

    onValue(refConfig, (recorte) => {
      setConfigJogo(recorte.val());
    });
  }

  const pegaDadosJogo = () => {
    const refDadosJogo = pegarDados(`rodadas/${configJogo?.rodadaAtual}`);

    onValue(refDadosJogo, (recorte) => {
      const _dadosJogo = JSON.parse(JSON.stringify(recorte.val()));
      
      verificaRodada(_dadosJogo);
    }, {
      onlyOnce: true
    });
  }

  const atualizaJogadores = (jogadores, atualizaSequencia, iniciarJogo) => {
    const _dadosJogo = JSON.parse(JSON.stringify(dadosJogo));
    const {jogador1, jogador2, primeiro} = jogadores;

    _dadosJogo.jogadores.jogador1.nome = jogador1;
    _dadosJogo.jogadores.jogador2.nome = jogador2;

    if(atualizaSequencia) {
      _dadosJogo.andamento.jogadorAtual = primeiro;
    }

    atualizarDados("rodadas", _dadosJogo, _dadosJogo.numeroRodada);

    if(iniciarJogo) {
      iniciaJogo();
    }
  }

  const iniciaJogo = () => {
    console.log("CHama inicialização jogo");
    navigate("/jogo");
  }


  //Executa logo que os elementos do DOM são carregados, fazendo a configuração inicial
  useEffect(()=>{
    atualizarPlacarLS();
    setFbApp(initializeApp(CONFIG.FB_CONFIG));
    pegaConfigJogo();
  },[]);

  React.useMemo(() => {
    if(configJogo) {
      pegaDadosJogo();
    }
  },[configJogo]);

  const valoresExportados = {
    CONFIG,
    dadosJogo,
    configJogo,
    jogoIniciado,
    setJogoIniciado,
    atualizaJogadores,
    iniciaJogo,
  };

  return (
    <ControleContext.Provider value={valoresExportados}>
      {children}
    </ControleContext.Provider>
  );
}


export const useControle = () =>{
  const conteudo = useContext(ControleContext);

  if(!conteudo){
    console.error("Tem que estar dentro de um Provider");
  }

  return conteudo;

}