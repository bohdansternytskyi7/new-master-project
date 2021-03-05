import React from 'react';
import { connect } from 'react-redux';
import {
  decreaseItem,
  removeItem,
  addItem,
} from '../../redux/cart/cart.actions';
import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem, addItem, removeItem, decreaseItem }) => {
  const { id, name, imageUrl, price, quantity } = cartItem;

  return (
    <div className='checkout-item'>
      <div className='image-container'>
        <img src={imageUrl} alt='item' />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        {quantity > 1 ? (
          <div onClick={() => decreaseItem(id)} className='arrow'>
            &#10094;
          </div>
        ) : (
          <div className='arrow-disabled'>&#10094;</div>
        )}
        <span className='value'>{quantity}</span>
        <div onClick={() => addItem(cartItem)} className='arrow'>
          &#10095;
        </div>
      </span>
      <span className='price'>{price}</span>
      <div onClick={() => removeItem(id)} className='remove-button'>
        &#10005;
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeItem: (id) => dispatch(removeItem(id)),
  addItem: (item) => dispatch(addItem(item)),
  decreaseItem: (id) => dispatch(decreaseItem(id)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
