import {
    AfterViewChecked, AfterViewInit,
    Component,
    HostListener, OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import {IntroductionComponent} from './introduction/introduction.component';
import {ProcessComponent} from './process/process.component';
import {SuggestComponent} from './suggest/suggest.component';
import {TeamComponent} from './team/team.component';
import {ScrollService} from '../../_services/scroll.service';
import {PortfolioComponent} from '../portfolio/portfolio.component';
import {SliderComponent} from '../../partials/slider/slider.component';
import {TechnologyComponent} from '../technology/technology.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    done = false;
    currentSection = 'section1';
    introductionComponentHeight: number;
    sliderComponentHeight: number;
    processComponentHeight: number;
    portfolioComponentHeight: number;
    technologyComponentHeight: number;
    suggestComponentHeight: number;
    teamComponentHeight: number;


    // @ts-ignore
    @ViewChild(IntroductionComponent, {static: false})
    private introductionComponent: IntroductionComponent;
    // @ts-ignore
    @ViewChild(SliderComponent, {static: false})
    private sliderComponent: SliderComponent;
    // @ts-ignore
    @ViewChild(ProcessComponent, {static: false})
    private processComponent: ProcessComponent;
    // @ts-ignore
    @ViewChild(PortfolioComponent, {static: false})
    private portfolioComponent: PortfolioComponent;
    // @ts-ignore
    @ViewChild(TechnologyComponent, {static: false})
    private technologyComponent: TechnologyComponent;
    // @ts-ignore
    @ViewChild(SuggestComponent, {static: false})
    private suggestComponent: SuggestComponent;
    // @ts-ignore
    @ViewChild(TeamComponent, {static: false})
    private teamComponent: TeamComponent;

    constructor(private scrollService: ScrollService) {
    }

    ngOnInit() {

        console.log(1);
        if (this.scrollService.data !== null) {
            this.done = true;
            console.log(2);

            this.introductionComponentHeight = this.scrollService.data.introduction;
            this.sliderComponentHeight = this.scrollService.data.slider;
            this.processComponentHeight = this.scrollService.data.process;
            this.portfolioComponentHeight = this.scrollService.data.portfolio;
            this.technologyComponentHeight = this.scrollService.data.technology;
            this.suggestComponentHeight = this.scrollService.data.suggest;
            this.teamComponentHeight = this.scrollService.data.team;
        }

        window.onload = () => {
            this.done = true;
            if (this.scrollService.data === null) {
                this.introductionComponentHeight = this.introductionComponent.componentHeight();
                this.sliderComponentHeight = this.sliderComponent.componentHeight();
                this.processComponentHeight = this.processComponent.componentHeight();
                this.portfolioComponentHeight = this.portfolioComponent.componentHeight();
                this.technologyComponentHeight = this.technologyComponent.componentHeight();
                this.suggestComponentHeight = this.suggestComponent.componentHeight();
                this.teamComponentHeight = this.teamComponent.componentHeight();

                const data = {
                    introduction: this.introductionComponent.componentHeight(),
                    slider: this.sliderComponent.componentHeight(),
                    process: this.processComponent.componentHeight(),
                    portfolio: this.portfolioComponent.componentHeight(),
                    technology: this.technologyComponent.componentHeight(),
                    suggest: this.suggestComponent.componentHeight(),
                    team: this.teamComponent.componentHeight()
                };
                this.scrollService.setComponentsHeight(data);
            }
        };
    }

    onSectionChange(sectionId: string) {
        this.currentSection = sectionId;
    }

    @HostListener('window:scroll', ['$event']) checkScroll() {
        const scrollPosition = Math.ceil(window.pageYOffset + (document.documentElement.clientHeight / 2));
        if (scrollPosition > this.sliderComponentHeight - 200 &&
            scrollPosition < this.processComponentHeight) {
            this.currentSection = 'section1';
            const data = {
                slider: 'show'
            };
            this.scrollService.setScrollAnimation(data);
        } else if (scrollPosition > this.processComponentHeight &&
            scrollPosition < this.portfolioComponentHeight) {
            this.currentSection = 'section2';
            const data = {
                process: 'show'
            };
            this.scrollService.setScrollAnimation(data);
        } else if (scrollPosition > this.portfolioComponentHeight &&
            scrollPosition < this.technologyComponentHeight) {
            this.currentSection = 'section3';
            const data = {
                portfolio: 'show'
            };
            this.scrollService.setScrollAnimation(data);


        } else if (scrollPosition > this.technologyComponentHeight &&
            scrollPosition < this.suggestComponentHeight) {
            this.currentSection = 'section4';
            const data = {
                technology: 'show'
            };
            this.scrollService.setScrollAnimation(data);


        } else if (scrollPosition > this.suggestComponentHeight &&
            scrollPosition < this.teamComponentHeight) {
            this.currentSection = 'section5';
            const data = {
                suggest: 'show'
            };
            this.scrollService.setScrollAnimation(data);
        } else if (scrollPosition > this.teamComponentHeight) {
            this.currentSection = 'section6';
            const data = {

                team: 'show'
            };
            this.scrollService.setScrollAnimation(data);
        }
    }

    ngOnDestroy(): void {
        window.scrollTo(0, window.innerWidth < 1000 ? 100 : 200);
    }
}
