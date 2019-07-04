import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import {SettingService} from '../../../_services/setting.service';
import {ScrollService} from '../../../_services/scroll.service';
import {Subscription} from 'rxjs';
import {fadeInYAnimation} from '../../../_animations';

// import {$} from 'protractor';

@Component({
    selector: 'app-introduction',
    templateUrl: './introduction.component.html',
    styleUrls: ['./introduction.component.scss'],
    animations: [fadeInYAnimation]
})
export class IntroductionComponent implements OnInit, AfterViewInit, OnDestroy {
    // @ts-ignore
    @ViewChild('myCanvas', {static: false}) myCanvas: ElementRef;
    public ctx: CanvasRenderingContext2D;
    state = 'show';
    stateSubscription: Subscription;

    title = '';
    text = '';

    constructor(
        private scrollService: ScrollService,
        private settingsService: SettingService,
        private el: ElementRef) {
        this.stateSubscription = this.scrollService.getScrollAnimation().subscribe(
            animation => this.state = animation.introduction
        );
    }

    componentHeight() {
        return this.el.nativeElement.offsetTop;
    }

    ngOnInit() {
        this.title = this.settingsService.getValueByKeyLanguage('home-introduction-title', 'en');
        this.text = this.settingsService.getValueByKeyLanguage('home-introduction-text', 'en');
    }

    ngOnDestroy() {
        this.stateSubscription.unsubscribe();
    }

    ngAfterViewInit() {
        setTimeout(() => {
            const canvas = (this.myCanvas.nativeElement as HTMLCanvasElement);
            if (canvas) {
                let canW = parseInt(canvas.getAttribute('width'), 10);
                let canH = parseInt(canvas.getAttribute('height'), 10);
                this.ctx = canvas.getContext('2d');

                const ballColor = {
                    r: 255,
                    g: 255,
                    b: 255
                };
                const R = 2;
                let balls = [];
                const alphaF = 0.03;
                const linkLineWidth = 0.8;
                const disLimit = 260;
                let mouseIn = false;
                const mouseBall = {
                    x: 0,
                    y: 0,
                    vx: 0,
                    vy: 0,
                    r: 1,
                    type: 'mouse'
                };

                const randomNumFrom = (min, max) => Math.random() * (max - min) + min;
                const getRandomSpeed = pos => {
                    const min = -1;
                    const max = 1;
                    switch (pos) {
                        case 'top':
                            return [randomNumFrom(min, max), randomNumFrom(0.1, max)];
                        case 'right':
                            return [randomNumFrom(min, -0.1), randomNumFrom(min, max)];
                        case 'bottom':
                            return [randomNumFrom(min, max), randomNumFrom(min, -0.1)];
                        case 'left':
                            return [randomNumFrom(0.1, max), randomNumFrom(min, max)];
                        default:
                            return;
                    }
                };

                const randomArrayItem = arr => arr[Math.floor(Math.random() * arr.length)];
                const randomSidePos = length => Math.ceil(Math.random() * length);
                const getRandomBall = () => {
                    const pos = randomArrayItem(['top', 'right', 'bottom', 'left']);
                    switch (pos) {
                        case 'top':
                            return {
                                x: randomSidePos(canW),
                                y: -R,
                                vx: getRandomSpeed('top')[0],
                                vy: getRandomSpeed('top')[1],
                                r: R,
                                alpha: 1,
                                phase: randomNumFrom(0, 10)
                            };
                        case 'right':
                            return {
                                x: canW + R,
                                y: randomSidePos(canH),
                                vx: getRandomSpeed('right')[0],
                                vy: getRandomSpeed('right')[1],
                                r: R,
                                alpha: 1,
                                phase: randomNumFrom(0, 10)
                            };
                        case 'bottom':
                            return {
                                x: randomSidePos(canW),
                                y: canH + R,
                                vx: getRandomSpeed('bottom')[0],
                                vy: getRandomSpeed('bottom')[1],
                                r: R,
                                alpha: 1,
                                phase: randomNumFrom(0, 10)
                            };
                        case 'left':
                            return {
                                x: -R,
                                y: randomSidePos(canH),
                                vx: getRandomSpeed('left')[0],
                                vy: getRandomSpeed('left')[1],
                                r: R,
                                alpha: 1,
                                phase: randomNumFrom(0, 10)
                            };
                    }
                };

                const renderBalls = () => {
                    Array.prototype.forEach.call(balls, b => {
                        if (!b.hasOwnProperty('type')) {
                            this.ctx.fillStyle = 'rgba(' + ballColor.r + ',' + ballColor.g + ',' + ballColor.b + ',' + b.alpha + ')';
                            this.ctx.beginPath();
                            this.ctx.arc(b.x, b.y, R, 0, Math.PI * 2, true);
                            this.ctx.closePath();
                            this.ctx.fill();
                        }
                    });
                };
                const updateBalls = () => {
                    const newBalls = [];
                    Array.prototype.forEach.call(balls, b => {
                        b.x += b.vx;
                        b.y += b.vy;
                        if (b.x > -(5) && b.x < (canW + 5) && b.y > -(5) && b.y < (canH + 5)) {
                            newBalls.push(b);
                        }
                        b.phase += alphaF;
                        b.alpha = Math.abs(Math.cos(b.phase));
                    });

                    balls = newBalls.slice(0);
                };
                const getDisOf = (b1, b2) => {
                    const deltaX = Math.abs(b1.x - b2.x);
                    const deltaY = Math.abs(b1.y - b2.y);

                    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                };
                const renderLines = () => {
                    let fraction;
                    let alpha;
                    for (let i = 0; i < balls.length; i++) {
                        for (let j = i + 1; j < balls.length; j++) {
                            fraction = getDisOf(balls[i], balls[j]) / disLimit;
                            if (fraction < .5) {
                                alpha = (.8 - fraction).toString();
                                this.ctx.strokeStyle = 'rgba(255,255,255,' + alpha + ')';
                                this.ctx.lineWidth = linkLineWidth;
                                this.ctx.beginPath();
                                this.ctx.moveTo(balls[i].x, balls[i].y);
                                this.ctx.lineTo(balls[j].x, balls[j].y);
                                this.ctx.stroke();
                                this.ctx.closePath();
                            }
                        }
                    }
                };

                const addBallIfy = () => {
                    if (balls.length < 80) {
                        balls.push(getRandomBall());
                    }
                };

                const render = () => {
                    this.ctx.clearRect(0, 0, canW, canH);
                    renderBalls();
                    renderLines();
                    updateBalls();
                    addBallIfy();
                    window.requestAnimationFrame(render);
                };

                const initBalls = num => {
                    for (let i = 1; i <= num; i++) {
                        balls.push({
                            x: randomSidePos(canW),
                            y: randomSidePos(canH),
                            vx: getRandomSpeed('top')[0],
                            vy: getRandomSpeed('top')[1],
                            r: R,
                            alpha: 1,
                            phase: randomNumFrom(0, 10)
                        });
                    }
                };

                const initCanvas = () => {
                    const effect = document.getElementById('effect');
                    canvas.setAttribute('width', effect.scrollHeight.toString());
                    canvas.setAttribute('height', effect.offsetWidth.toString());
                    canW = parseInt(canvas.getAttribute('width'), 10);
                    canH = parseInt(canvas.getAttribute('height'), 10);
                };

                window.addEventListener('resize', e => {
                    initCanvas();
                });

                const goMovie = () => {
                    initCanvas();
                    initBalls(80);
                    window.requestAnimationFrame(render);
                };

                goMovie();
                canvas.addEventListener('mouseenter', () => {
                    mouseIn = true;
                    balls.push(mouseBall);
                });
                canvas.addEventListener('mouseleave', () => {
                    mouseIn = false;
                    const newBalls = [];
                    Array.prototype.forEach.call(balls, b => {
                        if (!b.hasOwnProperty('type')) {
                            newBalls.push(b);
                        }
                    });
                    balls = newBalls.slice(0);
                });
                canvas.addEventListener('mousemove', (el) => {
                    // const e = el || window.event;
                    mouseBall.x = el.offsetX;
                    mouseBall.y = el.offsetY;
                });
            }
        }, 0);
    }
}


