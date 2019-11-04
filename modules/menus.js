function getSidebarMenu() {
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

module.exports = getSidebarMenu;
