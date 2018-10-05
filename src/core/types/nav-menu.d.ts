/**
 * @desc Definition of navigation menus
 * */

declare interface NavMenu {
  icon?: String;
  label?: String;
  value?: String;

  /* internal single page router link or outer link, default:true */
  internal?: Boolean;

  /* sorting priority in menu item array */
  priority?: Number;

  /* render by frontend acl filter options*/
  permissions?: Number;

  children?: Array<NavMenu>;
}
