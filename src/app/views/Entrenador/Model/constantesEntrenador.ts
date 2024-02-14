import { listInfo } from './entrenadorModel';

export const gender: Array<listInfo> = [
  {
    value: 'Dama',
    code: 'F',
  },
  {
    value: 'Varón',
    code: 'M',
  },
];

export const entradorNivelEducativo: Array<listInfo> = [
  {
    value: 'Técnico',
    code: 'tecnico',
  },
  {
    value: 'Tecnólogo',
    code: 'tecnologo',
  },
  {
    value: 'Profesional',
    code: 'profesional',
  },
  
  {
    value: 'Especialista',
    code: 'especialista',
  },
  {
    value: 'Máster',
    code: 'master',
  },
  {
    value: 'Doctorado',
    code: 'doctorado',
  },
  {
    value: 'Otro',
    code: 'otro',
  },
];

export const typeIdentification: Array<listInfo> = [
  {
    value: 'Cédula de ciudadanía',
    code: 'CC',
  },
  {
    value: 'Tarjetas de identidad',
    code: 'TI',
  },
  {
    value: 'Cédula de extranjería',
    code: 'CE',
  },
  {
    value: 'Pasaporte ',
    code: 'PB',
  },
];
