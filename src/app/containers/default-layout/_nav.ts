import { INavData } from '@coreui/angular';

export class NavItem {
  public ItemsInstitution: INavData[] = [
    {
      name: 'Deportista',
      url: '/sportsman',
      iconComponent: { name: 'directions_run' },
      badge: {
        color: 'info',
        text: 'NEW',
      },
    },
    {
      name: 'Entrenador',
      url: '/Entrenador',
      iconComponent: { name: 'how_to_reg' },
      badge: {
        color: 'info',
        text: 'NEW',
      },
    },
    {
      name: 'Complementos',
      url: '/Complementos',
      iconComponent: { name: 'widgets' },
      badge: {
        color: 'info',
        text: 'NEW',
      },
    },
  ];

  public ItemsCoach: INavData[] = [
    {
      name: 'Deportista',
      url: '/sportsman',
      iconComponent: { name: 'directions_run' },
      badge: {
        color: 'info',
        text: 'NEW',
      },
    },
    {
      name: 'Plan Anual',
      url: '/plan-anual',
      iconComponent: { name: ' calendar_month' },
      badge: {
        color: 'info',
        text: 'NEW',
      },
    },
    {
      name: 'Ejercicios',
      url: '/Ejercicios',
      iconComponent: { name: 'fitness_center' },
      badge: {
        color: 'info',
        text: 'NEW',
      },
    },
    {
      name: 'Complementos',
      url: '/Complementos',
      iconComponent: { name: 'widgets' },
      badge: {
        color: 'info',
        text: 'NEW',
      },
    },
  ];
}