import styles from "./Payment.module.css";
import {ReactComponent as UserIcon} from "../../assets/svg/paymentPage/user.svg";
import {ReactComponent as PhoneIcon} from "../../assets/svg/paymentPage/phone.svg";
import {ReactComponent as LocationIcon} from "../../assets/svg/paymentPage/location.svg";
import {ReactComponent as NoteIcon} from "../../assets/svg/paymentPage/note.svg";
import {ReactComponent as StoreIcon} from "../../assets/svg/paymentPage/store.svg";
import {ReactComponent as VoucherIcon} from "../../assets/svg/paymentPage/voucher.svg"
import { ReactComponent as AddButton} from "../../assets/svg/productPage/increaseBtn.svg";
import { ReactComponent as DecreaseButton} from "../../assets/svg/productPage/decreaseBtn.svg";
import testImg from "../../assets/image/products/1/1.1.1.jpg"
import {useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import {
    increaseQuantityAndPrice,
    decreaseQuantityAndPrice,
  } from "../../store/reducers/shoppingCartSlice";
import {setName, setPhoneNumber, setUserAddress, setStoreAddress, setNote, setPaymentMethod, setDeliveryMethod} from "../../store/reducers/paymentSlice";

 
const PaymentForm = (props) => {
    const dispatch = useDispatch();
    const shoppingCartData = useSelector((state) => state.shoppingCart);
    const orderedProducts = shoppingCartData.products;
    const orderedProductsQuantity = shoppingCartData.products.reduce((sum, productEl) => sum + productEl.quantity, 0);
    let orderProductsPrice = +shoppingCartData.totalBill.replace(/[^\d]/g, ""); // convert string to number
    let totalBill = orderProductsPrice + 20000; // +20000 => assume the ship cost is 20000vnđ => calculate the total bill
    totalBill = String(totalBill).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"; //  => then convert number to string to display
    orderProductsPrice = String(orderProductsPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"; // convert number to string to display

    const paymentData = useSelector((state) => state.paymentInformation);
    const name = paymentData.deliveryInformation.name;
    const phoneNumber = paymentData.deliveryInformation.phoneNumber;
    const userAddress = paymentData.deliveryInformation.userAddress;
    const storeAddress = paymentData.deliveryInformation.storeAddress;
    const note = paymentData.deliveryInformation.note;
    const paymentMethod = paymentData.deliveryInformation.paymentMethod;
    const deliveryMethod = paymentData.deliveryInformation.deliveryMethod;

    const handleUserNameChange = (event) => {
        dispatch(setName(event.target.value))
    }

    const handlePhoneNumberChange = (event) => {
        dispatch(setPhoneNumber(event.target.value))
    }

    const handleUserAddressChange = (event) => {
        dispatch(setUserAddress(event.target.value))
    }

    const handleStoreAddressChange = (event) => {
        dispatch(setStoreAddress(event.target.value))
    }

    const handleNoteChange = (event) => {
        dispatch(setNote(event.target.value))
    }

    const handlePaymentMethodChange = (event) => {
    event.target.name === "onlinePayment" && event.target.value === "on" && paymentMethod.offlinePayment === true ?
    dispatch(setPaymentMethod({offlinePayment: false, onlinePayment: true})) : dispatch(setPaymentMethod({onlinePayment: false, offlinePayment: true}));
   }   

    const handleDeliveryMethodChange = (event) => {
        event.target.name === "onlineReceiving" ?
        dispatch(setDeliveryMethod({onlineReceiving: true, offlineReceiving: false})) : dispatch(setDeliveryMethod({offlineReceiving: true, onlineReceiving: false}))
    }

   return <div className={styles.container}>
    {/* delivery information */}
    <div className = {styles["first-block"]}>
    {/* title */}
        <button name = "onlineReceiving" className={deliveryMethod.onlineReceiving  ? styles.currentDeliveryMethod : styles.anotherDeliveryMethod} onClick = {handleDeliveryMethodChange} >
            Giao hàng trực tuyến
        </button>
        <div className={styles.deliveryInformation}>
            <div className={styles.information}>
                Thông tin giao hàng 
            </div>
            {/* user's delivery information */} 
            <div className = {styles["input-name"]}>
                <UserIcon className = {styles["user-icon"]}/>
                <input name = "name" type="text"  placeholder = "Họ và tên người nhận" value = {name} onChange = {handleUserNameChange}/>
            </div>
            <div className = {styles["input-phoneNumber"]}>
                <PhoneIcon className = {styles["phone-icon"]}/>
                <input name = "phoneNumber" type="text"  placeholder = "Số điện thoại người nhận" value = {phoneNumber} onChange = {handlePhoneNumberChange}/>
            </div>
            {
                deliveryMethod.onlineReceiving && 
                <div className = {styles["input-address"]}>
                    <LocationIcon className = {styles["location-icon"]}/>    
                    <input name = "userAddress" type="text" className = {styles["input-address"]} value = {userAddress} onChange = {handleUserAddressChange} placeholder = "Địa chỉ người nhận"/>
                 </div>
            }
            <div className = {styles["input-note"]}>
                <NoteIcon className={styles["note-icon"]}/>
                <input name = "note" type="text" className = {styles["input-note"]} value = {note} onChange = {handleNoteChange} placeholder = "Ghi chú......."/> 
            </div>
            {/* payment method */}
            <div className={styles.information}>
                Phương thức thanh toán 
            </div>
            <div className = {styles["ship-cod"]}>
                <input name = "offlinePayment" type="radio" id="myCheck" onChange = {handlePaymentMethodChange}  checked = {paymentMethod.offlinePayment} />
                <span>Thanh toán khi nhận hàng</span>
            </div>
            <div className = {styles["momo"]}>
                <input name = "onlinePayment" type="radio" id="myCheck" onChange = {handlePaymentMethodChange} checked = {paymentMethod.onlinePayment} />
                <span>Thanh toán qua ví momo</span>
            </div>
        </div>
    </div>
    {/* Order information */}
    <div className = {styles["second-block"]}>
        <button name = "offlineReceiving" className = {deliveryMethod.offlineReceiving  ? styles.currentDeliveryMethod : styles.anotherDeliveryMethod} onClick = {handleDeliveryMethodChange}>
            Nhận trực tiếp tại cửa hàng
        </button>
        <div className= {styles.deliveryInformation}>
            <div className={styles.information}>
                    Thông tin đơn hàng 
            </div>
            <div className = {styles["select-stores"]}>
                <StoreIcon className = {styles["store-icon"]}/>
                <select name="stores" id="my-select"  onChange = {handleStoreAddressChange}>
                    <option className = {styles["option-placeholder"]} disabled selected hidden>Chọn cửa hàng</option>
                    <option >
                    53H Nguyễn Du, Phường Bến Nghé, Quận 1, TP.HCM.
                    </option>
                    <option >
                    37Bis Mạc Đĩnh Chi, Phường Đa Kao, Quận 1, TP.HCM.
                    </option>
                    <option >
                    267-269 Lê Thánh Tôn, Phường Bến Thành, Quận 1, TP.HCM.
                    </option>
                    <option >
                    IMC Tower, 62 Trần Quang Khải, Phường Tân Định, Quận 1, TP.HCM.
                    </option>
                    <option >
                    107A Trương Định, Phường Võ Thị Sáu, Quận 3, TP.HCM.
                    </option>
                    <option >
                    45 Tú Xương, Phường Võ Thị Sáu, Quận 3, TP.HCM.
                    </option>
                    <option >
                    S26-1 Sky Garden, Phường Tân Phong, Quận 7, TP.HCM.
                    </option>
                    <option >
                    47 Dương Quang Đông, Phường 5, Quận 8, TP.HCM.
                    </option>
                    <option >
                    Số 1 Ấp Bắc, Phường 13, Quận Tân Bình, TP.HCM.
                    </option>
                    <option >
                    280A Hòa Bình, Phường Hiệp Tân, Quận Tân Phú, TP.HCM.
                    </option>
                    <option >
                    Số 6, Đường số 20, Phường Hiệp Bình Chánh, TP. Thủ Đức, TP.HCM.
                    </option>
                </select>
            </div>
             {/* my ordered cart */}
            <div className={styles.information}>
                 Giỏ hàng của bạn
            </div>
            {/* list ordered products */}
            {
                orderedProducts.map((productEl, index) => (
                <div className = {styles["orderedProducts"]}  key={index}>
                    <span className = {styles["product-quantity"]}>x {productEl.quantity}</span>
                    <div className = {styles["product-img"]}>
                        <img src={productEl.img} alt= "product-img" />
                    </div>
                    <div className = {styles["product-details"]}>
                        <span className = {styles["product-name"]}>{productEl.name}</span>
                        <span className = {styles["product-note"]}>{productEl.note}</span>
                        <span className = {styles["product-price"]}>{productEl.price}</span>
                    </div>
                    <div className = {styles["editQuantity"]}>
                        <button className = {styles["add-btn"]}  onClick={() => {dispatch(increaseQuantityAndPrice({ id: index }))}}>
                            <AddButton className={styles["add-icon"]} />
                        </button>
                        <button className = {styles["decrease-btn"]} onClick={() => {dispatch(decreaseQuantityAndPrice({ id: index }))}}>
                            <DecreaseButton className={styles["decrease-icon"]} />
                        </button>
                    </div>
                </div>
                ))
            }
            {/* <div className = {styles["orderedProducts"]}>
                <span className = {styles["product-quantity"]}>x 3</span>
                <div className = {styles["product-img"]}>
                    <img src={testImg} alt= "product-img" />
                </div>
                <div className = {styles["product-details"]}>
                    <span className = {styles["product-name"]}>TCF Coffee</span>
                    <span className = {styles["product-note"]}>Nhiều bọt sữa, ngọt vừa</span>
                    <span className = {styles["product-price"]}>90.000 đ</span>
                </div>
                <div className = {styles["editQuantity"]}>
                    <button className = {styles["add-btn"]}>
                        <AddButton className={styles["add-icon"]} />
                    </button>
                    <button className = {styles["decrease-btn"]}>
                        <DecreaseButton className={styles["decrease-icon"]} />
                    </button>
                </div>
            </div> */}
            {/* voucher */}
            <div className = {styles["input-voucher"]}>
                <VoucherIcon className = {styles["voucher-icon"]}/>
                <input type="text"  placeholder = "Mã khuyến mãi"/>
            </div>
            {/* Total bills */}
            <div className={styles.information}>
                 Tổng đơn hàng
            </div>
            <div className={styles.totalBill}>
                <span className = {styles.totalQuantity}>Số lượng: {orderedProductsQuantity}</span>
                <div className={styles.detailPrice}>
                    <div>
                       <span>Tổng:</span>
                       <span className = {styles.totalProductPrice}>{orderProductsPrice}</span>
                    </div>
                    <div>
                       <span>Phí vận chuyển:</span>
                       <span className = {styles.shippingPrice}>20.000đ</span>
                    </div>
                    <div>
                       <span className = {styles.voucher}>Khuyến mãi:</span>
                    </div>
                    <div>
                       <span>Tổng cộng:</span>
                       <span className = {styles.totalPrice}>{totalBill}</span>
                    </div>
                </div>
            </div>
            {/* Notes */}
        </div>
         {/* Order Button */}
         <button className={styles.orderButton}>
                Đặt hàng
         </button>
    </div>
</div> 
}

export default PaymentForm;