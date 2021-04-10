import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row,Col,Image,ListGroup,Button,Card,Form,} from "react-bootstrap";
import Rating from "../component/Rating";
import { listProductsDetails } from "../action/productAction";
import Loader from "../component/Loader";
import Message from "../component/Message";

const ProductScreen = ({ match , history }) => {
  //const product = products.find((p)=> p._id == match.params.id )
  const [qty, setqty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  useEffect(() => {
    dispatch(listProductsDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
}

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={6} >
            
              
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>

             
              <ListGroup.Item>Price: {product.price} Rs </ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color={"#f8e825"}
                />
              </ListGroup.Item>
            </ListGroup>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Price:</strong>
                    </Col>
                    <Col>
                      <strong> {product.price} Rs</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Stock:</strong>
                    </Col>
                    <Col>
                      <strong>
                        
                        {product.counterInStock > 0 ? "In Stock" : "Out of Stock"}
                         
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.counterInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col className="my-1">
                        <strong>Qty :</strong>
                      </Col>
                      <Col xs="auto" className= "my-1">
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setqty(e.target.value)}
                        >
                          {[...Array(product.counterInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block "
                    disabled={product.countInStock === 0}
                    type="button"
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
            
          </Col>
          
        </Row>
      )}
    </div>
  );
};

export default ProductScreen;
