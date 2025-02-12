/** @jsx jsx */
import { jsx, Styled, ColorMode, components } from 'theme-ui'
import { ThemeContext } from '@emotion/core'
import { MDXProvider } from '@mdx-js/react'
import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { base } from '@theme-ui/presets'
import {
  TypeScale,
  TypeStyle,
  HeadingStyle,
  ColorPalette,
  FontFamily,
} from '@theme-ui/style-guide'
import Layout from '../components/layout'
import Lorem from './lorem.mdx'

export default () => {
  const [theme, setTheme] = useState(null)

  const fetchTheme = async () => {
    const res = await fetch('https://beta.components.ai/api/generate/theme')
    const data = await res.json()
    setTheme({ ...base, ...data })
  }

  useEffect(() => {
    fetchTheme()
  }, [])

  if (!theme) {
    return (
      <Layout>
        <Styled.h1>Fetching theme...</Styled.h1>
      </Layout>
    )
  }

  const { metadata } = theme

  return (
    <Layout>
      <Helmet>
        {metadata.fontLinkHref ? (
          <link rel="stylesheet" href={metadata.fontLinkHref} />
        ) : null}
      </Helmet>
      <div
        css={{
          '*': {
            transition: 'all .2s ease-out',
          },
        }}
      >
        <ColorMode />
        <ThemeContext.Provider value={theme}>
          <Styled.root>
            <Styled.a
              css={{
                backgroundColor: 'black',
                color: 'white',
                fontSize: 14,
                padding: '10px 20px',
                cursor: 'pointer',
                borderRadius: 3,
                lineHeight: 1,
                textTransform: 'uppercase',
                letterSpacing: 1,
                fontWeight: 600,
              }}
              onClick={fetchTheme}
            >
              Generate new theme
            </Styled.a>
            <Styled.h2>Random Theme</Styled.h2>
            <Styled.p>
              In order to show the power of Theme UI we've wired in a theme
              generator to display random themes (color and typography). This
              illustrates the drastically different effects you can achieve with
              a small theme object that's merged with the{' '}
              <Styled.a href="/presets">base theme</Styled.a>.
            </Styled.p>
            <Styled.p></Styled.p>
            <Styled.h2>Colors</Styled.h2>
            <ColorPalette omit={['modes', 'header']} />
            <Styled.h2>Typography</Styled.h2>
            <TypeStyle fontSize={7}>
              Body: <FontFamily name="body" />
            </TypeStyle>
            <HeadingStyle
              fontFamily="heading"
              fontWeight="heading"
              lineHeight="heading"
              fontSize={7}
            >
              Heading: <FontFamily name="heading" />
            </HeadingStyle>
            <Styled.h2>Type Scale</Styled.h2>
            <TypeScale />
            <MDXProvider components={components}>
              <Lorem />
            </MDXProvider>
            <Styled.h2>Raw JSON</Styled.h2>
            <textarea
              value={JSON.stringify(theme, null, 2)}
              rows={16}
              readOnly
              css={{
                width: '100%',
                fontFamily: 'monospace',
                bg: 'muted',
                border: 0,
                borderRadius: 4,
              }}
            />
          </Styled.root>
        </ThemeContext.Provider>
      </div>
    </Layout>
  )
}
