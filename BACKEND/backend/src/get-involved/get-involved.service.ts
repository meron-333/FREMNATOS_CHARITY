import { Injectable } from '@nestjs/common';
import { GetInvolvedItem } from './get-involved.types';

@Injectable()
export class GetInvolvedService {
  private readonly items: GetInvolvedItem[] = [
    {
      slug: 'volunter',
      title: 'Volunter',
      route: '/volunter',
      badge: 'Get Involved',
      summary:
        'Join a coordinated volunteer team to serve children, elders, and people in recovery.',
      heroTitle: 'Become a volunteer',
      heroDescription:
        'Volunteers can support caregiving, mentorship, and education programs across branches.',
    },
    {
      slug: 'membership',
      title: 'Membership',
      route: '/membership',
      badge: 'Get Involved',
      summary:
        'Become a member and provide sustained support through monthly contributions and advocacy.',
      heroTitle: 'Become a member',
      heroDescription:
        'Membership helps us plan long-term services and gives you regular impact updates.',
    },
    {
      slug: 'partnership',
      title: 'Partnership',
      route: '/partnership',
      badge: 'Get Involved',
      summary:
        'Build long-term partnerships that strengthen healthcare, operations, and program delivery.',
      heroTitle: 'Become a partner',
      heroDescription:
        'Institutional partnerships increase our capacity to serve more children and elders safely.',
    },
    {
      slug: 'fundrising',
      title: 'Fundrising',
      route: '/fundrising',
      badge: 'Get Involved',
      summary:
        'Launch fundraising campaigns and mobilize your network for direct community impact.',
      heroTitle: 'Fundrise for us',
      heroDescription:
        'We support your campaign with communication materials and program visibility.',
    },
  ];

  findAll(): GetInvolvedItem[] {
    return this.items;
  }

  findBySlug(slug: string): GetInvolvedItem | undefined {
    return this.items.find((item) => item.slug === slug);
  }
}
