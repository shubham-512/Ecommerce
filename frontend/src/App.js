import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'


import  Header  from './component/Header'
import Footer from './component/Footer'
import HomeScreen from './screen/HomeScreen'
import ProductScreen from './screen/ProductScreen'
import CartScreen from './screen/CartScreen'
import LoginScreen from './screen/LoginScreen'
import RegisterScreen from './screen/RegisterScreen'


function App() {
  return (
    <Router>
      <Header  />
      <main className="py=3">
         <Container> 
           <Route path='/' component={HomeScreen} exact />
           <Route path='/login' component={LoginScreen}  />
           <Route path='/product/:id' component={ProductScreen}  />
           <Route path='/cart/:id?' component={CartScreen} />
           <Route path='/register' component={RegisterScreen} />
              
          </Container> 
          </main> 
      <Footer />

    </Router>
  );
}

export default App;
