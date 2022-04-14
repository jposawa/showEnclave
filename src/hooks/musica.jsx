import React from "react";

export const useMusica = (url) => {
  const [audio, setAudio] = React.useState(new Audio());
  const [tocando, setTocando] = React.useState(false);

  const alterna = () => {setTocando(!tocando)};
  const para = () => {
    audio.load()
    setTocando(false);
  };

  const recuperaIdMusicaDrive = (urlCompartilhada) => {
    if(!urlCompartilhada) {
      return null;
    }
    
    const pedacos = urlCompartilhada?.split("/d/");
    const [idMusica] = pedacos[1]?.split("/");

    return idMusica;
  }

  const geraUrlUtilizavel = (url) => {
    const idMusica = recuperaIdMusicaDrive(url);

    return idMusica ? `https://drive.google.com/uc?export=download&id=${idMusica}` : null;
  }

  React.useMemo(() => {
    setAudio(new Audio(geraUrlUtilizavel(url)));
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
  };
}