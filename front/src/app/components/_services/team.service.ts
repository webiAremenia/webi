import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  teams = [
    {
      name: 'EDUARD',
      job: 'CEO',
      img: 'Mask Group 9.png',
      description: 'lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur cupiditate, doloremque earum eligendi excepturi impedit ipsum magni natus nemo nostrum officia omnis optio, ullam voluptatem. Ad eum labore tenetur.'
    },
    {
      name: 'FARAZ',
      job: 'CTO',
      img: 'Mask Group 8.png',
      description: 'lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur cupiditate, doloremque earum eligendi excepturi impedit ipsum magni natus nemo nostrum officia omnis optio, ullam voluptatem. Ad eum labore tenetur.'
    },
    {
      name: 'ARTUR',
      job: 'CEO',
      img: 'Mask Group 8.png',
      description: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur cupiditate, doloremque earum eligendi excepturi impedit ipsum magni natus nemo nostrum officia omnis optio, ullam voluptatem. Ad eum labore tenetur.'
    },
    {
      name: 'VAZGEN',
      job: 'CEO',
      img: 'Mask Group 9.png',
      description: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur cupiditate, doloremque earum eligendi excepturi impedit ipsum magni natus nemo nostrum officia omnis optio, ullam voluptatem. Ad eum labore tenetur.'
    },
    {
      name: 'LEVON',
      job: 'CEO',
      img: 'Mask Group 8.png',
      description: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur cupiditate, doloremque earum eligendi excepturi impedit ipsum magni natus nemo nostrum officia omnis optio, ullam voluptatem. Ad eum labore tenetur.'
    },
    {
      name: 'EDUARD',
      job: 'CTO',
      img: 'Mask Group 9.png',
      description: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur cupiditate, doloremque earum eligendi excepturi impedit ipsum magni natus nemo nostrum officia omnis optio, ullam voluptatem. Ad eum labore tenetur.'
    },
    {
      name: 'LEVON',
      job: 'CEO',
      img: 'Mask Group 8.png',
      description: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur cupiditate, doloremque earum eligendi excepturi impedit ipsum magni natus nemo nostrum officia omnis optio, ullam voluptatem. Ad eum labore tenetur.'
    },
    {
      name: 'EDUARD',
      job: 'CTO',
      img: 'Mask Group 9.png',
      description: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur cupiditate, doloremque earum eligendi excepturi impedit ipsum magni natus nemo nostrum officia omnis optio, ullam voluptatem. Ad eum labore tenetur.'
    },
    {
      name: 'LEVON',
      job: 'CEO',
      img: 'Mask Group 8.png',
      description: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur cupiditate, doloremque earum eligendi excepturi impedit ipsum magni natus nemo nostrum officia omnis optio, ullam voluptatem. Ad eum labore tenetur.'
    },
    {
      name: 'EDUARD',
      job: 'CTO',
      img: 'Mask Group 9.png',
      description: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur cupiditate, doloremque earum eligendi excepturi impedit ipsum magni natus nemo nostrum officia omnis optio, ullam voluptatem. Ad eum labore tenetur.'
    },
    {
      name: 'LEVON',
      job: 'CEO',
      img: 'Mask Group 8.png',
      description: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur cupiditate, doloremque earum eligendi excepturi impedit ipsum magni natus nemo nostrum officia omnis optio, ullam voluptatem. Ad eum labore tenetur.'
    },
    {
      name: 'EDUARD',
      job: 'CTO',
      img: 'Mask Group 9.png',
      description: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur cupiditate, doloremque earum eligendi excepturi impedit ipsum magni natus nemo nostrum officia omnis optio, ullam voluptatem. Ad eum labore tenetur.'
    },
    {
      name: 'LEVON',
      job: 'CEO',
      img: 'Mask Group 8.png',
      description: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur cupiditate, doloremque earum eligendi excepturi impedit ipsum magni natus nemo nostrum officia omnis optio, ullam voluptatem. Ad eum labore tenetur.'
    },
    {
      name: 'EDUARD',
      job: 'CTO',
      img: 'Mask Group 9.png',
      description: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur cupiditate, doloremque earum eligendi excepturi impedit ipsum magni natus nemo nostrum officia omnis optio, ullam voluptatem. Ad eum labore tenetur.'
    },
    {
      name: 'EDUARD',
      job: 'CTO',
      img: 'Mask Group 9.png',
      description: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Ab consectetur cupiditate, doloremque earum eligendi excepturi impedit ipsum magni natus nemo nostrum officia omnis optio, ullam voluptatem. Ad eum labore tenetur.'
    }
  ];

  getTeam() {
    return this.teams;
  }


}
