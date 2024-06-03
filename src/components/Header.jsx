import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button  from 'react-bootstrap/Button';
import logo from '../puma.ico';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';

const now = new Date()

export default function Header(){
  const navigate = useNavigate();

  return(
    <Navbar data-bs-theme="dark" className="navbar-custom" expand="sm" >
    <Container className='container-1'>
      <Navbar.Brand href="/">
        { <img src={logo} width="32" height="32" alt="ПУМА"
                      className="navbar-brand-image"/> }
                  &nbsp;ПУМА</Navbar.Brand>
      <Navbar.Toggle className="navbar-menu" aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav >
          <NavDropdown className="navbar-text" title="Маркировка">
            <NavDropdown.Item href="#action/1.1">Заявки</NavDropdown.Item>
            <NavDropdown.Item href="#action/1.2">
              Обзор принтеров
            </NavDropdown.Item>
            <NavDropdown.Item href="/stickering/stk">Поштучная маркировка</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/1.4">
            Ручной ввод атрибутов мед. изделий
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown className="navbar-text" title="Агрегация">
            <NavDropdown.Item className="disabled" href="#action/2.1">В разработке</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/2.2">
              Приемки
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        
      </Navbar.Collapse>
    </Container>
    <Container className='container2'>
    <Navbar.Collapse className="justify-content-end">
      <Button className='container-2 bnt-acc' variant="outline-info" onClick={ UserService.test}>
        <Navbar.Text>{UserService.getUsername()}</Navbar.Text>
            
          </Button>
        <Button className='container-2 bnt-logout' variant="outline-danger" 
          onClick={()=> UserService.doLogout()}>
          Выйти
        </Button>
        <Navbar.Text className='container-2 timetext'>
        {now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </Navbar.Text>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}