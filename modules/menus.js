function getUserSidebarMenu() {
	return [
		{
			title: 'Main actions',
			items: [
				{
					title: 'Dashboard',
					link: '/user'
				},
				{
					title: 'New order',
					link: '/user/order/new'
				}
			]
		},
		{
			title: 'Other actions',
			items: [
				{
					title: 'Contacts',
					link: '/user/contacts'
				},
				{
					title: 'Account settings',
					link: '/user/settings'
				},
				{
					title: 'Log out',
					link: '/logout'
				}
			]
		}
	];
}

function getTechSidebarMenu() {
	return [
		{
			title: 'Home page',
			items: [
				{
					title: 'Find a new order',
					link: '/tech'
				},
				{
					title: 'Manage orders',
					link: '/tech/manage'
				}
			]
		},
		{
			title: 'Other actions',
			items: [
				{
					title: 'Contacts',
					link: '/tech/contacts'
				},
				{
					title: 'Account settings',
					link: '/tech/settings'
				},
				{
					title: 'Log out',
					link: '/logout'
				}
			]
		}
	];
}

module.exports = {
	user: getUserSidebarMenu(),
	technician: getTechSidebarMenu()
};
