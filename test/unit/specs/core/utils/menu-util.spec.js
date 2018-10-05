import menuUtil from '@/core/utils/menu-util';

describe('menu-util', () => {

  describe('menu-util: cover routes to menu', () => {
    const exampleMenuRoutes = [
      {
        path: '/docs',
        component: null,
        meta: {
          nav: true,
          icon: 'library_books',
          label: 'docs.menu.title'
        }
      },
      {
        path: '/docs/help',
        component: null,
        meta: {
          nav: true,
          child: true,
          icon: 'help',
          label: 'docs.help.menu.title'
        }
      }
    ];

    it('# should be convert to menu routes with data in vue-router meta specs', () => {
      let menus = menuUtil.covertRoutesToMenu(exampleMenuRoutes);
    });

  });

  describe('menu-util: covert external links to menu', () => {

  });
});
