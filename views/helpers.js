const handlebars = require('handlebars');

/*
    Example:
    {{#list people}}
    {{firstName}}
    {{lastName}}
    {{/list}}

    Context:
    const data = {
			people: [
				{ firstName: 'Yehuda', lastName: 'Katz' },
				{ firstName: 'Carl', lastName: 'Lerche' },
				{ firstName: 'Alan', lastName: 'Johnson' }
			]
		};
*/
handlebars.registerHelper('list', (items, options) => {
	let out = '<ul>';

	for (let i = 0, l = items.length; i < l; i++) {
		out = `${out}<li>${options.fn(items[i])}</li>`;
	}
	return `${out}</ul>`;
});

/*
    Example:
    {{#if_eq name 'ss'}}
    true
    {{else}}
    false
    {{/if_eq}}

    Context:
    const data = {
			name: 'Armandas'
		};
*/
handlebars.registerHelper('if_eq', function (a, b, opts) {
	if (a === b) {
		return opts.fn(this);
	} else {
		return opts.inverse(this);
	}
});

handlebars.registerPartial('myPartial', '/partials/header');

module.exports = handlebars;
