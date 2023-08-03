import {
    animate,
    state,
    style,
    transition,
    trigger,
  } from '@angular/animations';
  
  export const expandableRowAnimation = trigger('expandableRow', [
    state(
      'collapsed',
      style({
        'border-bottom': '0',
        'min-height': '0',
        height: '0',
        display: 'none',
        overflow: 'hidden',
      })
    ),
    state('expanded', style({ height: '*' })),
    transition(
      'expanded <=> collapsed',
      animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
    ),
  ]);