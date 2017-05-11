import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import Grid from '../Grid';
import ArrayDataProvider from '../providers/ArrayDataProvider';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { WidgetProperties } from '@dojo/widget-core/interfaces';
import { w } from '@dojo/widget-core/d';
import { GridProperties } from '../Grid';
import { HasScrollTo } from '../interfaces';
import makeData from './makeData';

const instructions = makeData();

// const PaginatedDateProvider = PaginationDataProviderMixin(ArrayDataProvider);

const dataProvider = new ArrayDataProvider({
	idProperty: 'order',
	data: instructions
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
	// footers: [ w(GridPagination, { dataProvider, itemsPerPage: 10, paginationConstructor: Pagination }) ],
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

projector.append(document.getElementById('arrayDataProviderExample')!);
