import SignUp from './MyComponents/signup'
import SignIn from './MyComponents/login'
import Home from './MyComponents/Home'
import MyProfile from './MyComponents/myprofile'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './MyComponents/Header'
import FriendProfile from './MyComponents/FriendProfile'
import Card1 from './MyComponents/HomePosts'
import Messenger from './MyComponents/MessagePage'
import ShowMessage from './MyComponents/MessageShow'
import StatusCard from './MyComponents/HomePosts_Status'
import MyProfile_oneImage from './MyComponents/myprofile_oneimage'

function App(props) {
  return (
    <div >
      <Router>
        <Route
         exact 
         strict 
        history={props.history} 
        component={SignUp} 
        path="/signup">  
        </Route>

        <Route
         exact 
         strict
         history={props.history} 
         component={SignIn} 
         path="/signin">  
         </Route>

        <Route 
        exact 
        strict 
        history={props.history} 
        component={Home}
         path="/home">  
         </Route>
        
         <Route           
          exact
          strict
           component={MyProfile}
           path="/my"
           history={props.history}
           ></Route>

<Route           
          exact
          strict
           component={Header}
           path="/header"
           history={props.history}
           ></Route>

<Route           
          exact
          strict
           component={FriendProfile}
           path="/friendprofile"
           history={props.history}
           ></Route>

<Route           
          exact
          strict
           component={Card1}
           path="/card1"
           history={props.history}
           ></Route>
 

<Route           
          exact
          strict
           component={Messenger}
           path="/messenger"
           //path="/messenger/:rid"
           history={props.history}
           ></Route>

<Route           
          exact
          strict
           component={ShowMessage}
           path="/showmessage"
           //history={props.history}
           ></Route>

<Route           
          exact
          strict
           component={StatusCard}
           path="/statusCard"
           history={props.history}
           ></Route>

<Route           
          exact
          strict
           component={MyProfile_oneImage}
           path="/MyProfile_oneImage"
           history={props.history}
           ></Route>
          
       
      </Router>         


     
    </div>
  );
}

export default App;
