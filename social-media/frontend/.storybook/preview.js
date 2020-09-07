import React from 'react'
import { Helmet } from 'react-helmet'
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import theme from 'providers/theme'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [
  (Story) => (
    <>
      <Helmet>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
        />
      </Helmet>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    </>
  ),
]