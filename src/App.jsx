import { BrowserRouter , Routes , Route} from "react-router-dom"
import NavBar from "./NavBar"
import Login from "./Login"
import Profile from "./Profile"
import Body from "./Body"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./Feed"
import Connections from "./Connections"
import Request from "./Request"
import Premium from "./Premium"


function App() {

  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Body/>}>
                <Route path="/" element={<Feed/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/connections" element={<Connections />} />
                <Route path="/requests" element={<Request />} /> 
                <Route path="/premium" element={<Premium />} /> 
            </Route>
      </Routes>
    </BrowserRouter>
    </Provider>

      
    </>
  )
}

export default App
