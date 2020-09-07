import React from 'react'

import { Helmet } from 'react-helmet'
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import theme from 'providers/theme'

const App = () => {
  return (
    <div className='App'>
      <Helmet>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
        />
      </Helmet>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        App
      </ThemeProvider>
    </div>
  )
}
export default App
