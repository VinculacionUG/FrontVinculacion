// AppContext.js
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Definir múltiples variables de estado
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
  const [numeroPiso, setNumeroPiso] = useState('');
  const [inf, setInf] = useState('');
  const [anoConstruccion, setAnoConstruccion] = useState('');
  const [areaTotalDePiso, setAreaTotalDePiso] = useState('');
  const [anoCodigo, setAnoCodigo] = useState('');
  const [ampliacion, setAmpliacion] = useState('');
  const [anoDeContruccion, setAnoDeContruccion] = useState('');
  const [checkBox1, setCheckBox1] = useState(false);
  const [checkBox2, setCheckBox2] = useState(false);
  const [checkBox3, setCheckBox3] = useState(false);
  const [checkBox4, setCheckBox4] = useState(false);
  const [checkBox5, setCheckBox5] = useState(false);
  const [checkBox6, setCheckBox6] = useState(false);
  const [checkBox7, setCheckBox7] = useState(false);
  const [checkBox8, setCheckBox8] = useState(false);
  const [checkBox9, setCheckBox9] = useState(false);
  const [ocupacion, setOcupacion] = useState('');
  const [tipoocupacion, setTipoocupacion] = useState('');
  const [tipoSuelo, setTipoSuelo] = useState('');
  const [comentario, setComentario] = useState('');
  const [exterior, setExterior] = useState('');
  const [interior, setInterior] = useState('');
  const [revisionPlanos, setRevisionPlanos] = useState('');
  const [fuenteDelTipoDeSuelo, setFuenteDelTipoDeSuelo] = useState('');
  const [fuenteDePeligrosGeologicos, setFuenteDePeligrosGeologicos] = useState('');
  const [contactoDeLaPersona, setContactoDeLaPersona] = useState('');
  const [otrosPeligros, setOtrosPeligros] = useState('');
  const [pregunta1Fema5, setPregunta1Fema5] = useState('');
  const [pregunta2Fema5, setPregunta2Fema5] = useState('');
  const [inspeccionNivel, setInspeccionNivel] = useState('');

  return (
    <AppContext.Provider value={{
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
      numeroPiso, setNumeroPiso,
      inf, setInf,
      anoConstruccion, setAnoConstruccion,
      areaTotalDePiso, setAreaTotalDePiso,
      anoCodigo, setAnoCodigo,
      ampliacion, setAmpliacion,
      anoDeContruccion, setAnoDeContruccion,
      checkBox1, setCheckBox1,
      checkBox2, setCheckBox2,
      checkBox3, setCheckBox3,
      checkBox4, setCheckBox4,
      checkBox5, setCheckBox5,
      checkBox6, setCheckBox6,
      checkBox7, setCheckBox7,
      checkBox8, setCheckBox8,
      checkBox9, setCheckBox9,
      ocupacion, setOcupacion,
      tipoocupacion, setTipoocupacion,
      tipoSuelo, setTipoSuelo,
      comentario, setComentario,
      exterior, setExterior,
      interior, setInterior,
      revisionPlanos, setRevisionPlanos,
      fuenteDelTipoDeSuelo, setFuenteDelTipoDeSuelo,
      fuenteDePeligrosGeologicos, setFuenteDePeligrosGeologicos,
      contactoDeLaPersona, setContactoDeLaPersona,
      otrosPeligros, setOtrosPeligros,
      pregunta1Fema5, setPregunta1Fema5,
      pregunta2Fema5, setPregunta2Fema5,
      inspeccionNivel, setInspeccionNivel
    }}>
      {children}
    </AppContext.Provider>
  );
};
