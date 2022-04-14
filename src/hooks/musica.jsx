import React from "react";

export const useMusica = (url) => {
  const [audio, setAudio] = React.useState(new Audio());
  const [tocando, setTocando] = React.useState(false);
  const [carregou, setCarregou] = React.useState(false);

  const alterna = () => {setTocando(!tocando)};
  const para = () => {
    audio.load()
    setTocando(false);
  };

  const recuperaIdMusicaDrive = (urlCompartilhada) => {
    if(!urlCompartilhada) {
      return null;
    }
    
    try {
      const pedacos = urlCompartilhada?.split("/d/");
      const [idMusica] = pedacos[1]?.split("/");
  
      return idMusica;
    }
    catch(error) {
      console.error("Deu ruim na URL da música");
      console.log(error);

      return false;
    }
  }

  const geraUrlUtilizavel = (url) => {
    const idMusica = recuperaIdMusicaDrive(url);

    return idMusica ? `https://drive.google.com/uc?export=download&id=${idMusica}` : null;
  }

  React.useMemo(() => {
    const urlUtilizavel = geraUrlUtilizavel(url);

    setAudio(new Audio(urlUtilizavel));
    setCarregou(!!urlUtilizavel);
  }, [url]);

  React.useMemo(() => {
    tocando ? audio.play() : audio.pause();
  }, [tocando]);

  React.useEffect(() => {
    audio.addEventListener('ended', () => setTocando(false));

    return () => {
      audio.removeEventListener('ended', () => setTocando(false));
    }
  }, []);

  return {
    tocando,
    alterna,
    para,
    carregou,
  };
}