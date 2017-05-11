export default function makeData() {
	const data = [
		{order: 1, name: 'preheat', description: 'Preheat your oven to 350F'},
		{order: 2, name: 'mix dry', description: 'In a medium bowl, combine flour, salt, and baking soda'},
		{
			order: 3,
			name: 'mix butter',
			description: 'In a large bowl, beat butter, then add the brown sugar and white sugar then mix'
		},
		{
			order: 4,
			name: 'mix together',
			description: 'Slowly add the dry ingredients from the medium bowl to the wet ingredients in the large bowl, mixing until the dry ingredients are totally combined'
		},
		{order: 5, name: 'chocolate chips', description: 'Add chocolate chips'},
		{
			order: 6,
			name: 'make balls',
			description: 'Scoop up a golf ball size amount of dough with a spoon and drop in onto a cookie sheet'
		},
		{order: 7, name: 'bake', description: 'Put the cookies in the oven and bake for about 10-14 minutes'},
		{order: 8, name: 'remove', description: 'Using a spatula, lift cookies off onto wax paper or a cooling rack'},
		{order: 9, name: 'eat', description: 'Eat and enjoy!'}
	];

	const instructions: any[] = [];
	for (let i = 1; i <= 10000; i++) {
		const instruction = Object.create(data[Math.floor(Math.random() * data.length)]);
		const parent = i;
		if (instruction.order === 2) {
			instructions.push({
				order: ++i,
				name: 'flour',
				description: '1 cup',
				parent
			});
			instructions.push({
				order: ++i,
				name: 'salt',
				description: '1 teaspoon',
				parent
			});
			instructions.push({
				order: ++i,
				name: 'baking soda',
				description: '1 tablespoon',
				parent
			});
		}
		else if (instruction.order === 3) {
			instructions.push({
				order: ++i,
				name: 'butter',
				description: '1/4 cup',
				parent
			});
			instructions.push({
				order: ++i,
				name: 'brown sugar',
				description: '1/4 cup',
				parent
			});
			instructions.push({
				order: ++i,
				name: 'white sugar',
				description: '1/4 cup',
				parent
			});
		}
		else if (instruction.order === 5) {
			instructions.push({
				order: ++i,
				name: 'chocolate chips',
				description: '1 cup',
				parent
			});
		}
		instruction.order = parent;
		instructions.push(instruction);
	}

	return instructions;
}
