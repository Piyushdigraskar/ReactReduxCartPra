
import { uiActions } from "./UiSlice"
import { cartActions } from "./CartSlice"

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(`https://cartreduxprojec-default-rtdb.firebaseio.com/cart.json`);

            if (!response.ok) {
                throw new Error('Error While fetching cart data');
            }

            const data = await response.json();
            return data;
        }
        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity || 0
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'error...',
                message: 'failed Fetching data to cart'
            }))
        }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'pending...',
            message: 'sending data to cart'
        }))

        const sendRequest = async () => {
            const response = await fetch(`https://cartreduxprojec-default-rtdb.firebaseio.com/cart.json`,
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        items: cart.items,
                        totalQuantity: cart.totalQuantity
                    }),
                });

            if (!response.ok) {
                throw new Error('Sending data to cart failed');
            }
        }

        try {
            await sendRequest();
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'success!!',
                message: 'successfully sent data to cart'
            }))
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'error...',
                message: 'failed sending data to cart'
            }))

        }

    }
}