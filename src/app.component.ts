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
  static $inject = ['$state'];

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

  //check change event handler
  permissionChanged: Function = (permissions: IPermissions, type: String) => {
    if (type === 'view') {
      permissions.edit = false;
      permissions.remove = false;
    } else if (type === 'edit') {
      permissions.remove = false;
    }

    this.permissionAllCheck();
  }

  //checkAll change event handler
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

  //check if all permission of column set to true and set appropriate checkAll checkbox to true
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

  permissionsSave: Function = () => {
    localStorage.setItem('permissions', JSON.stringify(this.permissions));
  }

  constructor(public $state: ng.ui.IStateService) {
    $state.go('app.home');

    const localPermissions = localStorage.getItem('permissions');
    if (localPermissions !== null && localPermissions !== '') {
      this.permissions = [...JSON.parse(localPermissions)];
    }

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
