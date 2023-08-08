export default function componentStyleOverrides(theme,) {

  const bgColor = theme.colors?.grey50;
  const themeMode = theme.customization.themeMode;
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 400,
          borderRadius: '4px',
          color:themeMode === 'dark' ? theme.colors?.darkbg1 : theme.colors?.primaryMain,
          backgroundColor: themeMode === 'dark' ? theme.colors?.subtitle : theme.colors?.secondaryLight,
          '&:hover': {
            backgroundColor: themeMode === 'dark' ? theme.colors?.subtitle  :theme.colors?.primaryMain,
            color:themeMode === 'dark' ? theme.colors?.darkgb1 :  theme.paper,
          },
        }
      }
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        },
        rounded: {
          borderRadius: `${theme?.customization?.borderRadius}px`
        }
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          color: theme.colors?.textDark,
          padding: '24px'
        },
        title: {
          fontSize: '1.4rem'
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px'
        }
      }
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '24px',
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color:themeMode === 'dark' ? theme.colors?.subtitle  :  theme.darkTextPrimary,
          paddingTop: '10px',
          paddingBottom: '10px',
          '&.Mui-selected': {
            color:themeMode === 'dark' ? theme.colors?.darkbg1 : theme.menuSelected,
            backgroundColor: themeMode === 'dark' ? theme.colors?.darkbg1 : theme.colors?.secondaryLight,
            '&:hover': {
              backgroundColor: themeMode === 'dark' ? theme.colors?.darkbg1  :theme.colors?.secondaryLight
            },
            '& .MuiListItemIcon-root': {
              color:themeMode === 'dark' ? theme.colors?.subtitle : undefined
            }
          },
          '&:hover': {
            backgroundColor:themeMode === 'dark' ? theme.colors?.darkbg1 : theme.colors?.secondaryLight,
            color: themeMode === 'dark' ? theme.colors?.subtitle  : theme.colors?.secondaryMain,
            '& .MuiListItemIcon-root': {
              color: themeMode === 'dark' ? theme.colors?.subtitle  :undefined
            }
          }
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: theme.darkTextPrimary,
          minWidth: '36px'
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: theme.textDark
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color:themeMode === 'dark' ? theme.paper : theme.textDark,
          '&::placeholder': {
            color:themeMode === 'dark' ? theme.colors?.light1 : theme.darkTextSecondary,
            fontSize: '0.875rem'
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background:themeMode === 'dark' ? theme.colors?.darkbg2 :  bgColor,
          borderRadius: `${theme?.customization?.borderRadius}px`,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor:themeMode === 'dark' ? theme.colors?.light1 :  theme.colors?.grey400
          },
          '&:hover $notchedOutline': {
            borderColor: theme.colors?.primaryLight
          },
          '&.MuiInputBase-multiline': {
            padding: 1
          }
        },
        input: {
          fontWeight: 500,
          background: themeMode === 'dark' ? theme.colors?.darkbg2 : bgColor,
          padding: '15.5px 14px',
          borderRadius: `${theme?.customization?.borderRadius}px`,
          '&.MuiInputBase-inputSizeSmall': {
            padding: '10px 14px',
            '&.MuiInputBase-inputAdornedStart': {
              paddingLeft: 0
            }
          }
        },
        inputAdornedStart: {
          paddingLeft: 4
        },
        notchedOutline: {
          borderRadius: `${theme?.customization?.borderRadius}px`
        }
      }
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: themeMode === 'dark' ? theme.colors?.light1 : theme.colors?.grey300
          }
        },
        mark: {
          backgroundColor:themeMode === 'dark' ? theme.colors?.light1 : theme.paper,
          width: '4px'
        },
        valueLabel: {
          color:themeMode === 'dark' ? theme.colors?.blue1 : theme?.colors?.primaryLight
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: theme.divider,
          opacity: 1
        }
      }
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: theme.colors?.primaryDark,
          background: theme.colors?.primary200
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-deletable .MuiChip-deleteIcon': {
            color: 'inherit'
          }
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: theme.paper,
          background: theme.colors?.grey700
        }
      }
    }
  };
}
