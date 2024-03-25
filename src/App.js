import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect } from 'react';
import { uiActions } from './Store/UiSlice';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

let isInitial =true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.cartIsVisible)
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'pending...',
        message: 'sending data to cart'
      }))
      const response = await fetch(`https://cartreduxprojec-default-rtdb.firebaseio.com/cart.json`,
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        });

      if (!response.ok) {
        throw new Error('Sending data to cart failed');
      }
      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'success!!',
        message: 'successfully sent data to cart'
      }))
    }

    if(isInitial){
      isInitial = false;
      return;
    }
    sendCartData().catch(error => {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'error...',
        message: 'failed sending data to cart'
      }))
    })
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && <Notification
        status={notification.status}
        title={notification.title}
        message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>

  );
}

export default App;
