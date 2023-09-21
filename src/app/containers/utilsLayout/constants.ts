export interface stiky {
    roll:string;
    text:string;
    color:string;
    textColor:string;
    showLinkPlan:boolean
}
  
export const objectStikyUser:stiky[] = [
    {
      roll: "Admin",
      text: "Institución deportiva",
      color: "#AFFE8A",
      textColor:'#3DBF00',
      showLinkPlan: true
    },
    {
      roll: "Entrenador",
      text: "Entrenador",
      color: "#0DDCF9",
      textColor: '#3776F2',
      showLinkPlan: false
    }
];
  