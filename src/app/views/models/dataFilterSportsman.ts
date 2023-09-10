export const jsonData = [
    {
      title:'Categoria',
      property: 'category',
      disable:false,
      isOpen:false,
      typeFilter:"check",
      control:[
        {name:'Pony', value:'Pony', code:''},
        {name:'Amateur', value:'Amateur', code:''},
        {name:'Juvenil', value:'juvenil', code:''},
        {name:'Profesional', value: 'Profesional', code:''}
      ]
    },{
      title:'Genero',
      property: 'gender',
      disable:false,
      isOpen:false,
      typeFilter:"check",
      control:[
        {name:'Dama', value:'F', code:'F'},
        {name:'Varón', value:'M', code:'M'}
      ]
    },
    {
      title:'Tipo de identificación',
      property: 'typeIdentification' ,
      disable:false,
      isOpen:false,
      typeFilter:"check",
      control:[
        {name:'Tarjetas de identidad', value:'TI', code:'TI'},
        {name:'Cédula de ciudadanía', value:'CC', code:'CC'},
        {name:'Cédula de extranjería', value:'CE', code:'CE'},
        {name:'Pasaporte', value:'PB', code:'PB'}
      ]
    },
    {
      title:'No. identificación',
      property: 'identificacion',
      disable:false,
      isOpen:false,
      typeFilter:"input",
      control:[
        { name: 'identificacion', value: '' ,code:''}
      ]
    }
  ]

  export interface SportsmanData {
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
