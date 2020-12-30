import React from 'react'
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react'
import styled from 'styled-components'
import { Info, Repos, User, Search, Navbar } from '../components'
import loadingImage from '../images/preloader.gif'

import { GithubContext } from '../context/context'
const Dashboard = () => {
  const { isLoading } = React.useContext(GithubContext)
  const { error } = useAuth0()

  if (error)
    return (
      <Wrapper>
        <h1>{error.message}</h1>
      </Wrapper>
    )

  if (isLoading)
    return (
      <main>
        <Navbar />
        <Search />
        <img src={loadingImage} className='loading-img' alt='loading' />
      </main>
    )

  return (
    <main>
      <Navbar />
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  )
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  img {
    width: 150px;
  }
`

export default withAuthenticationRequired(Dashboard, {
  onRedirecting: () => (
    <Wrapper>
      <img src={loadingImage} alt='spinner' />
    </Wrapper>
  ),
})
