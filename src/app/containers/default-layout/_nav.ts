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
      iconComponent: { name: 'fitness_center' },
      badge: {
        color: 'info',
        text: 'NEW',
      },
    }
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
      iconComponent: { name: 'widgets' },
      badge: {
        color: 'info',
        text: 'NEW',
      },
    }
  ];
}