import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
// import classNames from 'classnames';

const defaultButton = props => <button {...props}>{props.children}</button>;

class Pagination extends React.Component {
  constructor(props) {
    super();

    this.changePage = this.changePage.bind(this);

    this.state = {
      visiblePages: this.getVisiblePages(null, props.pages),
      inputPage: props.page + 1
    };
  }

  static propTypes = {
    pages: PropTypes.number,
    page: PropTypes.number,
    PageButtonComponent: PropTypes.any,
    onPageChange: PropTypes.func,
    previousText: PropTypes.string,
    nextText: PropTypes.string
  };

  componentDidUpdate(prevProps, prevState) {
    if(this.props.page!==prevProps.page){
      this.setState({inputPage: this.props.page + 1})
    }
  }

  componentWillReceiveProps(nextProps) {  
    if (this.props.pages !== nextProps.pages) {
      this.setState({
        visiblePages: this.getVisiblePages(null, nextProps.pages)
      });
    }

    this.changePage(nextProps.page + 1);
  }

  filterPages = (visiblePages, totalPages) => {
    return visiblePages.filter(page => page <= totalPages);
  };

  getVisiblePages = (page, total) => {
    if (total < 7) {
      return this.filterPages([1, 2, 3, 4, 5, 6], total);
    } else {
      if (page % 5 >= 0 && page > 4 && page + 2 < total) {
        return [1, page - 1, page, page + 1, total];
      } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
        return [1, total - 3, total - 2, total - 1, total];
      } else {
        return [1, 2, 3, 4, 5, total];
      }
    }
  };

  changePage(page) {
    const activePage = this.props.page + 1;
    if (page === activePage) {
      return;
    }

    const visiblePages = this.getVisiblePages(page, this.props.pages);

    this.setState({
      visiblePages: this.filterPages(visiblePages, this.props.pages)
    });

    this.props.onPageChange(page - 1);    
  }

  handleChangeInputPage = (e) => {
    let inputPage = parseInt(e.target.value, 10);
    if(inputPage > this.props.pages){
      inputPage = this.props.pages
    }else if(inputPage < 1){
      inputPage = 1;
    }
    this.setState({inputPage})
  }

  handleToPageWithKeyPress = (e) => {
    if (e.key === 'Enter') {
      if(this.state.inputPage!==this.props.page + 1){
        if(this.state.inputPage<=this.props.pages && this.state.inputPage>=1){
          this.props.onPageChange(this.state.inputPage - 1);          
        }      
      }
    }
  }

  handleToPageWithBlur = (e) => {  
    if(this.state.inputPage!==this.props.page + 1){
      if(this.state.inputPage<=this.props.pages && this.state.inputPage>=1){
        this.props.onPageChange(this.state.inputPage - 1);        
      }      
    }
    
  }

  render() {
    const { PageButtonComponent = defaultButton, classes } = this.props;
    // const { visiblePages } = this.state;
    const activePage = this.props.page + 1;
   
    return (
      <div className={classes.Tablepagination}>
        <div className={classes.inlineBlock}>        
          <PageButtonComponent
            className={activePage === 1?classes.TablepageButtonDisabled:classes.TablepageButton}
            onClick={() => {
              if (activePage === 1) return;
              this.changePage(1);
            }}
            disabled={activePage === 1}    
          >
            First
          </PageButtonComponent>
        </div>
        <div className={classes.inlineBlock}>        
          <PageButtonComponent
            className={activePage === 1?classes.TablepageButtonDisabled:classes.TablepageButton}
            onClick={() => {
              if (activePage === 1) return;
              this.changePage(activePage - 1);
            }}
            disabled={activePage === 1}    
          >
          <i className="fas fa-angle-left"></i>
          </PageButtonComponent>
        </div>
        <div className={classes.inlineBlock}>
          {/* {visiblePages.map((page, index, array) => {
            return (
            //   <PageButtonComponent
            //     key={page}
            //     className={
            //       activePage === page
            //         ? "TablepageButton TablepageButton--active"
            //         : "TablepageButton"
            //     }
            //     onClick={this.changePage.bind(null, page)}
            //   >
            //     {array[index - 1] + 2 < page ? `...${page}` : page}
            //   </PageButtonComponent>
              <span
                key={page}
                className={
                    activePage === page
                    ? classNames([classes.TablepageButton, classes.TablepageButtonActive])
                    : classes.TablepageButton
                }
                onClick={this.changePage.bind(null, page)}
              >
                {array[index - 1] + 2 < page ? `...${page}` : page}
              </span>              
            );
          })} */}
          <span>
            <input type="number" min="1" max={this.props.pages?this.props.pages:1} value={this.state.inputPage} onChange={this.handleChangeInputPage} onBlur={this.handleToPageWithBlur} onKeyPress={this.handleToPageWithKeyPress}/>         
            {` / ${this.props.pages}`}        
          </span>
        </div>
        <div className={classes.inlineBlock}>      
          <PageButtonComponent
            className={activePage === this.props.pages?classes.TablepageButtonDisabled:classes.TablepageButton}
            onClick={() => {
                if (activePage === this.props.pages) return;
                this.changePage(activePage + 1);
                }}
            disabled={activePage === this.props.pages}
          >
            <i className="fas fa-angle-right"></i>
          </PageButtonComponent>
        </div>
        <div className={classes.inlineBlock}>      
          <PageButtonComponent
            className={activePage === this.props.pages?classes.TablepageButtonDisabled:classes.TablepageButton}
            onClick={() => {
                if (activePage === this.props.pages) return;
                this.changePage(this.props.pages);
                }}
            disabled={activePage === this.props.pages}
          >
            Last
          </PageButtonComponent>
        </div>
      </div>
    );
  }
}

const styles = {
    cursorPointer: {
        cursor: 'pointer'
    },
    TableitemCount: {
        /* marginTop: 10; */
        fontSize: 14,
    },
      
      Tablepagination: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '20px 10px',
        textAlign: 'right',
        fontSize: 14,
        borderTop: '1.5px solid rgba(0,0,0,0.12)'
    },
      
      TablepageButton: {
        fontSize: 15,
        outline: 'none',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        padding: '1px 6px'
    },      
      TablepageButtonDisabled: {
        fontSize: 15,
        outline: 'none',
        border: 'none',
        backgroundColor: 'transparent',      
        padding: '1px 6px',
        cursor: 'not-allowed',
        color: 'gray',
    },      
      TablepageButtonActive: {
        color: '#45b3e3',
        fontWeight: 'bold',
    },    
    inlineBlock: {
        display: 'inline-block'
    },      
}

export default withStyles(styles)(Pagination)