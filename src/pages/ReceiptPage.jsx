import React from 'react'
//import Header from '../components/Header'
import Header from '../components/Header'
import { useEffect } from 'react';
import UserService from '../services/UserService';
import BootstrapTable from '../components/Table';
import { Container } from 'react-bootstrap';
import Title from '../components/Title';
import Button  from 'react-bootstrap/Button';
import {useParams} from 'react-router-dom'


const ReceiptPage =()=> {

  console.log(useParams())
  const params = useParams("receiptID")
  const receiptID = params.receiptID

  const usertoc = UserService.getToken()
  console.log(UserService.getUsername(),UserService.hasRole(['admin']))
  console.log(UserService.getToken())
  console.log(UserService.getTokenParsed())
  return (<>
  <Header></Header>
  <Container>
    <Title titlename="Заявка на приемку"></Title>
    <h1>{receiptID}</h1>
    {/* <Container className='mt-3'>
      <div className="d-grid gap-2">
        <Button variant="primary" size="lg">
          Поиск приемки из МАНХ
        </Button>
      </div>
      <BootstrapTable></BootstrapTable>
    </Container> */}
  </Container>
  </>)
  //(<Authentication/>)

}

export default ReceiptPage
