import axios from 'axios'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { SWRConfig } from 'swr'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (resource, init) =>
          // fetch(resource, init).then((res) => res.json()),
          axios.get(resource, init).then((res) => res.data),
      }}
    >
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SWRConfig>
  )
}

export default MyApp
