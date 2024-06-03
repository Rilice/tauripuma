
import { Card,InputGroup,Form,Button } from 'react-bootstrap';
import {useState, useEffect} from 'react'
import {useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { addPrinter,fetchPrinters,checkAggwork,get_receipt_info,boxRedirect ,fetchBebus} from '../store/slices/PbpStkSlice';
import UserService from '../services/UserService';

const CardSetAggwork = () =>{
  const dispatch = useDispatch();

  const{status,error} = useSelector(state =>state.pbpstk);

  const printers = useSelector(state => state.pbpstk.printers);
  const aggworks = useSelector(state => state.pbpstk.aggworks);
  //console.log(aggworks)

  const [printerip, setPrinter] = useState('Выберите принтер');
  const [aggworktid, setAggwork] = useState('');

  const suzOrderTids = useSelector(state => state.pbpstk.suzOrderTids)
  const wScanFactoryBox = useSelector(state => state.pbpstk.wScanFactoryBox)
  //var errorTitle = null
  //if (error){
  //  errorTitle = error
  //}
  const usertoc = UserService.getToken()
  useEffect(()=> {
    dispatch(fetchBebus([usertoc]));
    dispatch(fetchPrinters());
  }, [dispatch]);

  return (<div style={{alignItems:"center",display: "flex",  flexDirection: "column"
  // ,justifyContent: "center",
  }}>
    <Card style={{ width: '30rem' }}>
      <Card.Header><h6>Введите номер задания агрегации</h6></Card.Header>
      <Card.Body>
        <InputGroup className="mb-3">
          <Form.Control 
            placeholder="Формата '12345'"
            aria-label="Формата '12345'"
            aria-describedby="basic-addon2"
            onChange={event =>{
              setAggwork(event.target.value)
            }}
          />
          <Button variant="light" id="button-go-stk" onClick={() => {
            dispatch(checkAggwork([aggworktid,printerip]));
            dispatch(get_receipt_info([aggworktid]));
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
            </svg>
          </Button>
        </InputGroup>
        <hr></hr>
        <Card.Text>Принтер</Card.Text>
        <Form.Select aria-label="selectPrinterIp" onChange={event => {
          var index = event.target.selectedIndex;
          //event.target[index].text
          setPrinter(event.target[index].text)
        } }
            defaultValue={0}>
          <option value={0} key={0}>Выберите принтер</option>
          {printers.map((printer) => (
            //console.log(printer),
          <option value={printer.tid} key={printer.tid}>{printer.IP}</option>
          )
          )}
          
          {/* <option value="1">One</option> */}
        </Form.Select>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
      <Card.Footer>
        {status === 'loading' && <h6>Загрузка принтеров...</h6>}
        {error && <h6 style={{color:"red"}}>Произошла ошибка: {error}</h6>}
        {(aggworks && !error) && <h6>Загрузка следующего блока</h6>}
      </Card.Footer>
    </Card>
  </div>)
}

export {CardSetAggwork}