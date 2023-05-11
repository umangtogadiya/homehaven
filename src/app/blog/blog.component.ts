import { Component } from '@angular/core';

interface Blog {
  id: number;
  title: string;
  img: string;
  author: string;
  date: string;
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {
  blogItems: Array<Blog> = [
    {
      id: 1,
      title: 'First Time Home Owner Ideas',
      img: 'post-1.jpg',
      author: 'Kristin Watson',
      date: 'Dec 19, 2021',
    },
    {
      id: 2,
      title: 'How To Keep Your Furniture Clean',
      img: 'post-2.jpg',
      author: 'Robert Fox',
      date: 'Dec 15, 2021',
    },
    {
      id: 3,
      title: 'Small Space Furniture Apartment Ideas',
      img: 'post-3.jpg',
      author: 'Kristin Watson',
      date: 'Dec 12, 2021',
    },
    {
      id: 4,
      title: 'First Time Home Owner Ideas',
      img: 'post-1.jpg',
      author: 'Kristin Watson',
      date: 'Dec 19, 2021',
    },
    {
      id: 5,
      title: 'How To Keep Your Furniture Clean',
      img: 'post-2.jpg',
      author: 'Robert Fox',
      date: 'Dec 15, 2021',
    },
    {
      id: 6,
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
