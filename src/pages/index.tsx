import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { useMemo } from 'react'
import { TableContainer } from '../components/TableContainer'
import makeData from '../mock/MakeData'
import { MockData } from '../mock/MOCK'

const Index = () => {

  const headers = ["Timestamp", "Purchase ID", "Mail", "Name", "Status"]
  
  const data = useMemo(() => makeData(1000), []);

  return (
    <Container height="100vh">
      <Hero title='Tryp Bookings' />
      <TableContainer headers={headers} data={data} sorting={true} pagination={true} caption="Bookings" />
      <DarkModeSwitch />
    </Container>
  )
}

export default Index
