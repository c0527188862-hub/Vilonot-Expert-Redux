import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleCart, updateQuantity } from '../cartSlice';

export default function CartDrawer() {
  const { items, isOpen } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // חישוב סכום סופי
  const totalPrice = items.reduce((sum, item) => {
    const p = item.price || item.Price || 0;
    const q = item.quantity || 1;
    return sum + (p * q);
  }, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* רקע כהה שקוף */}
      <div style={s.overlay} onClick={() => dispatch(toggleCart())} />
      
      <div style={s.drawer}>
        <div style={s.header}>
          <button style={s.closeBtn} onClick={() => dispatch(toggleCart())}>✕</button>
          <h2 style={s.title}>סל הקניות שלי</h2>
        </div>

        <div style={s.content}>
          {items.length === 0 ? (
            <p style={s.emptyMsg}>הסל ריק</p>
          ) : (
            items.map((item) => (
              <div key={item.id} style={s.itemRow}>
                <div style={s.itemInfo}>
                  <h4 style={s.itemName}>{item.title || item.Name}</h4>
                  <p style={s.itemPrice}>{item.price || item.Price} ₪</p>
                  <div style={s.qtyRow}>
                    <button style={s.qtyBtn} onClick={() => dispatch(updateQuantity({ id: item.id, amount: 1 }))}>+</button>
                    <span>{item.quantity}</span>
                    <button style={s.qtyBtn} onClick={() => dispatch(updateQuantity({ id: item.id, amount: -1 }))}>-</button>
                  </div>
                </div>
                <img src={item.image} alt="" style={s.img} />
              </div>
            ))
          )}
        </div>

        <div style={s.footer}>
          <div style={s.totalPriceRow}>
            <span>{totalPrice} ₪</span>
            <span>סה"כ:</span>
          </div>
          <button 
            style={s.checkoutBtn}
            onClick={() => {
              dispatch(toggleCart()); // סוגר את העגלה
              navigate('/checkout');  // עובר לקופה בלי רענון דף
            }}
          >
            מעבר לתשלום
          </button>
        </div>
      </div>
    </>
  );
}

const s = {
  overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 10001 },
  drawer: { position: 'fixed', top: 0, right: 0, width: '380px', height: '100%', backgroundColor: '#fff', zIndex: 10002, display: 'flex', flexDirection: 'column', direction: 'rtl', boxShadow: '-5px 0 15px rgba(0,0,0,0.1)' },
  header: { padding: '20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  closeBtn: { background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' },
  title: { margin: 0, fontSize: '1.2rem', fontWeight: '500' },
  content: { flex: 1, overflowY: 'auto', padding: '20px' },
  itemRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '25px', alignItems: 'center' },
  itemInfo: { textAlign: 'right', flex: 1, paddingRight: '15px' },
  itemName: { margin: '0 0 5px 0', fontSize: '1rem' },
  itemPrice: { margin: '0 0 10px 0', color: '#b08b73', fontWeight: 'bold' },
  qtyRow: { display: 'flex', alignItems: 'center', gap: '15px' },
  qtyBtn: { width: '28px', height: '28px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer' },
  img: { width: '80px', height: '80px', objectFit: 'cover' },
  emptyMsg: { textAlign: 'center', marginTop: '40px', color: '#999' },
  footer: { padding: '20px', borderTop: '1px solid #eee', backgroundColor: '#fff' },
  totalPriceRow: { display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '20px' },
  checkoutBtn: { width: '100%', padding: '15px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '2px', fontSize: '1.1rem', cursor: 'pointer' }
};