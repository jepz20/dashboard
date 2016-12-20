import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Table, Column, Cell } from 'fixed-data-table';
import dateformat from 'dateformat';

const mapStateToProps = (state) => ({
});

let SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

function reverseSortDirection(sortDir) {
  return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
}

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

    this._defaultSortIndexes = [];
    let size = _data.length;
    for (let index = 0; index < size; index++) {
      this._defaultSortIndexes.push(index);
    };

    this._dataList = new DataListWrapper(this._defaultSortIndexes, _data);
    this.state = {
      sortedDataList: this._dataList,
      colSortDirs: {},
    };

    this._onSortChange = this._onSortChange.bind(this);
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
      sortedDataList: new DataListWrapper(sortIndexes, this._dataList._data),
      colSortDirs: {
          [columnKey]: sortDir,
        },
    });
  }

  render() {

    const { sortedDataList, colSortDirs } = this.state;
    return (
      <div>
        <Table
          rowsCount={this._dataList.getSize()}
          rowHeight={50}
          headerHeight={50}
          width={400}
          height={500}
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
            cell={<TextCell data={sortedDataList} />}
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
            cell={<TextCell data={sortedDataList} />}
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
            cell={<DateCell data={sortedDataList} />}
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
            cell={<TextCell data={sortedDataList} />}
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
            cell={<TextCell data={sortedDataList} />}
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
            cell={<TextCell data={sortedDataList} />}
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
            cell={<TextCell data={sortedDataList} />}
            width={150}
          />
        </Table>
      </div>
    );
  }
}

Grid = connect(mapStateToProps, actions)(Grid);

export default Grid;
