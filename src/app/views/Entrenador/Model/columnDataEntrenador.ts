export const columnsEntrenadorValue = [
    {
      displayname: 'No. identificación',
      name:'identification',
      estado: true,
      type: "text"
    },
    {
      displayname: 'Nombre completo',
      name:'name',
      estado: true,
      type: "text"
    },
    {
      displayname: 'Correo',
      name:'email',
      estado: true,
      type: "text"
    },
    {
        displayname: 'Teléfono',
        name:'phone',
        estado: true,
        type: "text"
    },
    {
      displayname:'acción',
      estado:true,
      type: "action",
      menu:[
        {action:'ver', text:'Ver'},
        {action:'Editar', text:'Editar'},
        {action:'planAnual', text:'Plan anual'}
      ]
    }
]
