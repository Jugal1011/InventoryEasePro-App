import React, { useEffect } from 'react'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, selectIsLoading } from '../../redux/features/productSlice';
import { selectIsLoggedIn } from '../../redux/features/authSlice';
import ProductSummary from '../../components/product/productSummary/ProductSummary';
import ProductList from '../../components/product/productList/ProductList';

const Dashboard = () => {
  const dispatch = useDispatch();
  useRedirectLoggedOutUser("/app/login-user");
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const {products, isLoading, isError, message} = useSelector((state)=> state.product);

  useEffect(()=>{
    if(isLoggedIn === true){
      dispatch(getAllProducts());
    }
    if(isError){
      console.log(message);
    }
  },[ isLoggedIn, isError, message, dispatch]);

  return ( 
    <div>
      <ProductSummary products={products} />
      <ProductList products={products} isLoading={isLoading} />
    </div>
  )
}

export default Dashboard
