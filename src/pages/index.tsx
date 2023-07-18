import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { useEffect, useMemo, useState } from 'react'
import { TableContainer } from '../components/TableContainer'
import axios from "axios"
import { Heading, Spinner } from '@chakra-ui/react'

export interface IBookings {
  timestamp: string
  purchaseid: string
  mail: string
  name: string
  status: string 
}

const API_ENDPOINT = "https://64b675bddf0839c97e159a64.mockapi.io/api/v1/"

const Index = () => {

  const headers = ["Timestamp", "Purchase ID", "Mail", "Name", "Source", "Status", "Select"]

  const [bookings, setBookings] = useState(null)
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    setIsLoading(true)
    axios.get(`${API_ENDPOINT}bookings/`).then((res) => setBookings(res.data)).catch((e) => console.log(e)).finally(() => setIsLoading(false))
  }, [])

  return (
    <Container height="100vh">
      <Hero title='Tryp Bookings' />
      {!isLoading ? bookings ? <TableContainer headers={headers} data={bookings} sorting={true} pagination={true} caption="Bookings" /> : <Heading mt="5rem" size="md">No Bookings found</Heading> : <Spinner mt="5rem" />}
      <DarkModeSwitch />
    </Container>
  )
}

export default Index
