import React from "react";
// import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core";
import classNames from 'classnames';
import sortAsc from '../../icons/sort_asc.png';
import sortDesc from '../../icons/sort_desc.png';
import sortBoth from '../../icons/sort_both.png';
// const defaultButton = props => <button {...props}>{props.children}</button>;

class ThComponent extends React.Component {
  // constructor(props) {
  //   super();

  //   this.changePage = this.changePage.bind(this);

  //   this.state = {
  //     visiblePages: this.getVisiblePages(null, props.pages)
  //   };
  // }

  // static propTypes = {
  //   pages: PropTypes.number,
  //   page: PropTypes.number,
  //   PageButtonComponent: PropTypes.any,
  //   onPageChange: PropTypes.func,
  //   previousText: PropTypes.string,
  //   nextText: PropTypes.string
  // };

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.pages !== nextProps.pages) {
  //     this.setState({
  //       visiblePages: this.getVisiblePages(null, nextProps.pages)
  //     });
  //   }

  //   this.changePage(nextProps.page + 1);
  // }

  // filterPages = (visiblePages, totalPages) => {
  //   return visiblePages.filter(page => page <= totalPages);
  // };

  // getVisiblePages = (page, total) => {
  //   if (total < 7) {
  //     return this.filterPages([1, 2, 3, 4, 5, 6], total);
  //   } else {
  //     if (page % 5 >= 0 && page > 4 && page + 2 < total) {
  //       return [1, page - 1, page, page + 1, total];
  //     } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
  //       return [1, total - 3, total - 2, total - 1, total];
  //     } else {
  //       return [1, 2, 3, 4, 5, total];
  //     }
  //   }
  // };

  // changePage(page) {
  //   const activePage = this.props.page + 1;

  //   if (page === activePage) {
  //     return;
  //   }

  //   const visiblePages = this.getVisiblePages(page, this.props.pages);

  //   this.setState({
  //     visiblePages: this.filterPages(visiblePages, this.props.pages)
  //   });

  //   this.props.onPageChange(page - 1);
  // }

  // toggleSort= e => {
  //   if (isSortable) this.sortColumn(column, multiSort ? e.shiftKey : false)
  // }

  render() {
    const { toggleSort, className, children, classes, ...rest } = this.props;
    let sortArrow = null;

    if(className===' rt-resizable-header -cursor-pointer' || className===' -cursor-pointer'){
      sortArrow = <span style={{marginLeft: 5}}><img src={sortBoth} alt="sortBoth"/></span>
    }else if(className===' rt-resizable-header -sort-asc -cursor-pointer'  || className===' -sort-asc -cursor-pointer'){
      sortArrow = <span style={{marginLeft: 5}}><img src={sortAsc} alt="sortAsc"/></span>
    }else if(className===' rt-resizable-header -sort-desc -cursor-pointer'  || className===' -sort-desc -cursor-pointer'){
      sortArrow = <span style={{marginLeft: 5}}><img src={sortDesc} alt="sortDesc"/></span>
    }
  
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <div
        className={classNames('rt-th', className)}
        onClick={e => toggleSort && toggleSort(e)}
        role="columnheader"
        tabIndex="-1" // Resolves eslint issues without implementing keyboard navigation incorrectly
        {...rest}
      >
        {children} 
        {sortArrow}
      </div>
    );
  }
}

// const styles = {
//     cursorPointer: {
//         cursor: 'pointer'
//     },
//     TableitemCount: {
//         /* marginTop: 10; */
//         fontSize: 14,
//     },
      
//       Tablepagination: {
//         display: 'flex',
//         justifyContent: 'flex-end',
//         padding: '20px 10px',
//         textAlign: 'right'
//     },
      
//       TablepageButton: {
//         fontSize: 15,
//         outline: 'none',
//         border: 'none',
//         backgroundColor: 'transparent',
//         cursor: 'pointer',
//         padding: '1px 6px'
//     },      
//       TablepageButtonDisabled: {
//         fontSize: 15,
//         outline: 'none',
//         border: 'none',
//         backgroundColor: 'transparent',      
//         padding: '1px 6px',
//         cursor: 'not-allowed',
//         color: 'gray',
//     },      
//       TablepageButtonActive: {
//         color: '#45b3e3',
//         fontWeight: 'bold',
//     },    
//     inlineBlock: {
//         display: 'inline-block'
//     },      
// }

export default (ThComponent)