import './app.component.scss';

interface ISectionPermission {
  section: string;
  permissions: IPermissions;
}

interface IPermissions {
  view: boolean;
  edit: boolean;
  remove: boolean;
}

class AppController implements ng.IController {
  static $inject = ['$state', '$timeout'];

  title: string = 'Permission';
  permissions: Array<ISectionPermission> = [
    {
      section: 'Calendar',
      permissions: {
        view: false,
        edit: false,
        remove: false
      }
    },
    {
      section: 'Profile',
      permissions: {
        view: false,
        edit: false,
        remove: false
      }
    },
    {
      section: 'Property',
      permissions: {
        view: false,
        edit: false,
        remove: false
      }
    },
    {
      section: 'Contacts',
      permissions: {
        view: false,
        edit: false,
        remove: false
      }
    },
  ];

  permissionsAll: IPermissions = {
    view: false,
    edit: false,
    remove: false,
  };

  showMessageTimeout = this.$timeout(function () { }, 0);
  showMessage: boolean = false;

  /**
   * Change checkbox event handler
   * if root ('view') permission is change set edit and remove permissions to false
   * if ('edit') permission is change set remove permissions to false
   * trigger @permissionAllCheck function to check is all of permission of one columns is true
   * @param {IPermissions} permissions category permissions object
   * @param {String} type type of permission that have been change ('view', 'edit', 'remove')
   */
  permissionChanged: Function = (permissions: IPermissions, type: String) => {
    if (type === 'view') {
      permissions.edit = false;
      permissions.remove = false;
    } else if (type === 'edit') {
      permissions.remove = false;
    }

    this.permissionAllCheck();
  }

  /**
   * Check all checkbox event handler
   * loop through all permission section and change permission by @permitAll type to checkboxAll value
   * trigger @permissionChanged function to change all relative to @permitAll type permissions
   * (@permitAll is 'edit' and value of checkbox is @false so you change all sections edit permission and all 'edit' and 'remove' permission ether)
   * @param {String} permitAll type of permission that have been change ('view', 'edit', 'remove')
   */
  permissionAllChanged: Function = (permitAll: String) => {
    this.permissions.forEach(sectionPermission => {
      if (permitAll === 'view') {
        sectionPermission.permissions.view = this.permissionsAll.view;

        if (!this.permissionsAll.view) {
          this.permissionChanged(sectionPermission.permissions, permitAll);
        }
      } else if (permitAll === 'edit') {
        sectionPermission.permissions.edit = this.permissionsAll.edit;

        if (!this.permissionsAll.edit) {
          this.permissionChanged(sectionPermission.permissions, permitAll);
        }
      } else if (permitAll === 'remove') {
        sectionPermission.permissions.remove = this.permissionsAll.remove;
      }
    });
  }

  /**
   * Check if all permission of column set to true and set appropriate checkAll checkbox to true
   * loop through all permission and if all permission in a column is set to true => set checkAll checkbox to true as well
   * (if all view checkbox is true => set view AllCheckbox to true)
   */
  permissionAllCheck: Function = () => {
    let isAllChecked: IPermissions = {
      view: true,
      edit: true,
      remove: true,
    };

    this.permissions.forEach(sectionPermission => {
      if (sectionPermission.permissions.view === false) {
        isAllChecked.view = false;
      }
      if (sectionPermission.permissions.edit === false) {
        isAllChecked.edit = false;
      }
      if (sectionPermission.permissions.remove === false) {
        isAllChecked.remove = false;
      }
    });

    Object.assign(this.permissionsAll, isAllChecked);
  }

  /**
   * Save btn click event handler 
   * save all permissions to localStorage and show message
   */
  permissionsSave: Function = () => {
    localStorage.setItem('permissions', JSON.stringify(this.permissions));

    this.showMessage = true;
    this.animateShowMessage();
  }

  /**
   * Save message box animation after click
   */
  animateShowMessage: Function = () => {
    // Stop the pending timeout
    this.$timeout.cancel(this.showMessageTimeout);
    this.showMessageTimeout = this.$timeout(() => { this.showMessage = false; }, 2000);
  }

  constructor(public $state: ng.ui.IStateService, private $timeout: ng.ITimeoutService) {
    $state.go('app.home');

    //get settings from localStorage if it exist
    const localPermissions = localStorage.getItem('permissions');
    if (localPermissions !== null && localPermissions !== '') {
      this.permissions = [...JSON.parse(localPermissions)];
    }

    //check permission all in case local storage had content
    this.permissionAllCheck();
  }
}

export class AppComponent implements ng.IComponentOptions {
  static NAME: string = 'appPermission';

  controller: any;
  templateUrl: any;

  constructor() {
    this.controller = AppController;
    this.templateUrl = require('./app.component.html');
  }
}
