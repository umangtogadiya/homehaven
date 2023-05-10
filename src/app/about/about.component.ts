import { Component } from '@angular/core';

interface team {
  id: number;
  name: string;
  designation: string;
  details: string;
  img: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  teams: Array<team> = [
    {
      id: 1,
      name: 'Lawson Arnold',
      designation: 'CEO, Founder, Atty.',
      details:
        'Separated they live in. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.',
      img: 'person_1.jpg',
    },
    {
      id: 2,
      name: 'Jeremy Walker',
      designation: 'CEO, Founder, Atty.',
      details:
        'Separated they live in. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.',
      img: 'person_2.jpg',
    },
    {
      id: 3,
      name: 'Patrik White',
      designation: 'CEO, Founder, Atty.',
      details:
        'Separated they live in. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.',
      img: 'person_3.jpg',
    },
    {
      id: 4,
      name: 'Kathryn Ryan',
      designation: 'CEO, Founder, Atty.',
      details:
        'Separated they live in. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.',
      img: 'person_4.jpg',
    },
  ];
}
