// AppContext.js
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Definir múltiples variables de estado
  //fema 1
  const [mimeType, setAdjuntarFotografica] = useState('');
  const [data, setAdjuntarGrafico] = useState('');
  const [direccion, setDireccion] = useState('');
  const [CodigoPostal, setZip] = useState('');
  const [otrosIdentificaciones, setOtrasIdentificaciones] = useState('');
  const [nomEdificacion, setNombreEdificio] = useState('');
  const [CodTipoUsoEdificacion, setUso] = useState('');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [fechaEncuesta, setFecha] = useState({ year: '', month: '', day: '' });
  const [horaEncuesta, setHora] = useState('');
  //fema2
  const [nroPisosSup, setNumeroPiso] = useState('');
  const [nroPisosInf, setInf] = useState('');
  const [anioContruccion, setAnoConstruccion] = useState('');
  const [areaTotalPiso, setAreaTotalDePiso] = useState('');
  const [anioCodigo, setAnoCodigo] = useState('');
  const [ampliacion, setAmpliacion] = useState('');
  const [amplAnioConstruccion, setAnoDeContruccion] = useState('');
  const [codTipoSuelo, setTiposuelo1] = useState('');
  const [femaOcupacions, setOcupacion] = useState([]);
  const [comentarios, setComentario] = useState('');
  const [chk1, setCheckBox1] = useState(0);
  const [chk2, setCheckBox2] = useState(0);
  const [chk3, setCheckBox3] = useState(0);
  const [chk4, setCheckBox4] = useState(0);
  const [chk1N, setCheckBox5] = useState(0);
  const [chk2N, setCheckBox6] = useState(0);
  const [chk3N, setCheckBox7] = useState(0);
  const [chk4N, setCheckBox8] = useState(0);
  // const [ocupacion, setOcupacion] = useState('');
  //fema 3
   const [femaPuntuacions, setResultado] = useState([]);
  // const [codpuntuacionMatriz, setcodpuntuacionMatriz] = useState(false);
  // const [resultadoFinal, setresultadoFinal] = useState(false);
  // const [esEst, setesEst] = useState(false);
  // const [esDnk, setesDnk] = useState(false);
  // const [tipoEdificacion, setTipoEdificacion] = useState([]);
  // const [subTipo, setSubTipo] = useState('');
  // const [resultadoBase, setResultadoBase] = useState('');
  // const [irregularidadVerticalSevera, setIrregularidadVerticalSevera] = useState('');
  // const [irregularidadVerticalModerada, setIrregularidadVerticalModerada] = useState('');
  // const [plantaIrregular, setPlantaIrregular] = useState('');
  // const [preCodigoSismico, setPreCodigoSismico] = useState('');
  // const [postCodigoSismico, setPostCodigoSismico] = useState('');
  // const [sueloTipoAB, setSueloTipoAB] = useState('');
  // const [sueloTipoE1a3, setSueloTipoE1a3] = useState('');
  // const [sueloTipoEMayor3, setSueloTipoEMayor3] = useState('');
  // const [resultadoSmin, setResultadoSmin] = useState('');
  // const [resultadoFinal, setResultadoFinal] = useState('');
  //fema 4
  const [codEvalExterior, setExterior] = useState('');
  const [codEvalInterior, setInterior] = useState('');
  const [revisionPlanos, setRevisionPlanos] = useState('');
  const [fuenteTipoSuelo, setFuenteDelTipoDeSuelo] = useState('');
  const [fuentePeligroGeologicos, setFuenteDePeligrosGeologicos] = useState('');
  const [contactoRegistrado, setContactoDeLaPersona] = useState('');
  const [PeligorsGeologicos, setOtrosPeligros1] = useState('');
  //fema 5
  const [pregunta1Fema5, setPregunta1Fema5] = useState('');
  const [pregunta2Fema5, setPregunta2Fema5] = useState('');
  const [inspeccionNivel, setInspeccionNivel] = useState('');

  return (
    <AppContext.Provider value={{
      //fema1
      mimeType, setAdjuntarFotografica,
      data, setAdjuntarGrafico,
      direccion, setDireccion,
      CodigoPostal, setZip,
      otrosIdentificaciones, setOtrasIdentificaciones,
      nomEdificacion, setNombreEdificio,
      CodTipoUsoEdificacion, setUso,
      latitud, setLatitud,
      longitud, setLongitud,
      fechaEncuesta, setFecha,
      horaEncuesta, setHora,
      //fema 2
      nroPisosSup, setNumeroPiso,
      nroPisosInf, setInf,
      anioContruccion, setAnoConstruccion,
      areaTotalPiso, setAreaTotalDePiso,
      anioCodigo, setAnoCodigo,
      ampliacion, setAmpliacion,
      amplAnioConstruccion, setAnoDeContruccion,
      codTipoSuelo, setTiposuelo1,
      // tipoocupacion1, setTipoocupacion1,
      comentarios, setComentario,
      femaOcupacions, setOcupacion,
      chk1, setCheckBox1,
      chk2, setCheckBox2,
      chk3, setCheckBox3,
      chk4, setCheckBox4,
      chk1N, setCheckBox5,
      chk2N, setCheckBox6,
      chk3N, setCheckBox7,
      chk4N, setCheckBox8,
      //fema 3
      // tipoEdificacion, setTipoEdificacion,
      // subTipo, setSubTipo,
      // resultadoBase, setResultadoBase,
      // irregularidadVerticalSevera, setIrregularidadVerticalSevera,
      // irregularidadVerticalModerada, setIrregularidadVerticalModerada,
      // plantaIrregular, setPlantaIrregular,
      // preCodigoSismico, setPreCodigoSismico,
      // postCodigoSismico, setPostCodigoSismico,
      // sueloTipoAB, setSueloTipoAB,
      // sueloTipoE1a3, setSueloTipoE1a3,
      // sueloTipoEMayor3, setSueloTipoEMayor3,
      // resultadoSmin, setResultadoSmin,
      // resultadoFinal, setResultadoFinal,
      femaPuntuacions, setResultado,
      //fema 4
      codEvalExterior, setExterior,
      codEvalInterior, setInterior,
      revisionPlanos, setRevisionPlanos,
      fuenteTipoSuelo, setFuenteDelTipoDeSuelo,
      fuentePeligroGeologicos, setFuenteDePeligrosGeologicos,
      contactoRegistrado, setContactoDeLaPersona,
      PeligorsGeologicos, setOtrosPeligros1,
      //fema 5
      pregunta1Fema5, setPregunta1Fema5,
      pregunta2Fema5, setPregunta2Fema5,
      inspeccionNivel, setInspeccionNivel
    }}>
      {children}
    </AppContext.Provider>
  );
};
