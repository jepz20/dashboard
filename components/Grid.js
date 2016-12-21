import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Table, Column, Cell } from 'fixed-data-table-2';
import dateformat from 'dateformat';
const Dimensions = require('react-dimensions');
import TextField from 'material-ui/TextField';

const mapStateToProps = (state) => ({
  grid: state.grid,
  routing: state.routing,
});

let SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

const reverseSortDirection = (sortDir) => (
  sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC
);

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
  let formatDate;
  if (timestamp && timestamp.length > 0) {
    formatDate = dateformat(new Date(timestamp * 1000), 'dd-mm-yyyy, hh:MMtt');
  } else {
    formatDate = '';
  };

  return (
    <Cell {...props}>
      { formatDate }
    </Cell>
  );
};

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._onSortChange = this._onSortChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this.fetchDefaultIssues = this.fetchDefaultIssues.bind(this);
    const { fetchIssuesDetail } = this.props;
    fetchIssuesDetail();
  }

  componentDidMount() {
    var intervalId = setInterval(this.fetchDefaultIssues, 1000);
    this.setState({ intervalId: intervalId });
  };

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  fetchDefaultIssues() {
    const { fetchIssuesDetail } = this.props;
    fetchIssuesDetail();
  }

  _onSortChange(columnKey, sortDir) {
    const { sortChangeIssuesDetail } = this.props;
    sortChangeIssuesDetail(columnKey, sortDir);
  }

  _onFilterChange(e) {
    const { filterChangeIssuesDetail } = this.props;
    filterChangeIssuesDetail(e.target.value);
  }

  render() {

    const { containerHeight, containerWidth, grid } = this.props;
    return (
      <div>
        <TextField
          floatingLabelText="Search"
          onChange={this._onFilterChange}
        /><br />
        <Table
          rowsCount={grid.dataList.getSize()}
          rowHeight={50}
          headerHeight={50}
          touchScrollEnabled={true}
          width={containerWidth}
          height={containerHeight}
        >
          <Column
            columnKey="customerName"
            fixed={true}
            header={
              <SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={grid.colSortDirs.customerName}>
                Name
              </SortHeaderCell>
            }
            cell={<TextCell data={grid.dataList} />}
            width={100}
          />
          <Column
            columnKey="customerEmail"
            header={
              <SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={grid.colSortDirs.customerEmail}>
                Email
              </SortHeaderCell>
            }
            cell={<TextCell data={grid.dataList} />}
            width={150}
          />
          <Column
            columnKey="timestampSubmission"
            header={
              <SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={grid.colSortDirs.timestampSubmission}>
                Submission Date
              </SortHeaderCell>
            }
            cell={<DateCell data={grid.dataList} />}
            width={200}
          />
          <Column
            columnKey="description"
            header={
              <SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={grid.colSortDirs.description}>
                description
              </SortHeaderCell>
            }
            cell={<TextCell data={grid.dataList} />}
            width={300}
          />
          <Column
            columnKey="employeeName"
            header={
              <SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={grid.colSortDirs.employeeName}>
                Employee Name
              </SortHeaderCell>
            }
            cell={<TextCell data={grid.dataList} />}
            width={150}
          />
          <Column
            columnKey="status"
            header={
              <SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={grid.colSortDirs.status}>
                status
              </SortHeaderCell>
            }
            cell={<TextCell data={grid.dataList} />}
            width={80}
          />
          <Column
            columnKey="timestampClosed"
            header={
              <SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={grid.colSortDirs.timestampClosed}>
                Close Date
              </SortHeaderCell>
            }
            cell={<DateCell data={grid.dataList} />}
            width={200}
          />
        </Table>
      </div>
    );
  }
}

Grid = Dimensions({
  getHeight: function (element) {
    return window.innerHeight - 100;
  },

  getWidth: function (element) {
    let width = window.innerWidth;
    if (width > 768 && width <= 991) {
      width = 720;
    } else if (width > 991 && width <= 1200) {
      width = 940;
    } else if (width > 1200) {
      width = 1140;
    };

    return width;
  },
})(Grid);

Grid = connect(mapStateToProps, actions)(Grid);
export default Grid;
