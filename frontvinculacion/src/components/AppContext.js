// AppContext.js
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Definir múltiples variables de estado
  //fema 1
  const [adjuntarFotografica, setAdjuntarFotografica] = useState('');
  const [adjuntarGrafico, setAdjuntarGrafico] = useState('');
  const [direccion, setDireccion] = useState('');
  const [zip, setZip] = useState('');
  const [otrasIdentificaciones, setOtrasIdentificaciones] = useState('');
  const [nombreEdificio, setNombreEdificio] = useState('');
  const [uso, setUso] = useState('');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [fecha, setFecha] = useState({ year: '', month: '', day: '' });
  const [hora, setHora] = useState('');
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
  const [ocupacion2, setOcupacion2] = useState('');
  const [tipoSuelo, setTipoSuelo] = useState('');
  const [comentario, setComentario] = useState('');
  //fema 3
  const [resultado, setResultado] = useState('');
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
      adjuntarFotografica, setAdjuntarFotografica,
      adjuntarGrafico, setAdjuntarGrafico,
      direccion, setDireccion,
      zip, setZip,
      otrasIdentificaciones, setOtrasIdentificaciones,
      nombreEdificio, setNombreEdificio,
      uso, setUso,
      latitud, setLatitud,
      longitud, setLongitud,
      fecha, setFecha,
      hora, setHora,
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
      ocupacion2, setOcupacion2,
      tipoSuelo, setTipoSuelo,
      comentario, setComentario,
      //fema 3
      
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
