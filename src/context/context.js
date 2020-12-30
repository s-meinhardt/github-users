import React, { useState, useEffect } from 'react'
import mockUser from './mockData.js/mockUser'
import mockRepos from './mockData.js/mockRepos'
import mockFollowers from './mockData.js/mockFollowers'
import axios from 'axios'

const rootUrl = 'https://api.github.com'

const GithubContext = React.createContext()

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser)
  const [repos, setRepos] = useState(mockRepos)
  const [followers, setFollowers] = useState(mockFollowers)
  const [requests, setRequests] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState({ show: false, msg: '' })

  const searchGithubUser = async user => {
    try {
      setIsLoading(true)
      setError({ show: false, msg: '' })
      const response = await Promise.all([
        axios.get(`${rootUrl}/users/${user}`),
        axios.get(`${rootUrl}/users/${user}/repos?per_page=100`),
        axios.get(`${rootUrl}/users/${user}/followers`),
      ])
      setGithubUser(response[0].data)
      setRepos(response[1].data)
      setFollowers(response[2].data)
    } catch (error) {
      setError({ show: true, msg: `there is no user or not enough data for the username ${user}` })
      console.log(error)
    }
    await checkRequests()
    setIsLoading(false)
  }

  const checkRequests = async () => {
    try {
      const response = await axios.get(`${rootUrl}/rate_limit`)
      const remaining = response.data.rate.remaining
      setRequests(remaining)
      if (remaining === 0) setError({ show: true, msg: 'sorry, you have exceeded your hourly rate limit!' })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkRequests()
  }, [])

  return (
    <GithubContext.Provider value={{ githubUser, repos, followers, requests, error, searchGithubUser, isLoading }}>
      {children}
    </GithubContext.Provider>
  )
}

export { GithubContext, GithubProvider }
