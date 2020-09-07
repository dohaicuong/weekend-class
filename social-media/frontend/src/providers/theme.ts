import { createMuiTheme } from '@material-ui/core'

export default createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*': {
          'scrollbar-width': 'thin',
        },
        '*::-webkit-scrollbar': { width: 10, height: 10 },
        '::-webkit-scrollbar-thumb': {
          background: '#c1c1c1',
          borderRadius: 10,
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: '#9c9c9c',
        },
      }
    },
    MuiButton: {
      label: {
        textTransform: 'none',
        // fontWeight: 600,
      }
    }
  }
})
