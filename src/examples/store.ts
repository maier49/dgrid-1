import StoreBase from '@dojo/stores/store/StoreBase';
import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { WidgetProperties } from '@dojo/widget-core/interfaces';
import { w } from '@dojo/widget-core/d';
import Grid, { GridProperties } from '../Grid';
import StoreDataProvider from '../providers/StoreDataProvider';
import { HasScrollTo } from '../interfaces';
import makeData from './makeData';

const instructions = makeData();

const dataProvider = new StoreDataProvider({
	store: new StoreBase({
		data: instructions,
		idProperty: 'order'
	})
});

const columns = [
	{
		id: 'order',
		label: 'step', // give column a custom name
		renderExpando: true
	},
	{
		id: 'name'
	},
	{
		id: 'description',
		label: 'what to do',
		sortable: false
	}
];

const properties: GridProperties & HasScrollTo = {
	dataProvider,
	columns,
	onScrollToComplete() {
		delete properties.scrollTo;
	}
};

export const ProjectorBase = ProjectorMixin(WidgetBase);

class Projector extends ProjectorBase<WidgetProperties> {
	render() {
		return w(Grid, properties);
	}
}

const projector = new Projector();

projector.append(document.getElementById('storeDataProviderExample')!);
