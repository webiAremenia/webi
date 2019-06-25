import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-technology',
    templateUrl: './technology.component.html',
    styleUrls: ['./technology.component.css']
})
export class TechnologyComponent implements OnInit {
    icons =
        [
            {img: 'Jira.png', title: 'JIRA'},
            {img: 'JavaScript.png', title: 'Javascript'},
            {img: 'Java.png', title: 'Java'},
            {img: 'React.png', title: 'React'},
            {img: 'Cordova.png', title: 'Cordova'},
            {img: 'Xamarin.png', title: 'Xamarin'},
            {img: 'Android.png', title: 'Android'},
            {img: 'IOS.png', title: 'IOS'},
            {img: 'PostgresQL.png', title: 'PostgresQL'},
            {img: 'MySQL.png', title: 'MySQL'},
            {img: 'MS SQL-Server.png', title: 'MS SQL-Server'},
            {img: 'Python.png', title: 'Python'},
            {img: 'NodeJS.png', title: 'NodeJS'},
            {img: 'PHP.png', title: 'PHP'},
            {img: 'Ruby-on-Rails.png', title: 'Ruby-on-Rails'},
            {img: 'Net-Core.png', title: 'Net-Core'},
            {img: 'Firebase.png', title: 'Firebase'},
            {img: 'CSS3.png', title: 'CSS3'},
            {img: 'HTML.png', title: 'HTML'},
            {img: 'Polymer.png', title: 'Polymer'},
            {img: 'Appium-1.png', title: 'Appium'},
            {img: 'Adobe-CC.png', title: 'Adobe-CC'},
            {img: 'InVision.png', title: 'InVision'},
            {img: 'Sketch.png', title: 'Sketch'}
        ];

    constructor() {
    }

    ngOnInit() {
    }

}
