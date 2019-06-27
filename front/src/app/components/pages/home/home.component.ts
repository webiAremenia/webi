import {AfterViewInit, Component, HostListener, OnInit, ViewChild, AfterViewChecked, AfterContentInit, OnDestroy} from '@angular/core';
import {IntroductionComponent} from './introduction/introduction.component';
import {ProcessComponent} from './process/process.component';
import {SuggestComponent} from './suggest/suggest.component';
import {TeamComponent} from './team/team.component';
import {ScrollService} from '../../_services/scroll.service';
import {PortfolioComponent} from '../portfolio/portfolio.component';
import { SliderComponent } from '../../partials/slider/slider.component';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
    currentSection = 'section1';

    introductionComponentHeight: number;
    sliderComponentHeight: number;
    processComponentHeight: number;
    portfolioComponentHeight: number;
    suggestComponentHeight: number;
    teamComponentHeight: number;

    @ViewChild(IntroductionComponent, {static: false})
    private introductionComponent: IntroductionComponent;

    @ViewChild(SliderComponent, {static: false})
    private sliderComponent: SliderComponent;

    @ViewChild(ProcessComponent, {static: false})
    private processComponent: ProcessComponent;

    @ViewChild(PortfolioComponent, {static: false})
    private portfolioComponent: PortfolioComponent;

    @ViewChild(SuggestComponent, {static: false})
    private suggestComponent: SuggestComponent;

    @ViewChild(TeamComponent, {static: false})
    private teamComponent: TeamComponent;


    constructor(private scrollService: ScrollService) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.introductionComponentHeight = this.introductionComponent.componentHeight();
            this.sliderComponentHeight = this.sliderComponent.componentHeight();
            this.processComponentHeight = this.processComponent.componentHeight();
            this.portfolioComponentHeight = this.portfolioComponent.componentHeight();
            this.suggestComponentHeight = this.suggestComponent.componentHeight();
            this.teamComponentHeight = this.teamComponent.componentHeight();
            console.log(
                this.introductionComponentHeight,
                this.sliderComponentHeight,
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

    @HostListener('window:scroll', ['$event']) checkScroll() {
        const scrollPosition = Math.ceil(window.pageYOffset + (document.documentElement.clientHeight / 2));
        if (scrollPosition  > this.sliderComponentHeight &&
            scrollPosition < this.processComponentHeight) {
            console.log('sliderComponentHeight');
            const data  = {
                slider: 'show'
            };
            this.scrollService.setScrollAnimation(data);
        } else if (scrollPosition > this.processComponentHeight &&
            scrollPosition < this.portfolioComponentHeight) {
            console.log('processComponentHeight');
            const data  = {
                process: 'show'
            };
            this.scrollService.setScrollAnimation(data);
        } else if (scrollPosition > this.portfolioComponentHeight &&
            scrollPosition < this.suggestComponentHeight) {
            console.log('portfolioComponentHeight');
            const data  = {
                portfolio: 'show'
            };
            this.scrollService.setScrollAnimation(data);
        } else if (scrollPosition > this.suggestComponentHeight &&
            scrollPosition < this.teamComponentHeight) {
            console.log('suggestComponentHeight');
            const data  = {
                suggest: 'show'
            };
            this.scrollService.setScrollAnimation(data);
        } else if (scrollPosition > this.teamComponentHeight) {
            console.log('teamComponentHeight');
            const data  = {
                team: 'show'
            };
            this.scrollService.setScrollAnimation(data);
        }
    }

}
