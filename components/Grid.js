import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Table, Column, Cell } from 'fixed-data-table-2';
import dateformat from 'dateformat';
const Dimensions = require('react-dimensions');
import TextField from 'material-ui/TextField';

const mapStateToProps = (state) => ({
});

let SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

const reverseSortDirection = (sortDir) => (
  sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC
);

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

class SortHeaderCell extends React.Component {
  constructor(props) {
    super(props);

    this._onSortChange = this._onSortChange.bind(this);
  }

  render() {
    let { sortDir, children, onSortChange, ...rest } = this.props;
    return (
      <Cell {...rest}>
        <a onClick={this._onSortChange}>
          {children} {sortDir ? (sortDir === SortTypes.DESC ? '↓' : '↑') : ''}
        </a>
      </Cell>
    );
  }

  _onSortChange(e) {
    e.preventDefault();
    const { columnKey, sortDir, onSortChange } = this.props;
    if (onSortChange) {
      onSortChange(
        columnKey,
        sortDir ?
          reverseSortDirection(sortDir) :
          SortTypes.DESC
      );
    }
  }
}

const TextCell = ({ rowIndex, data, columnKey, ...props }) => (
    <Cell {...props}>
      {data.getObjectAt(rowIndex)[columnKey]}
    </Cell>
  );

const DateCell = ({ rowIndex, data, columnKey, ...props }) => {
  let timestamp = data.getObjectAt(rowIndex)[columnKey];
  let formatDate = dateformat(new Date(timestamp * 1000), 'dd-mm-yyyy, hh:MMtt');
  return (
    <Cell {...props}>
      { formatDate }
    </Cell>
  );
};

class Grid extends React.Component {
  constructor(props) {
    super(props);

    let _data = [
        {
          customerName: 'Rylan Ruiz',
          customerEmail: 'rr@np.com',
          timestampSubmission: 1482205094,
          description: 'Dashboard not working correctly',
          employeeName: 'Eduardo',
          status: 'open',
          timestampClosed: 1471199605,
        },
        {
          customerName: 'Fernando Hernandez',
          customerEmail: 'fh@np.com',
          timestampSubmission: 1480910405,
          description: 'Dashboard not working correctly',
          employeeName: 'Mario',
          status: 'open',
          timestampClosed: 1481119605,
        },
        {
          customerName: 'Gris Ruiz',
          customerEmail: 'gr@np.com',
          timestampSubmission: 1480210405,
          description: 'Dashboard not working correctly',
          employeeName: 'Tita',
          status: 'closed',
          timestampClosed: 1461469605,
        },
        {
          customerName: 'Hernan Fernandez',
          customerEmail: 'HF@np.com',
          timestampSubmission: 1460920405,
          description: 'Dashboard not working correctly',
          employeeName: 'Claudia',
          status: 'closed',
          timestampClosed: 1481169605,
        },
    ];
    _data.push.apply(_data, _data);
    _data.push.apply(_data, _data);
    _data.push.apply(_data, _data);
    _data.push.apply(_data, _data);
    _data.push.apply(_data, _data);
    this._defaultSortIndexes = [];
    let size = _data.length;
    for (let index = 0; index < size; index++) {
      this._defaultSortIndexes.push(index);
    };

    this._dataList = new DataListWrapper(this._defaultSortIndexes, _data);
    this.state = {
      dataList: this._dataList,
      colSortDirs: {},
    };

    this._onSortChange = this._onSortChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  _onSortChange(columnKey, sortDir) {
    let sortIndexes = this._defaultSortIndexes.slice();
    sortIndexes.sort((indexA, indexB) => {
      let valueA = this._dataList.getObjectAt(indexA)[columnKey];
      let valueB = this._dataList.getObjectAt(indexB)[columnKey];
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
    this.setState({
      dataList: new DataListWrapper(sortIndexes, this._dataList._data),
      colSortDirs: {
          [columnKey]: sortDir,
        },
    });
  }

  _onFilterChange(e) {
    if (!e.target.value) {
      this.setState({
        dataList: new DataListWrapper(this._defaultSortIndexes, this._dataList._data),
      });
    };

    let filterBy = e.target.value.toLowerCase();
    let size = this._dataList.getSize();
    let filteredIndexes = [];
    for (let index = 0; index < size; index++) {
      const { customerName } = this._dataList.getObjectAt(index);
      if (customerName.toLowerCase().indexOf(filterBy) !== -1) {
        filteredIndexes.push(index);
      }
    };

    this.setState({
      dataList: new DataListWrapper(filteredIndexes, this._dataList._data),
    });
  }

  render() {

    const { dataList, colSortDirs } = this.state;
    const { containerHeight, containerWidth } = this.props;
    return (
      <div>
        <TextField
          floatingLabelText="Search"
          onChange={this._onFilterChange}
        /><br />
        <Table
          rowsCount={dataList.getSize()}
          rowHeight={50}
          headerHeight={50}
          touchScrollEnabled={true}
          width={containerWidth}
          height={600}
        >
          <Column
            columnKey="customerName"
            fixed={true}
            header={
              <SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={colSortDirs.customerName}>
                Name
              </SortHeaderCell>
            }
            cell={<TextCell data={dataList} />}
            width={100}
          />
          <Column
            columnKey="customerEmail"
            header={
              <SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={colSortDirs.customerEmail}>
                Email
              </SortHeaderCell>
            }
            cell={<TextCell data={dataList} />}
            width={100}
          />
          <Column
            columnKey="timestampSubmission"
            header={
              <SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={colSortDirs.timestampSubmission}>
                Submission Date
              </SortHeaderCell>
            }
            cell={<DateCell data={dataList} />}
            width={200}
          />
          <Column
            columnKey="description"
            header={
              <SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={colSortDirs.description}>
                description
              </SortHeaderCell>
            }
            cell={<TextCell data={dataList} />}
            width={300}
          />
          <Column
            columnKey="employeeName"
            header={
              <SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={colSortDirs.employeeName}>
                Employee Name
              </SortHeaderCell>
            }
            cell={<TextCell data={dataList} />}
            width={300}
          />
          <Column
            columnKey="status"
            header={
              <SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={colSortDirs.status}>
                status
              </SortHeaderCell>
            }
            cell={<TextCell data={dataList} />}
            width={70}
          />
          <Column
            columnKey="timestampClosed"
            header={
              <SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={colSortDirs.timestampClosed}>
                Close Date
              </SortHeaderCell>
            }
            cell={<DateCell data={dataList} />}
            width={200}
          />
        </Table>
      </div>
    );
  }
}

Grid = Dimensions({
  getHeight: function (element) {
    return window.innerHeight - 200;
  },

  getWidth: function (element) {
    var widthOffset = window.innerWidth < 680 ? 0 : 240;
    return window.innerWidth - widthOffset;
  },
})(Grid);

Grid = connect(mapStateToProps, actions)(Grid);
export default Grid;
