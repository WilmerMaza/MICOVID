export const columnsValue = [
  {
    displayname: 'No. identificación',
    name: 'identification',
    estado: true,
    type: 'text',
  },
  {
    displayname: 'Tipo',
    name: 'typeIdentification',
    estado: true,
    type: 'text',
  },
  {
    displayname: 'Nombre completo',
    name: 'name',
    estado: true,
    type: 'text',
  },
  {
    displayname: 'Genero',
    name: 'gender',
    estado: true,
    type: 'text',
  },
  {
    displayname: 'Peso',
    name: 'weight',
    estado: true,
    type: 'text',
  },
  {
    displayname: 'Categoria',
    name: 'category',
    estado: true,
    type: 'text',
  },
  {
    displayname: 'acción',
    estado: true,
    type: 'action',
    menu: [
      {
        action: 'Menu',
        text: 'Ver',
        menu: [
          { action: 'verDeportista', text: 'Deportista' },
          { action: 'verEjercicios', text: 'Ejercicios' },
        ],
      },
      { action: 'Editar', text: 'Editar' },
    ],
  }
];
