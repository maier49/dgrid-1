import DataProviderBase from '../bases/DataProviderBase';
import Promise from '@dojo/shim/Promise';
import { Store } from '@dojo/stores/interfaces';
import createSort from '@dojo/stores/query/createSort';
import createRange from '@dojo/stores/query/createStoreRange';
import CompoundQuery from '@dojo/stores/query/CompoundQuery';

export interface StoreDataProviderOptions<T> {
	store: Store<T, any, any>;
}

class StoreDataProvider<T> extends DataProviderBase<T, StoreDataProviderOptions<T>> {
	buildData(): Promise<void> {
		const {
			options: { store },
			state: {
				slice,
				sort = []
			}
		} = this;
		const sortParams: [ string[], boolean[] ] = sort.reduce((sorts, sortDetail) => {
			sorts[0].push(sortDetail.columnId);
			sorts[1].push(Boolean(sortDetail.descending));

			return sorts;
		}, <[ string[], boolean[] ]> [[], []]);
		const storeSort = sortParams[0].length && createSort<any>(sortParams[0], sortParams[1]) || undefined;
		const query = slice ?
			new CompoundQuery<T>({ query: storeSort }).withQuery(createRange<T>(slice.start, slice.count)) : storeSort;
		const fetchResult = store.fetch(query);
		return fetchResult.then((items) =>
			fetchResult.totalLength.then((totalLength) => {
				const ids = store.identify(items);
				const start = (slice && slice.start || 0);
				this.data = {
					sort,
					items: items.map((item, index) => {
						return {
							data: item,
							index: index + start,
							id: ids[index]
						};
					}),
					size: {
						start: start,
						totalLength: totalLength
					}
				};
			})
		);
	}
}

export default StoreDataProvider;
