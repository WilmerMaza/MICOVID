export const jsonData = [
    {
      title:'Grupo',
      property: 'nameGrupo',
      disable:false,
      isOpen:false,
      typeFilter:"check",
      control:[
      ]
    },
    {
      title:'Subgrupo',
      property: 'nameSubGrupo',
      disable:false,
      isOpen:false,
      typeFilter:"input",
      control:[
        { name: 'nameSubGrupo', value: '' ,code:''}
      ]
    },
    {
      title:'Abreviación',
      property: 'abbreviation',
      disable:false,
      isOpen:false,
      typeFilter:"input",
      control:[
        { name: 'abbreviation', value: '' ,code:''}
      ]
    },
    {
      title:'Tipo de Relación',
      property: 'relationship' ,
      disable:false,
      isOpen:false,
      typeFilter:"check",
      control:[
        {name:'Directa', value:'DIR', code:'DIR'},
        {name:'Inversa', value:'INV', code:'INV'},
      ]
    },
  ]

  export interface EjerciciosData {
    title: string;
    property: string;
    disable: boolean;
    isOpen: boolean;
    typeFilter: string;
    control: ControlItem[];
}

export interface ControlItem {
  name: string;
  value: string;
  code: string;
}
