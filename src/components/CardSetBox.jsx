
import { Card,InputGroup,Form,Button, CardBody} from 'react-bootstrap';
import {useState, useEffect} from 'react'
import {useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { addPrinter,fetchPrinters,checkAggwork,boxRedirect } from '../store/slices/PbpStkSlice';
import { BsArrowRight} from "react-icons/bs";
//import { boxRedirect } from '../hooks/pbpStk';


const CardSetBox = ()=> {
  const dispatch = useDispatch();

  const{status,error} = useSelector(state =>state.pbpstk);

  const printers = useSelector(state => state.pbpstk.printers);
  const aggworks = useSelector(state => state.pbpstk.aggworks);
  //console.log(aggworks)

  const [printerip, setPrinter] = useState('Выберите принтер');
  const [aggworktid, setAggwork] = useState('');

  const suzOrderTids = useSelector(state => state.pbpstk.suzOrderTids)
  const wScanFactoryBox = useSelector(state => state.pbpstk.wScanFactoryBox)
  
  // useEffect(()=> {
  //   dispatch(fetchPrinters());
  // }, [dispatch]);

  return (<div style={{alignItems:"center",display: "flex",  flexDirection: "column"
  // ,justifyContent: "center",
  }}>
    <div className="col-sm-6 col-lg-5 mx-auto">
    <Card>
      <CardBody>

        <div className="row">
          <div className="col">
            <p>Задание агрегации: <b>45120</b></p>
          </div>
          <div className="col ">
            <p>Принтер: <b id="current-prt-name">10.15.7.99</b></p>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Сканируйте/введите идентификатор короба</label>
          <div className="row g-2">
            <div className="col-md ">
              <input type="text" className="form-control" placeholder="" id="box-input"/>
            </div>
            { (!wScanFactoryBox) &&
              <div className="col-auto">
                <Button className="btn-light" id="box-go" aria-label="Button" onClick={() => {
            dispatch(boxRedirect());
          }}>
                  <BsArrowRight/>
                </Button> 
              </div>
            }
          </div>
        </div>

        { (!!wScanFactoryBox ) &&
        <>
          <div className="mb-3" id="boxFactory-div">
            <label className="form-label">Сканируйте/введите идентификатор заводского короба</label>
            <div className="row g-2">
              <div className="col-md ">
                <input type="text" className="form-control" placeholder="" id="boxFactory-input"/>
              </div>
              <div className="col-auto">
                <Button className="btn-light" id="box-go2" aria-label="Button">           
                  <BsArrowRight/>
                </Button>
              </div>
            </div>
          </div>
        </>
        }

      </CardBody>
    </Card>
    </div>
  </div>)
}

export {CardSetBox}




// <div className="col-sm-6 col-lg-5 mx-auto">
//         <div className="card ">
//             <Card.Body className="card-body ">

//                 <div className="row">
//                     <div className="col">
//                         <p>Задание агрегации: <b>45120</b></p>
//                     </div>
//                     <div className="col ">
//                         <p>Принтер: <b id="current-prt-name">10.15.7.99</b></p>
//                     </div>
//                 </div>

//                 <div className="mb-3">
//                     <label className="form-label">Сканируйте/введите идентификатор короба</label>
//                     <div className="row g-2">
//                         <div className="col-md ">
//                             <input type="text" className="form-control" placeholder="" id="box-input">
//                         </div>
//                         <div className="col-auto">
//                             <a href="javascript:void(0)" className="btn btn-white btn-icon" id="box-go" aria-label="Button" onclick="boxRedirect();">
//                                 <!-- Download SVG icon from http://tabler-icons.io/i/search -->
//                                 <i className="fa-arrow-right fa-solid " aria-hidden="true"></i>
//                             </a>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="mb-3" id="boxFactory-div" style="display: none;">
//                     <label className="form-label">Сканируйте/введите идентификатор заводского короба</label>
//                     <div className="row g-2">
//                         <div className="col-md ">
//                             <input type="text" className="form-control" placeholder="" id="boxFactory-input">
//                         </div>
//                         <div className="col-auto">
//                             <a href="javascript:void(0)" className="btn btn-white btn-icon" id="box-go2" aria-label="Button" onclick="boxRedirect();">
//                                 <!-- Download SVG icon from http://tabler-icons.io/i/search -->
//                                 <i className="fa-arrow-right fa-solid " aria-hidden="true"></i>
//                             </a>
//                         </div>
//                     </div>
//                 </div>

//             </Card.Body>

//         </div>
//     </div>























// <Card style={{ width: '30rem' }}>
//       <Card.Header><h6>Сканируйте/введите идентификатор короба</h6></Card.Header>
//       <Card.Body>
//         <InputGroup className="mb-3">
//           <Form.Control 
//             placeholder="Формата '12345'"
//             aria-label="Формата '12345'"
//             aria-describedby="basic-addon2"
//             onChange={event =>{
//               setAggwork(event.target.value)
//             }}
//           />
//           <Button variant="light" id="button-go-stk" onClick={() => {
//             dispatch(checkAggwork([aggworktid,printerip]))
//           }}>
//             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
//               <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
//             </svg>
//           </Button>
//         </InputGroup>
//         <hr></hr>
//         <Card.Text>Принтер</Card.Text>
//         <Form.Select aria-label="selectPrinterIp" onChange={event => {
//           var index = event.target.selectedIndex;
//           //event.target[index].text
//           setPrinter(event.target[index].text)
//         } }
//             defaultValue={0}>
//           <option value={0} key={0}>Выберите принтер</option>
//           {printers.map((printer) => (
//             //console.log(printer),
//           <option value={printer.tid} key={printer.tid}>{printer.IP}</option>
//           )
//           )}
          
//           {/* <option value="1">One</option> */}
//         </Form.Select>
//         {/* <Button variant="primary">Go somewhere</Button> */}
//       </Card.Body>
//       <Card.Footer>
//         {status === 'loading' && <h6>Загрузка принтеров...</h6>}
//         {error && <h6 style={{color:"red"}}>Произошла ошибка: {error}</h6>}
//       </Card.Footer>
//     </Card>