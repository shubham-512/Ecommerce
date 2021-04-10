import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Row,Col} from 'react-bootstrap'

import {listProducts} from '../action/productAction'
import Product from '../component/Product'
import Loader from '../component/Loader'
import Message from '../component/Message'
//import axios from 'axios';

 const HomeScreen = () => {
     
    const dispatch = useDispatch()
    const productsList = useSelector( state => state.listProducts)
    const {error,loading,products} = productsList
     

     useEffect(()=>{

        dispatch(listProducts())

         
        

     },[dispatch])

 
    return (
        <div>
            <h1 className="my-3">Men's Cloths</h1>
            {
                loading ?  <Loader />
                : error ?  <Message variant='danger'>{error}</Message>
                : <Row>
                {products.map( product=>(
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product ={product} />
                    </Col>

                       ))}

         </Row>
            }
            
        </div>
    )
}

export default HomeScreen
