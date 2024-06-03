import './App.css';
import {HashRouter,Routes,Route,NavLink}from 'react-router-dom';
import { invoke } from '@tauri-apps/api'
import { getVersion ,getName} from '@tauri-apps/api/app';

const appVersion = await getVersion();
const appName = await getName();
const frontName = process.env.REACT_APP_NAME;
const frontVersion = process.env.REACT_APP_VERSION

const content = `:::${appName} ver.${appVersion}:::${frontName} ver.${frontVersion}:::`;

let title =""

function Footer(){
  return (
    <footer>{content}</footer>
  )
}


function Main(){
  
  title = 'Main'
  invoke('greet', { name: title })
  // `invoke` returns a Promise
  .then((response) => console.log(response))
  return(
    <><div>
      <h1>Main</h1>
      <NavLink to='/edit'>Go to Edit</NavLink>
    </div></>
  )
}

function Edit(){
  title = 'Edit'
  invoke('greet', { name: title })
  // `invoke` returns a Promise
  .then((response) => console.log(response))
  return(
    <div>
      <h1>Edit</h1>
      <NavLink to='/'>Go to Main</NavLink>
    </div>
  )
}

function App() {
  return (
    <><div className="App">
      <header className="App-header">
        <HashRouter>
          <Routes>
            <Route path='/' element={<Main />}></Route>
            <Route path='/edit' element={<Edit />}></Route>
          </Routes>
        </HashRouter>
      </header>
      <Footer></Footer>
    </div></>
  );
}

export default App;
