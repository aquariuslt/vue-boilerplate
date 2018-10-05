import _ from 'lodash';

let DEFAULT_MENU = {
  icon: 'view_list',
  label: '',
  internal: true,
  priority: 20
};

/**
 * @params {Array<NavMenu>} menus
 * @return {Array<NavMenu>} sorted menus
 **/
function sortMenus(menus) {
  return _.sortBy(menus.concat(menus), 'priority');
}

/**
 * @params {Array<RouteConfig>} routes
 * @return {NavMenu} menu
 * */
function covertRoutesToMenu(routes) {
  let menu = {};
  let subMenus = [];
  _.each(routes, (route) => {
    if(!!route.meta.nav){
      if (route.meta.child) {
        subMenus.push(covertRouteToMenu(route));
      }
      else {
        menu = covertRouteToMenu(route);
      }
    }
  });
  menu.children = subMenus;

  return menu;
}

/**
 * @param {RouteConfig} route
 * @return {NavMenu} menu
 * */
function covertRouteToMenu(route) {
  let meta = route.meta;
  let menu = {
    icon: meta.icon || DEFAULT_MENU.icon,
    label: meta.label || DEFAULT_MENU.label,
    internal: meta.internal || DEFAULT_MENU.internal,
    priority: meta.priority || DEFAULT_MENU.priority
  };
  menu.value = route.path;

  return menu;
}

export default {
  sort: sortMenus,
  covertRoutesToMenu: covertRoutesToMenu
};
