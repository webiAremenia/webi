import {Injectable} from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class BlogDetailesService {
  news = [
    {
      id: 1,
      title: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur doloremque eligendi facere officia' +
          ' perspiciatis quaerat sit soluta ut. Asperiores consectetur ea et facere laudantium necessitatibus neque nesciunt ' +
          'quibusdam reprehenderit veritatis.',
      img: './assets/images/portfolio1.PNG'
    },
    {
      id: 2,
      title: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur doloremque eligendi facere officia' +
          ' perspiciatis quaerat sit soluta ut. Asperiores consectetur ea et facere laudantium necessitatibus neque nesciunt ' +
          'quibusdam reprehenderit veritatis.',
      img: './assets/images/portfolio2.PNG'
    },
    {
      id: 3,
      title: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur doloremque eligendi facere officia' +
          ' perspiciatis quaerat sit soluta ut. Asperiores consectetur ea et facere laudantium necessitatibus neque nesciunt' +
          ' quibusdam reprehenderit veritatis.',
      img: './assets/images/portfolio3.PNG'
    },
    {
      id: 4,
      title: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur doloremque eligendi facere officia ' +
          'perspiciatis quaerat sit soluta ut. Asperiores consectetur ea et facere laudantium necessitatibus neque nesciunt ' +
          'quibusdam reprehenderit veritatis.',
      img: './assets/images/portfollio4.PNG'
    },
    {
      id: 5,
      title: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur doloremque eligendi facere officia ' +
          'perspiciatis quaerat sit soluta ut. Asperiores consectetur ea et facere laudantium necessitatibus neque nesciunt ' +
          'quibusdam reprehenderit veritatis.',
      img: './assets/images/portfolio5.PNG'
    },
    {
      id: 6,
      title: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur doloremque eligendi facere officia' +
          ' perspiciatis quaerat sit soluta ut. Asperiores consectetur ea et facere laudantium necessitatibus neque nesciunt' +
          ' quibusdam reprehenderit veritatis.',
      img: './assets/images/portfolio1.PNG'
    }
  ];




  constructor() {
  }


  getNews() {
    return this.news;
  }

  getNewsId(id) {

    const found = this.news.find((element) => {
      return String(element.id) === String(id);
    });
    return found;
  }



}
