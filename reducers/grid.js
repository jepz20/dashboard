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

const combineListArray = (listA, listB) => {
  let setA = new Set(listA._indexMap);
  let setB = new Set(listB._indexMap);
  let array = [...setB].filter(x => setA.has(x));
  return array;
};

const sortIssues = (columnKey, sortDir, index, dataList) => {
  let sortIndexes = index.slice();
  sortIndexes.sort((indexA, indexB) => {
    let valueA = dataList.getObjectAt(indexA)[columnKey];
    let valueB = dataList.getObjectAt(indexB)[columnKey];
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
  return new DataListWrapper(sortIndexes, dataList._data);
};

const filterIssueDetails = (filterValue, dataList, searchFields) => {
  if (!filterValue) {
    return dataList;
  };

  let filterBy = filterValue.toLowerCase();
  let size = dataList.getSize();
  let filteredIndexes = [];
  for (let index = 0; index < size; index++) {
    searchFields.forEach(field => {
      let fieldName = dataList.getObjectAt(index)[field];
      if (fieldName) {
        if (fieldName.toLowerCase().indexOf(filterBy) !== -1) {
          if (filteredIndexes.indexOf(index) == -1) {
            filteredIndexes.push(index);
          }
        }
      }

    });
  };

  return new DataListWrapper(filteredIndexes, dataList._data);;
};

const defaultState = {
  loading: true,
  firstLoad: true,
  defaultIndex: [],
  dataList: new DataListWrapper([], []),
  defaultDataList: new DataListWrapper([], []),
  colSortDirs: {},
  filterValue: '',
  searchFields: ['customerName', 'customerEmail', 'description', 'employeeName', 'status'],
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
  let filteredDataList;
  switch (action.type) {

    case 'SET_ISSUES_DETAIL':
      size = issuesDetail.length;
      for (let index = 0; index < size; index++) {
        defaultIndex.push(index);
      };

      if (state.defaultDataList._data.join() == issuesDetail.join()) {
        return { ...state, loading: false };
      };

      dataList = new DataListWrapper(defaultIndex, issuesDetail);
      defaultDataList = new DataListWrapper(defaultIndex, issuesDetail);
      filteredDataList = filterIssueDetails(state.filterValue,
        defaultDataList,
        state.searchFields,
      );
      if (state.colSortDirs) {
        let key = Object.keys(state.colSortDirs)[0];
        let dir = state.colSortDirs[key];
        let sortDataList = sortIssues(key,
          dir, defaultIndex,
          defaultDataList
        );
        let array = combineListArray(filteredDataList, sortDataList);
        dataList = new DataListWrapper(array, defaultDataList._data);
      } else {
        dataList = filteredDataList;
      };

      return { ...state, defaultIndex,
        dataList,
        defaultDataList,
        loading: false,
        firstLoad: false,
      };

    case 'SORT_CHANGE_ISSUES_DETAIL':
      const { columnKey, sortDir } = action;
      colSortDirs = {
        [columnKey]: sortDir,
      };

      filteredDataList = filterIssueDetails(state.filterValue,
        state.defaultDataList,
        state.searchFields
      );
      let sortDataList = sortIssues(columnKey, sortDir, state.defaultIndex, state.defaultDataList);
      let array = combineListArray(filteredDataList, sortDataList);
      dataList = new DataListWrapper(array, state.defaultDataList._data);
      return {
        ...state,
        dataList,
        colSortDirs,
      };
    case 'FILTER_CHANGE_ISSUES_DETAIL':
      const { filterValue } = action;
      filteredDataList = filterIssueDetails(filterValue, state.defaultDataList, state.searchFields);
      if (state.colSortDirs) {
        let key = Object.keys(state.colSortDirs)[0];
        let dir = state.colSortDirs[key];
        let sortDataList = sortIssues(key,
          dir, state.defaultIndex,
          state.defaultDataList
        );
        let array = combineListArray(filteredDataList, sortDataList);
        dataList = new DataListWrapper(array, state.defaultDataList._data);
        return { ...state, dataList, filterValue };
      };

      return { ...state, filteredDataList, filterValue };
    case 'CHANGE_GRID_LOADING_STATE':
      return { ...state, loading: true };
    default:
      return state;
  }
};
