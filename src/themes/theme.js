import { createMuiTheme } from "@material-ui/core/styles";
//import blue from '@material-ui/core/colors/blue';
// import orange from '@material-ui/core/colors/orange';

export default createMuiTheme({
  // palette: {
  //   primary: {
  //        // light: will be calculated from palette.primary.main,
  //       main:"#e91e63"
  //         // dark: will be calculated from palette.primary.main
  //   },
  //   accent: {
  //    backgroundColor: orange[600],
  //    color: 'white'
  //   }
  // },
  typography: {
    useNextVariants: true,
      // Use the system font instead of the default Roboto font.
      fontFamily: 'sanFransisco',
      // fontWeightMedium: 500,
      // body1: {
      //   fontWeight: 500,
      // },
      subheading: {
        fontSize: 14,
        fontWeight: 100,
      },
      title: {
        fontSize: 31,
        fontWeight: 100,
        color: '#414042'
      },
      caption: {
        fontSize: 11,
        fontWeight: 100,
      },
      // button: {
      //   fontStyle: 'italic',
      // },
  },

  overrides: {
    MuiButton: {
      // Name of the component
      root: {
        // Name of the rule
        //color: 'green',
        borderRadius: "999em",
        textTransform: "normal",
        fontSize: 13,
        fontWeight: 100,     
        color: 'inherit',   
        // color: "white !important",
        // padding: "16px 32px",
        // minWidth: 160
        // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)'
        "&$disabled": {
          background: 'unset',
        }
      },     
      outlined: {
        borderRadius: "999em",
        color: "#ffffff",
        borderColor: "#ffffff",
        textTransform: "none"
      },      
    },
    MuiTypography: {
      body1: {
        fontWeight: 100,
        color: 'inherit',
      },
      subheading: {
        color: "inherit"
      },
      colorTextSecondary: {
        color: 'inherit',
      }
    },
    MuiGridListTile: {
      root: {
        listStyleType: "none"
      },
      tile: {
        overflow: "visible"
      }
    },
    MuiCard: {
      root: {
        borderRadius: "8px"
      }
    },
    MuiSlider: {
      root: {
        width: 'calc(100% - 153px)',
        display: 'inline-table'
      },
      track: {
        backgroundColor: '#f89f34',
        height: 4,
      },
      trackAfter: {
        opacity: 0.75,
        backgroundColor: '#ffffff'
      },
      thumb: {
        backgroundColor: '#ffffff',
        border: '1px solid #f89f34',
        width: 20,
        height: 20
      }
    },
    MuiListItemText: {
        primary: {
            color: "white",
            // fontSize: "12px",
            // letterSpacing: "2px"
        }
    },
    // MuiBackdrop: {
    //   root: {
    //     backgroundColor: 'rgb(255,255,255,0.75)',
    //     // width: 'calc(100% - 230px)',
    //     // right: 0,
    //     // top: 100,
    //     // height: 'calc(100% - 150px)',
    //     // left: 'unset',
    //   }
    // },
    MuiDialogActions: {
      root: {
        justifyContent: 'center',
        margin: '8px 4px 40px 0px',
      }
    },
    MuiBadge: {
      badge: {
        top: 12,
        width: 16,
        height: 16,
        right: -5
      }
    },
    MuiInput: {    
      underline:{
        // "&:before": {
        //   display: 'none'
        // },
        // "&:after": {
        //   display: 'none'
        // },
        "&:after": {
          borderBottom: '2px solid #000000'
        },
      }
    },
    MuiInputLabel: {
      formControl: {
        fontWeight: 100,
      }
    },
    MuiListItemIcon: {
      root: {
          color: "unset",         
      }
    },
    MuiTabScrollButton: {
      root: {
        flex: 'unset',
      }
    },
    MuiTab:{
      labelContainer: {
        paddingLeft: 0,
        paddingRight: 0,
        "@media (min-width: 960px)": {
          paddingLeft: 0,
        paddingRight: 0,
        }      
      },    
      label: {
        fontSize: 17,
        "@media (min-width: 960px)": {
          fontSize: 17,      
        }    
      }  
    },
    MuiFormLabel:{
      root: {
        color: 'inherit',
        "&$focused": {
          color: 'inherit !important',
        }
      },        
    },
    MuiDialogTitle: {
      root: {
        padding: '24px 42px 20px 42px',
        "@media (max-width: 768px)": {
          padding: '24px 24px 20px',
        }  
      }
    },
    MuiDialogContent: {
      root: {
        padding: '0 42px 24px 72px',
        "@media (max-width: 768px)": {
          padding: '0px 24px 24px',
        }  
      }
    },
    MuiToolbar:{
      gutters: {    
        "@media (min-width: 960px)": {
          paddingLeft: 55,
          paddingRight: 30,   
        }  
      }
    },
    MuiListItem: {
      default: {
        paddingTop: 6,
        paddingBottom: 6,
      }
    },
    MuiInputBase: {
      input: {
        padding: '7px 0 7px',
      }
    },
    MuiModal: {
      root: {
        zIndex: 998,//for react-medium-image-zoom
      }
    }
  }

  // props: {
  //     // Name of the component ⚛️
  //     MuiButtonBase: {
  //       // The properties to apply
  //       disableRipple: true, // No more ripple, on the whole application 💣!
  //     },
  //   },
});
