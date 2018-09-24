import {animate, animation, keyframes, style} from '@angular/animations';
const defaultTime = 300;

export const anim = {
    fadeOut: animation([
        animate('{{ time }}ms cubic-bezier(0.2, 1, 0.2, 1)',
            keyframes([
            style({
                opacity: 1,
                offset: 0
            }),
                style({
                    opacity: 0,
                    offset: 1
                }),
        ]))
    ], {
        params: {
            time: defaultTime
        }
    }),
    fadeIn: animation([
        animate('{{ time }}ms',
            keyframes([
                style({
                    opacity: 0,
                    offset: 0}),
            style({
                opacity: 1,
                offset: 1}),
        ]))
    ], {params: {
            time: defaultTime
        }}),
    scrollOut: animation([
        animate('{{ time }}ms',
            keyframes([
                style({
                    height: '*',
                    offset: 0
                }),
                style({
                    height: '0px',
                    offset: 1
                }),
            ]))
    ], {
        params: {
            time: defaultTime
        }
    }),
    scrollIn: animation([
        animate('{{ time }}ms',
            keyframes([
                style({
                    height: '0px',
                    offset: 0}),
                style({
                    height: '*',
                    offset: 1}),
            ]))
    ], {params: {
            time: defaultTime
        }}),
    slideRightIn: animation([
        animate('{{ time }}ms cubic-bezier(0.2, 1, 0.2, 1)',
            keyframes([
                style({
                    transform: 'translateX(100%)',
                    opacity: 0,
                    // display: 'none',
                    offset: 0
                }),
                style({
                    transform: 'translateX(100%)',
                    opacity: 0,
                    // display: '*',
                    offset: 0.1
                }),
                style({
                    transform: 'translateX(0)',
                    opacity: 1,
                    // display: '*',
                    offset: 1
                })
            ]))
    ], {
        params: {
            time: defaultTime
        }
    }),
    slideRightOut: animation([
        animate('{{ time }}ms',
            keyframes([
                style({
                    transform: 'translateX(0)',
                    opacity: 1,
                    // display: '*',
                    offset: 0
                }),
                style({
                    transform: 'translateX(100%)',
                    opacity: 0,
                    // display: '*',
                    offset: 0.9
                }),
                style({
                    transform: 'translateX(100%)',
                    opacity: 0,
                    // display: 'none',
                    offset: 1
                })
            ]))
    ], {params: {
            time: defaultTime
        }}),
    blurIn: animation([
        animate('{{ time }}ms cubic-bezier(0, 1, 0, 1)',
            keyframes([
                style({
                    filter: 'blur({{blur}})',
                    opacity: 0,
                    offset: 0
                }),
                style({
                    filter: 'none',
                    opacity: 1,
                    offset: 1
                })
            ]))
    ], {
        params: {
            time: defaultTime,
            blur: '3px'
        }
    }),
    blurOut: animation([
        animate('{{ time }}ms',
            keyframes([
                style({
                    filter: 'none',
                    opacity: 0,
                    offset: 0
                }),
                style({
                    filter: 'blur({{blur}})',
                    opacity: 0,
                    offset: 1
                })
            ]))
    ], {params: {
            time: defaultTime,
            blur: '3px'
        }}),
};
