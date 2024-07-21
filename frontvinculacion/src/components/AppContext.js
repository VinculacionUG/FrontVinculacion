// AppContext.js
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Definir múltiples variables de estado
  //fema 1
  const [mimeType, setAdjuntarFotografica] = useState('');
  const [data, setAdjuntarGrafico] = useState('');
  const [direccion, setDireccion] = useState('');
  const [zip, setZip] = useState('');
  const [otrosIdentificaciones, setOtrasIdentificaciones] = useState('');
  const [nomEdificacion, setNombreEdificio] = useState('');
  const [uso, setUso] = useState('');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [fechaEncuesta, setFecha] = useState({ year: '', month: '', day: '' });
  const [horaEncuesta, setHora] = useState('');
  //fema2
  const [numeroPiso, setNumeroPiso] = useState('');
  const [inf, setInf] = useState('');
  const [anoConstruccion, setAnoConstruccion] = useState('');
  const [areaTotalDePiso, setAreaTotalDePiso] = useState('');
  const [anoCodigo, setAnoCodigo] = useState('');
  const [ampliacion, setAmpliacion] = useState('');
  const [anoDeContruccion, setAnoDeContruccion] = useState('');
  const [tiposuelo1, setTiposuelo1] = useState('');
  const [tipoocupacion1, setTipoocupacion1] = useState('');
  const [checkBox1, setCheckBox1] = useState(false);
  const [checkBox2, setCheckBox2] = useState(false);
  const [checkBox3, setCheckBox3] = useState(false);
  const [checkBox4, setCheckBox4] = useState(false);
  const [checkBox5, setCheckBox5] = useState(false);
  const [checkBox6, setCheckBox6] = useState(false);
  const [checkBox7, setCheckBox7] = useState(false);
  const [checkBox8, setCheckBox8] = useState(false);
  const [checkBox9, setCheckBox9] = useState(false);
  // const [ocupacion, setOcupacion] = useState('');
  const [femaOcupacions, setOcupacion] = useState([]);
  const [tipoocupacion, setTipoocupacion] = useState('');
  const [tipoSuelo, setTipoSuelo] = useState('');
  const [comentario, setComentario] = useState('');
  //fema 3
   const [resultado, setResultado] = useState([]);
  // const [codpuntuacionMatriz, setcodpuntuacionMatriz] = useState(false);
  // const [resultadoFinal, setresultadoFinal] = useState(false);
  // const [esEst, setesEst] = useState(false);
  // const [esDnk, setesDnk] = useState(false);
  const [tipoEdificacion, setTipoEdificacion] = useState([]);
  const [subTipo, setSubTipo] = useState('');
  const [resultadoBase, setResultadoBase] = useState('');
  const [irregularidadVerticalSevera, setIrregularidadVerticalSevera] = useState('');
  const [irregularidadVerticalModerada, setIrregularidadVerticalModerada] = useState('');
  const [plantaIrregular, setPlantaIrregular] = useState('');
  const [preCodigoSismico, setPreCodigoSismico] = useState('');
  const [postCodigoSismico, setPostCodigoSismico] = useState('');
  const [sueloTipoAB, setSueloTipoAB] = useState('');
  const [sueloTipoE1a3, setSueloTipoE1a3] = useState('');
  const [sueloTipoEMayor3, setSueloTipoEMayor3] = useState('');
  const [resultadoSmin, setResultadoSmin] = useState('');
  const [resultadoFinal, setResultadoFinal] = useState('');
  //fema 4
  const [exterior, setExterior] = useState('');
  const [interior, setInterior] = useState('');
  const [revisionPlanos, setRevisionPlanos] = useState('');
  const [fuenteDelTipoDeSuelo, setFuenteDelTipoDeSuelo] = useState('');
  const [fuenteDePeligrosGeologicos, setFuenteDePeligrosGeologicos] = useState('');
  const [contactoDeLaPersona, setContactoDeLaPersona] = useState('');
  const [otrosPeligros1, setOtrosPeligros1] = useState('');
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
      zip, setZip,
      otrosIdentificaciones, setOtrasIdentificaciones,
      nomEdificacion, setNombreEdificio,
      uso, setUso,
      latitud, setLatitud,
      longitud, setLongitud,
      fechaEncuesta, setFecha,
      horaEncuesta, setHora,
      //fema 2
      numeroPiso, setNumeroPiso,
      inf, setInf,
      anoConstruccion, setAnoConstruccion,
      areaTotalDePiso, setAreaTotalDePiso,
      anoCodigo, setAnoCodigo,
      ampliacion, setAmpliacion,
      anoDeContruccion, setAnoDeContruccion,
      tiposuelo1, setTiposuelo1,
      tipoocupacion1, setTipoocupacion1,
      checkBox1, setCheckBox1,
      checkBox2, setCheckBox2,
      checkBox3, setCheckBox3,
      checkBox4, setCheckBox4,
      checkBox5, setCheckBox5,
      checkBox6, setCheckBox6,
      checkBox7, setCheckBox7,
      checkBox8, setCheckBox8,
      checkBox9, setCheckBox9,
      femaOcupacions, setOcupacion,
      tipoocupacion, setTipoocupacion,
      tipoSuelo, setTipoSuelo,
      comentario, setComentario,
      //fema 3
      tipoEdificacion, setTipoEdificacion,
      subTipo, setSubTipo,
      resultadoBase, setResultadoBase,
      irregularidadVerticalSevera, setIrregularidadVerticalSevera,
      irregularidadVerticalModerada, setIrregularidadVerticalModerada,
      plantaIrregular, setPlantaIrregular,
      preCodigoSismico, setPreCodigoSismico,
      postCodigoSismico, setPostCodigoSismico,
      sueloTipoAB, setSueloTipoAB,
      sueloTipoE1a3, setSueloTipoE1a3,
      sueloTipoEMayor3, setSueloTipoEMayor3,
      resultadoSmin, setResultadoSmin,
      resultadoFinal, setResultadoFinal,
      resultado, setResultado,
      //fema 4
      exterior, setExterior,
      interior, setInterior,
      revisionPlanos, setRevisionPlanos,
      fuenteDelTipoDeSuelo, setFuenteDelTipoDeSuelo,
      fuenteDePeligrosGeologicos, setFuenteDePeligrosGeologicos,
      contactoDeLaPersona, setContactoDeLaPersona,
      otrosPeligros1, setOtrosPeligros1,
      //fema 5
      pregunta1Fema5, setPregunta1Fema5,
      pregunta2Fema5, setPregunta2Fema5,
      inspeccionNivel, setInspeccionNivel
    }}>
      {children}
    </AppContext.Provider>
  );
};
