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
					title: 'Place an order',
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
					link: '/tech/order/manage'
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
