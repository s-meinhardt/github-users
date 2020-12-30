import React from 'react'
import styled from 'styled-components'
import { GithubContext } from '../context/context'
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts'
const Repos = () => {
  const { repos } = React.useContext(GithubContext)
  const data = repos.reduce((total, repo) => {
    let { language, stargazers_count: stars } = repo
    if (!language) return total
    if (!total[language]) total[language] = { lang_count: 1, star_count: stars }
    else {
      const { lang_count, star_count } = total[language]
      total[language] = { lang_count: lang_count + 1, star_count: star_count + stars }
    }
    return total
  }, {})

  const languages = Object.keys(data)
    .map(lang => ({ label: lang, value: data[lang].lang_count }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)

  const stars = Object.keys(data)
    .map(lang => ({ label: lang, value: data[lang].star_count }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)

  const mostPopular = repos
    .map(repo => ({ label: repo.name, value: repo.stargazers_count }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)

  const mostForked = repos
    .map(repo => ({ label: repo.name, value: repo.forks }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)

  const chartData = [
    {
      label: 'HTML',
      value: '13',
    },
    {
      label: 'CSS',
      value: '83',
    },
    {
      label: 'Javascript',
      value: '80',
    },
  ]
  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie3D data={languages} />
        <Column3D data={mostPopular} />
        <Doughnut2D data={stars} />
        <Bar3D data={mostForked} />
      </Wrapper>
    </section>
  )
}

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`

export default Repos
