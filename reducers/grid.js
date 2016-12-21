class DataListWrapper {
  constructor(indexMap, data) {
    this._indexMap = indexMap;
    this._data = data;
  }

  getSize() {
    return this._indexMap.length;
  }

  getObjectAt(index) {
    let realIndex = this._indexMap[index];
    return this._data[realIndex];
  }
}

const defaultState = {
  defaultIndex: [],
  dataList: new DataListWrapper([], []),
  defaultDataList: new DataListWrapper([], []),
  colSortDirs: {},
};

const SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

export default function(state=defaultState, action) {
  const { issuesDetail } = action;
  let dataList;
  let colSortDirs;
  let size;
  let defaultIndex = [];
  let defaultDataList;
  switch (action.type) {
    case 'SET_DEFAULT_ISSUES_DETAIL':
      size = issuesDetail.length;
      for (let index = 0; index < size; index++) {
        defaultIndex.push(index);
      };

      defaultDataList = new DataListWrapper(defaultIndex, issuesDetail);
      return { ...state, defaultIndex, defaultDataList };

    case 'SET_ISSUES_DETAIL':
      size = issuesDetail.length;
      for (let index = 0; index < size; index++) {
        defaultIndex.push(index);
      };

      dataList = new DataListWrapper(defaultIndex, issuesDetail);
      defaultDataList = new DataListWrapper(defaultIndex, issuesDetail);
      return { ...state, defaultIndex, dataList, defaultDataList };

    case 'RESET_ISSUES_DETAIL':
      dataList = state.defaultDataList;
      return { ...state, dataList };

    case 'SORT_CHANGE_ISSUES_DETAIL':
      const { columnKey, sortDir } = action;
      let sortIndexes = state.defaultIndex.slice();

      sortIndexes.sort((indexA, indexB) => {
        let valueA = state.defaultDataList.getObjectAt(indexA)[columnKey];
        let valueB = state.defaultDataList.getObjectAt(indexB)[columnKey];
        let sortVal = 0;
        if (valueA > valueB) {
          sortVal = 1;
        };

        if (valueA < valueB) {
          sortVal = -1;
        };

        if (sortVal !== 0 && sortDir === SortTypes.ASC) {
          sortVal = sortVal * -1;
        };

        return sortVal;
      });
      dataList = new DataListWrapper(sortIndexes, state.defaultDataList._data);
      colSortDirs = {
        [columnKey]: sortDir,
      };

      return {
        ...state,
        dataList,
        colSortDirs,
      };
    case 'FILTER_CHANGE_ISSUES_DETAIL':
      const { filterValue, searchFields } = action;
      console.log(searchFields, 'sf');
      if (!filterValue) {
        dataList = state.defaultDataList;
        return { ...state, dataList };
      };

      let filterBy = filterValue.toLowerCase();
      size = state.defaultDataList.getSize();
      let filteredIndexes = [];
      for (let index = 0; index < size; index++) {
        searchFields.forEach(field => {
          let fieldName = state.defaultDataList.getObjectAt(index)[field];
          if (fieldName.toLowerCase().indexOf(filterBy) !== -1) {
            if (filteredIndexes.indexOf(index) == -1) {
              filteredIndexes.push(index);
            }
          }
        });
      };

      dataList = new DataListWrapper(filteredIndexes, state.defaultDataList._data);
      return { ...state, dataList };

    default:
      return state;
  }
};
