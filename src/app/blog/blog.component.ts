import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/services/common.service';

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
export class BlogComponent implements OnInit {
  blogItems: Array<Blog> = [];
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

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.blogList();
  }

  blogList() {
    this.commonService.getBlogList().subscribe((res: any[]) => {
      console.log('res', res);
      this.blogItems = res;
    });
  }
}
