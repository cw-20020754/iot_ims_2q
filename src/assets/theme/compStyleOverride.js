import SpoqaHanSansNeoTtf from '../font/SpoqaHanSansNeo-Regular.ttf';
import SpoqaHanSansNeoWoff from '../font/SpoqaHanSansNeo-Regular.woff';
import SpoqaHanSansNeoWoff2 from '../font/SpoqaHanSansNeo-Regular.woff2';

export default function componentStyleOverrides(theme) {
  const bgColor = theme.paper;
  return {
    MuiCssBaseline: {
      styleOverrides: `
              @font-face {
                font-family: 'Raleway';
                font-style: normal;
                font-display: swap;
                font-weight: 400;
                  src: local('Spoqa Han Sans Neo'),
                  url(${SpoqaHanSansNeoTtf}) format('true type'),
                  url(${SpoqaHanSansNeoWoff}) format('woff'),
                  url(${SpoqaHanSansNeoWoff2}) format('woff2');
              }
            `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: '4px',
          '&:hover': {
            backgroundColor: theme.paper,
            borderColor: theme.menuSelectedBack,
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          background: theme.paper,
          color: theme.heading,
        },
        rounded: {
          borderRadius: `${theme?.customization?.borderRadius}px`,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          color: theme.colors?.textDark,
          padding: '24px',
          background: theme.paper,
        },
        title: {
          fontSize: '1rem',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '16px',
          background: theme.paper,
          color: theme.textDark,
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '24px',
          color: theme.textDark,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: theme.darkTextPrimary,
          paddingTop: '10px',
          paddingBottom: '10px',
          '&.Mui-selected': {
            color: theme.menuSelected,
            backgroundColor: theme.menuSelectedBack,
            '&:hover': {
              backgroundColor: theme.menuSelectedBack,
            },
            '& .MuiListItemIcon-root': {
              color: theme.menuSelected,
            },
          },
          '&:hover': {
            backgroundColor: theme.menuSelectedBack,
            color: theme.menuSelected,
            '& .MuiListItemIcon-root': {
              color: theme.menuSelected,
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: theme.darkTextPrimary,
          minWidth: '36px',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: theme.textDark,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: theme.textDark,
          '&::placeholder': {
            color: theme.darkTextPrimary,
            fontSize: '0.875rem',
          },
          '&.Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root': {
            color: theme.menuSelected,
          },
          '&.Mui-error .MuiInputAdornment-root .MuiSvgIcon-root': {
            color: theme.error,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: theme.paper,
          borderRadius: `${theme?.customization?.borderRadius}px`,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.colors?.grey400,
          },
          '&:hover $notchedOutline': {
            borderColor: theme.colors?.primaryLight,
          },
          '&.MuiInputBase-multiline': {
            padding: 1,
          },
          '&.Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root': {
            color: theme.colors?.primaryMain,
          },
          '&.Mui-error .MuiInputAdornment-root .MuiSvgIcon-root': {
            color: theme.colors?.errorMain,
          },
        },
        input: {
          fontWeight: 500,
          background: bgColor,
          padding: '15.5px 14px',
          borderRadius: `${theme?.customization?.borderRadius}px`,
          '&.MuiInputBase-inputSizeSmall': {
            padding: '10px 14px',
            '&.MuiInputBase-inputAdornedStart': {
              paddingLeft: 0,
            },
          },
        },
        inputAdornedStart: {
          paddingLeft: 4,
        },
        notchedOutline: {
          borderRadius: `${theme?.customization?.borderRadius}px`,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: theme.colors?.grey300,
          },
        },
        mark: {
          backgroundColor: theme.paper,
          width: '4px',
        },
        valueLabel: {
          color: theme?.colors?.primaryLight,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: theme.divider,
          opacity: 1,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: theme.colors?.primaryDark,
          background: theme.colors?.primary200,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-deletable .MuiChip-deleteIcon': {
            color: 'inherit',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: theme.paper,
          background: theme.darkTextPrimary,
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          background: theme.paper,
          color: theme.textDark,
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '28px',
          background: theme.paper,
          color: theme.textDark,
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 0,
          '& .MuiDataGrid-columnHeaders': {
            borderTop: `2px solid ${theme.colors?.grey700}`,
          },
          '& .MuiDataGrid-toolbarContainer': {
            padding: '-2px 4px 10px',
          },
        },
      },
    },
    MuiTreeView: {
      styleOverrides: {
        root: {
          background: theme.paper,
          color: theme.heading,
        },
      },
    },
    MuiTabsFlexContainer: {
      styleOverrides: {
        root: {
          background: theme.paper,
          color: theme.temp,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          background: theme.paper,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          background: theme.paper,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          background: theme.background,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          background: theme.paper,
        },
      },
    },
    MuiMenuList: {
      styleOverrides: {
        root: {
          background: theme.paper,
        },
      },
    },
  };
}
