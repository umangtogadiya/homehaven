import { Component } from '@angular/core';

interface Featured {
  id: number;
  title: string;
  description: string;
  price: string;
  img: string;
}

interface Blog {
  id: number;
  title: string;
  img: string;
  author: string;
  date: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  featuredItems: Array<Featured> = [
    {
      id: 1,
      title: 'Nordic Chair',
      description:
        'Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio',
      price: '50.00',
      img: 'product-1.png',
    },
    {
      id: 2,
      title: 'Kruzo Aero Chair',
      description:
        'Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio',
      price: '78.00',
      img: 'product-2.png',
    },
    {
      id: 3,
      title: 'Ergonomic Chair',
      description:
        'Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio',
      price: '43.00',
      img: 'product-3.png',
    },
  ];

  blogItems: Array<Blog> = [
    {
      id: 1,
      title: 'First Time Home Owner Ideas',
      img: 'post-1.jpg',
      author: 'Kristin Watson',
      date: 'Dec 19, 2021',
    },
    {
      id: 1,
      title: 'How To Keep Your Furniture Clean',
      img: 'post-2.jpg',
      author: 'Robert Fox',
      date: 'Dec 15, 2021',
    },
    {
      id: 1,
      title: 'Small Space Furniture Apartment Ideas',
      img: 'post-3.jpg',
      author: 'Kristin Watson',
      date: 'Dec 12, 2021',
    },
  ];

  testimonialItems: Array<any> = [
    {
      id: 1,
      name: 'Maria Jones',
      designation: 'CEO, Co-Founder, XYZ Inc.',
      img: 'person-1.png',
      details:
        'Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer convallis volutpat dui quis scelerisque.',
    },
    {
      id: 2,
      name: 'Joseph J',
      designation: 'CEO, Co-Founder, XYZ Inc.',
      img: 'person-1.png',
      details:
        'Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer convallis volutpat dui quis scelerisque.',
    },
    {
      id: 3,
      name: 'Mike Russo',
      designation: 'CEO, Co-Founder, XYZ Inc.',
      img: 'person-1.png',
      details:
        'Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer convallis volutpat dui quis scelerisque.',
    },
  ];
}
