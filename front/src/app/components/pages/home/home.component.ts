import {AfterViewInit, Component, HostListener, OnInit, ViewChild, AfterViewChecked, AfterContentInit} from '@angular/core';
import {IntroductionComponent} from './introduction/introduction.component';
import {ProcessComponent} from './process/process.component';
import {SuggestComponent} from './suggest/suggest.component';
import {TeamComponent} from './team/team.component';
import {ScrollService} from '../../_services/scroll.service';
import {PortfolioComponent} from '../portfolio/portfolio.component';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
    currentSection = 'section1';
    mouseWheel: number;
    introductionComponentHeight: number;
    processComponentHeight: number;
    portfolioComponentHeight: number;
    suggestComponentHeight: number;
    teamComponentHeight: number;
    divider = 30;
    // @ts-ignore
    @ViewChild(IntroductionComponent, {static: false})
    private introductionComponent: IntroductionComponent;
    // @ts-ignore
    @ViewChild(ProcessComponent, {static: false})
    private processComponent: ProcessComponent;
    // @ts-ignore
    @ViewChild(PortfolioComponent, {static: false})
    private portfolioComponent: PortfolioComponent;
    // @ts-ignore
    @ViewChild(SuggestComponent, {static: false})
    private suggestComponent: SuggestComponent;
    // @ts-ignore
    @ViewChild(TeamComponent, {static: false})
    private teamComponent: TeamComponent;
    constructor(private scrollService: ScrollService) {
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.introductionComponentHeight = this.introductionComponent.componentHeight();
            this.processComponentHeight = this.processComponent.componentHeight();
            this.portfolioComponentHeight = this.portfolioComponent.componentHeight();
            this.suggestComponentHeight = this.suggestComponent.componentHeight();
            this.teamComponentHeight = this.teamComponent.componentHeight();
            console.log(
                this.introductionComponentHeight,
                this.processComponentHeight,
                this.portfolioComponentHeight,
                this.suggestComponentHeight,
                this.teamComponentHeight);
            console.log(document.documentElement.clientHeight);
        }, 500);
    }
    onSectionChange(sectionId: string) {
        this.currentSection = sectionId;
    }
    @HostListener('document:mousewheel', ['$event']) onDocumentMousewheelEvent(event) {
        this.mouseWheel = event.deltaY;
    }
    @HostListener('window:scroll', ['$event']) checkScroll() {
        const scrollPosition = window.pageYOffset;
        console.log(scrollPosition);
        if (scrollPosition === this.introductionComponentHeight ||
            scrollPosition === this.processComponentHeight ||
            scrollPosition === this.portfolioComponentHeight ||
            scrollPosition === this.suggestComponentHeight ||
            scrollPosition === this.teamComponentHeight) {
            this.mouseWheel = null;
        }
        if (scrollPosition >= this.introductionComponentHeight && scrollPosition <= this.processComponentHeight) {
            if (this.mouseWheel > 0 && scrollPosition + document.documentElement.clientHeight > this.processComponentHeight) {
                if (pageYOffset + this.divider > this.processComponentHeight) {
                    return scrollTo(0, this.processComponentHeight);
                }
                scrollTo(0, pageYOffset + this.divider);
            } else if (this.mouseWheel < 0) {
                if (pageYOffset - this.divider < this.introductionComponentHeight) {
                    return scrollTo(0, this.introductionComponentHeight);
                }
                scrollTo(0, pageYOffset - this.divider);
            }
        } else if (scrollPosition >= this.processComponentHeight && scrollPosition <= this.portfolioComponentHeight) {
            if (this.mouseWheel > 0 && scrollPosition + document.documentElement.clientHeight > this.portfolioComponentHeight) {
                if (pageYOffset + this.divider > this.portfolioComponentHeight) {
                    return scrollTo(0, this.portfolioComponentHeight);
                }
                scrollTo(0, pageYOffset + this.divider);
            } else if (this.mouseWheel < 0) {
                if (pageYOffset - this.divider < this.processComponentHeight) {
                    return scrollTo(0, this.processComponentHeight);
                }
                scrollTo(0, pageYOffset - this.divider);
            }
        } else if (scrollPosition >= this.portfolioComponentHeight && scrollPosition <= this.suggestComponentHeight) {
            if (this.mouseWheel > 0 && scrollPosition + document.documentElement.clientHeight > this.suggestComponentHeight) {
                if (pageYOffset + this.divider > this.suggestComponentHeight) {
                    return scrollTo(0, this.suggestComponentHeight);
                }
                scrollTo(0, pageYOffset + this.divider);
            } else if (this.mouseWheel < 0) {
                if (pageYOffset - this.divider < this.portfolioComponentHeight) {
                    return scrollTo(0, this.portfolioComponentHeight);
                }
                scrollTo(0, pageYOffset - this.divider);
            }
        } else if (scrollPosition >= this.suggestComponentHeight && scrollPosition <= this.teamComponentHeight) {
            if (this.mouseWheel > 0 && scrollPosition + document.documentElement.clientHeight > this.teamComponentHeight) {
                if (pageYOffset + this.divider > this.teamComponentHeight) {
                    return scrollTo(0, this.teamComponentHeight);
                }
                scrollTo(0, pageYOffset + this.divider);
            } else if (this.mouseWheel < 0) {
                if (pageYOffset - this.divider < this.suggestComponentHeight) {
                    return scrollTo(0, this.suggestComponentHeight);
                }
                scrollTo(0, pageYOffset - this.divider);
            }
        }
        // // // Show Components // // //
        if (scrollPosition === this.introductionComponentHeight || scrollPosition === 0) {
            this.currentSection = 'section1';
            console.log(`introductionComponentHeight`);
            const data = {
                introduction: 'show',
                process: 'hide',
                portfolio: 'hide',
                suggest: 'hide',
                team: 'hide'
            };
            this.scrollService.setScrollAnimation(data);
        } else if (scrollPosition === this.processComponentHeight) {
            console.log(`processComponentHeight`);
            this.currentSection = 'section2';
            const data = {
                introduction: 'hide',
                process: 'show',
                portfolio: 'hide',
                suggest: 'hide',
                team: 'hide'
            };
            this.scrollService.setScrollAnimation(data);
        } else if (scrollPosition === this.portfolioComponentHeight) {
            console.log(`portfolioComponentHeight`);
            this.currentSection = 'section3';
            const data = {
                introduction: 'hide',
                process: 'hide',
                portfolio: 'show',
                suggest: 'hide',
                team: 'hide'
            };
            this.scrollService.setScrollAnimation(data);
        } else if (scrollPosition === this.suggestComponentHeight) {
            console.log(`suggestComponentHeight`);
            this.currentSection = 'section4';
            const data = {
                introduction: 'hide',
                process: 'hide',
                portfolio: 'hide',
                suggest: 'show',
                team: 'hide'
            };
            this.scrollService.setScrollAnimation(data);
        } else if (scrollPosition === this.teamComponentHeight) {
            console.log(`teamComponentHeight`);
            this.currentSection = 'section5';
            const data = {
                introduction: 'hide',
                process: 'hide',
                portfolio: 'hide',
                suggest: 'hide',
                team: 'show'
            };
            this.scrollService.setScrollAnimation(data);
        }
    }
}