export const columnsEjerciciosValue = [
    {
      displayname: 'Nombre',
      name:'Name',
      estado: true,
      type: "text"
    },
    {
      displayname: 'Abreviatura',
      name:'Abbreviation',
      estado: true,
      type: "text"
    },
    {
        displayname: 'Grupo',
        name:'GrupoAbbreviation',
        estado: true,
        type: "text"
    },
    {
      displayname: 'Subgrupo',
      name:'SubGrupoAbbreviation',
      estado: true,
      type: "text"
    },
    {
        displayname: 'Tipo relación',
        name:'Relationship',
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
