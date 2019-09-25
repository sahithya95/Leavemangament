// export const ROUTES = [
//     { path: '/dashboard', title: 'Leave Request', icon: 'dashboard', children: null , client: true},
//     // { path: 'UserRequest',title:'Leave Request', icon:'person', children:null, client: true},
//     { path: 'holiday',title:'Holidays', icon :'notifications',children:null, client: false},
//     { path: 'profile', title: 'User Profile', icon: 'person', children: null , client: false},
//     { path: 'home', title: 'home', icon: 'content_paste', children: null , client: false},
//     { path: 'leavetable',title:'Leave Table', icon :'content_paste',children:null, client: false},
//     { path: 'AdminRequest',title:'All Leave Request', icon:'person', children:null, client: false},
//     { path: 'users',title:'Users', icon:'person', children:null, client: false},
   
//     { path: '#component', id: 'component', title: 'Component', icon: 'apps', children: [
//         {path: 'components/price-table', title: 'Price Table', icon: 'PT'},
//         {path: 'components/panels', title: 'Panels', icon: 'P'},
//         {path: 'components/wizard', title: 'Wizard', icon: 'W'},
//       ], client: false},
//     { path: 'notification', title: 'Notification', icon: 'notifications', children: null, client: false },
//     { path: 'alert', title: 'Sweet Alert', icon: 'warning', children: null, client: false },
//     { path: 'settings', title: 'Settings', icon: 'settings', children: null, client: false },
// ];
export const ROUTES = [
    // { path: '/dashboard', title: 'User Profile', icon: 'dashboard', children: null,client: true },
    { path: '/dashboard', title: 'User Profile', icon: 'person', children: null ,client: true},
    { path: 'UserRequest',title:'Leave Request', icon:'person', children:null, client: true},
    { path: 'table', title: 'Table List', icon: 'content_paste', children: null,client: false },
    { path: 'holiday',title:'Holidays', icon :'notifications',children:null, client: false},
    { path: 'leavetable',title:'Leave Table', icon :'content_paste',children:null, client: false},
    { path: 'AdminRequest',title:'All Leave Request', icon:'person', children:null, client: false},
    // { path: '#component', id: 'component', title: 'Component', icon: 'apps', children: [
    //     {path: 'components/price-table', title: 'Price Table', icon: 'PT'},
    //     {path: 'components/panels', title: 'Panels', icon: 'P'},
    //     {path: 'components/wizard', title: 'Wizard', icon: 'W'},
    //   ],client: false},
    // { path: 'notification', title: 'Notification', icon: 'notifications', children: null, client: false },
    // { path: 'alert', title: 'Sweet Alert', icon: 'warning', children: null, client: false },
    { path: 'settings', title: 'Settings', icon: 'settings', children: null , client: true},
];