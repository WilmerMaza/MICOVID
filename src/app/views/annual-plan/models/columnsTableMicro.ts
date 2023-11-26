export const columnsEntrenadorValue = [
  {
    displayname: 'No. Microciclo',
    name: 'number_micro',
    estado: true,
    type: 'text',
  },
  {
    displayname: 'Mes',
    name: 'month',
    estado: true,
    type: 'text',
  },
  {
    displayname: 'Fecha de inicio',
    name: 'date_initial',
    estado: true,
    type: 'date',
    attr: 'dd',
  },
  {
    displayname: 'Fecha de cierre',
    name: 'date_end',
    estado: true,
    type: 'date',
    attr: 'dd',
  },
  {
    displayname: 'Etapas',
    name: 'stages',
    estado: true,
    type: 'text',
  },
  {
    displayname: 'acción',
    estado: true,
    type: 'action',
    menu: [
      { action: 'ver', text: 'Ver Actvidades' },
      { action: 'asignar', text: 'Asignar etapa' },
    ],
  },
];
