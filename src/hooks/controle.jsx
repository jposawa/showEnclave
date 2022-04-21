import React, {createContext, useContext, useState, useEffect} from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, update, get } from "firebase/database";
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
        numFases: 16,
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
  const [mostraProximo, setMostraProximo] = React.useState(false);
  const [mostraModal, setMostraModal] = React.useState(false);
  const [ajudaAtiva, setAjudaAtiva] = React.useState();
  const cartas = {
    c1: {
      valor: 1,
      negativa: true,
      mista: false,
    },
    c2: {
      valor: 2,
      negativa: true,
      mista: false,
    },
    c3: {
      valor: 3,
      negativa: true,
      mista: false,
    },
    c4: {
      valor: 3,
      negativa: false,
      mista: true,
    },
  }
  const [alternativasDescartadas, setAlternativasDescartadas] = React.useState(0);

  const formataTextoPontos = (pontos) => {
    if(pontos === 1) {
      return `${pontos} ponto`;
    }

    return `${pontos} pontos`;
  }

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

  const copiaDadosJogo = () => {
    return JSON.parse(JSON.stringify(dadosJogo));
  }

  const idProximoJogador = (atual) => {
    const numeroAtual = atual[atual.length-1];

    return `jogador${numeroAtual % 2 + 1}`;
  }

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

    update(ref(db), updates).then(() => {}).catch((erro) => {
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
      _configJogo.rodadaAtual += 1;

      const refDados = pegarDados(`rodadas/-1`);

      get(refDados).then((recorte) => {
        const _dados = JSON.parse(JSON.stringify(recorte.val()));
        _dados.numeroRodada = _configJogo.rodadaAtual;
        
        atualizarDados("rodadas", _dados, _dados.numeroRodada);
        atualizarDados("config", _configJogo);
      });
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

    get(refDadosJogo).then((recorte) => {
      const _dadosJogo = JSON.parse(JSON.stringify(recorte.val()));
      
      verificaRodada(_dadosJogo);
    }).catch((error) => {
      console.error("Erro ao pegar dados");
      console.log(error);
    });
  }

  const atualizaJogadores = (jogadores, atualizaSequencia, iniciarJogo) => {
    const _dadosJogo = copiaDadosJogo();
    const {jogador1, jogador2, primeiro} = jogadores;

    _dadosJogo.jogadores.[primeiro].nome = jogador1;
    _dadosJogo.jogadores.[idProximoJogador(primeiro)].nome = jogador2;

    if(atualizaSequencia) {
      _dadosJogo.andamento.jogadorAtual = primeiro;
      _dadosJogo.andamento.sequencia = [primeiro, idProximoJogador(primeiro)];
    }

    setDadosJogo(_dadosJogo);

    if(iniciarJogo) {
      iniciaJogo();
    }
  }

  const iniciaJogo = () => {
    const _dadosJogo = copiaDadosJogo();

    _dadosJogo.iniciado = true;

    setDadosJogo(_dadosJogo);
    navigate("/jogo");
  }

  const ajustaNomeDificuldade = (dificuldade) => {
    const dificuldades = {
      facil: "fácil",
      media: "média",
      dificil: "difícil",
      final: "Pergunta do Bião",
    }

    return dificuldades[dificuldade];
  }

  const verificaRespostaPontos = (resposta, styles) => {
    const _dadosJogo = JSON.parse(JSON.stringify(dadosJogo));
    const { jogadorAtual, faseAtual } = _dadosJogo?.andamento;
    const perguntaAtual = _dadosJogo?.perguntas[jogadorAtual][faseAtual];
    const [elementoAlternativaEscolhida] = document.getElementsByName(resposta);
    let modPontos = configJogo?.pontos?.perguntas[perguntaAtual.dificuldade];

    if(perguntaAtual?.opcoes[resposta]?.correta) {
      elementoAlternativaEscolhida.classList.add(styles.alternativaCorreta);
    }
    else {
      const [letraCorreta] = Object.entries(perguntaAtual?.opcoes).map(([letra, opcao]) => (
        opcao?.correta ? letra : undefined
      )).filter((letra) => letra);
      const [elementoAlternativaCorreta] = document.getElementsByName(letraCorreta);

      elementoAlternativaEscolhida.classList.add(styles.alternativaErrada);
      elementoAlternativaCorreta.classList.add(styles.alternativaCorreta);

      modPontos *= configJogo?.pontos?.perguntas?.proporcaoPerda;

      //DECISÃO: Não permitir negativo
      // pontos = pontos < 0 ? 0 : pontos;
    }

    setMostraProximo(true);
    atualizaPontos(modPontos, _dadosJogo);
  }

  const atualizaPontos = (modPontos, _dadosJogo) => {
    _dadosJogo = _dadosJogo ? _dadosJogo : copiaDadosJogo();
    modPontos = !isNaN(parseInt(modPontos)) ? parseInt(modPontos) : 0;
    const { jogadorAtual, etapaAtual } = _dadosJogo?.andamento;

    _dadosJogo.jogadores[jogadorAtual].pontos += modPontos;

    if(configJogo.fluxo[etapaAtual].alterna) {
      _dadosJogo.andamento.jogadorAtual = idProximoJogador(jogadorAtual);
    }
    
    setDadosJogo(_dadosJogo);
  }

  const proximaEtapa = (_dadosJogo) => {
    _dadosJogo = _dadosJogo ? _dadosJogo : copiaDadosJogo();
    const { sequencia, etapaAtual } = _dadosJogo?.andamento;
    const { jogador1, jogador2 } = _dadosJogo?.jogadores;

    if(etapaAtual === "perguntas") {
      _dadosJogo.andamento.etapaAtual = "musicas";
      _dadosJogo.andamento.jogadorAtual = jogador1.pontos > jogador2.pontos ? jogador2.id : jogador1.pontos < jogador2.pontos ? jogador1.id : sequencia[0];
    }
    else {
      _dadosJogo.finalizando = true;
    }

    setDadosJogo(_dadosJogo);
  }

  const proximaFase = () => {
    const _dadosJogo = copiaDadosJogo();
    const { jogadorAtual, faseAtual, sequencia, etapaAtual } = _dadosJogo?.andamento;
    let proxFase = faseAtual + 1;

    if(proxFase > configJogo.fluxo[etapaAtual].totalFases || !_dadosJogo.perguntas[jogadorAtual][proxFase]) {
      _dadosJogo.andamento.faseAtual = 1;
      
      if(jogadorAtual === sequencia[0]) {
        _dadosJogo.andamento.jogadorAtual = sequencia[1];

        setDadosJogo(_dadosJogo);
      }
      else {
        proximaEtapa(_dadosJogo);
      }
    }
    else {
      _dadosJogo.andamento.faseAtual = proxFase;

      setDadosJogo(_dadosJogo);
    }
    
    setMostraProximo(false);
  }

  const fechaAjuda = () => {
    const _dadosJogo = copiaDadosJogo();
    const {jogadorAtual} = _dadosJogo?.andamento;

    _dadosJogo.jogadores[jogadorAtual].ajudas[ajudaAtiva] -= 1;

    setAjudaAtiva();
    setDadosJogo(_dadosJogo);
  }

  const eliminaErradas = (numAlternativas) => {}

  const recuperaAjuda = (tipoAjuda) => {
    const _dadosJogo = copiaDadosJogo();
    const {jogadorAtual} = _dadosJogo.andamento;

    _dadosJogo.jogadores[jogadorAtual].ajudas[tipoAjuda] += 1;

    fechaAjuda();
    setDadosJogo(_dadosJogo);
  }

  //Executa logo que os elementos do DOM são carregados, fazendo a configuração inicial
  useEffect(()=>{
    setFbApp(initializeApp(CONFIG.FB_CONFIG));
    pegaConfigJogo();
  },[]);

  React.useMemo(() => {
    if(configJogo) {
      pegaDadosJogo();
    }
  },[configJogo]);

  React.useMemo(() => {
    if(dadosJogo) {
      atualizarDados("rodadas", dadosJogo, dadosJogo.numeroRodada);
    }
  },[dadosJogo])

  const valoresExportados = {
    CONFIG,
    dadosJogo,
    setDadosJogo,
    copiaDadosJogo,
    configJogo,
    jogoIniciado,
    setJogoIniciado,
    atualizaJogadores,
    atualizaPontos,
    iniciaJogo,
    formataTextoPontos,
    ajustaNomeDificuldade,
    verificaRespostaPontos,
    mostraProximo,
    setMostraProximo,
    proximaFase,
    proximaEtapa,
    mostraModal,
    setMostraModal,
    idProximoJogador,
    ajudaAtiva,
    setAjudaAtiva,
    fechaAjuda,
    cartas,
    eliminaErradas,
    recuperaAjuda,
    alternativasDescartadas,
    setAlternativasDescartadas
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