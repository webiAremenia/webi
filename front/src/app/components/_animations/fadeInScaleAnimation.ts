import {animate, state, style, transition, trigger} from '@angular/animations';

export const fadeInSacleAnimation =
    trigger('scrollAnimation', [
        state('show', style({
            transform: 'scale(1)'
            // opacity: 1,
            // transform: 'translateX(0)'
        })),
        state('hide', style({
            transform: 'scale(0)'
            // opacity: 0,
            // transform: 'translateX(-100%)'
        })),
        transition('show => hide', animate('700ms ease-out')),
        transition('hide => show', animate('700ms ease-in'))
    ]);
