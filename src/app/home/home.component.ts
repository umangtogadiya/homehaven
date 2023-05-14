import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { CommonService } from '../shared/services/common.service';

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
export class HomeComponent implements OnInit {
  featuredItems: Array<Featured> = [];
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

  constructor(
    private productService: ProductService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBlogs();
  }

  getProducts(): void {
    this.productService.limitedProducts(3).subscribe((res: any[]) => {
      this.featuredItems = res;
    });
  }

  getBlogs(): void {
    this.commonService.limitedBlog(3).subscribe((res: any[]) => {
      this.blogItems = res;
    });
  }
}
