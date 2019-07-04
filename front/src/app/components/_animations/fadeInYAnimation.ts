import {animate, state, style, transition, trigger} from '@angular/animations';

export const fadeInYAnimation =
    trigger('scrollAnimation', [
        state('show', style({
            opacity: 1,
            transform: 'translateY(0)'
        })),
        state('hide', style({
            opacity: 0,
            transform: 'translateY(+100%)'
        })),
        transition('show => hide', animate('700ms ease-out')),
        transition('hide => show', animate('700ms ease-in'))
    ]);
