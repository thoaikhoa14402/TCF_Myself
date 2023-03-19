import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    deliveryInformation: {
        name: '',
        phoneNumber: '',
        userAddress: '',
        storeAddress: '',
        note: '',
        paymentMethod: {
            offlinePayment: false,
            onlinePayment: false
        },
        deliveryMethod: {
            onlineReceiving: true,
            offlineReceiving: false, 
        }
    },
    orderedProducts: [],
    totalBill: "0đ"
}

export const paymentSlice = createSlice({
    name: 'paymentInformation', 
    initialState,
    reducers: {
        setName: (state, action) => {
            state.deliveryInformation.name = action.payload;
        }, 
        setPhoneNumber: (state, action) => {
            state.deliveryInformation.phoneNumber = action.payload;
        },
        setUserAddress: (state, action) => {
            state.deliveryInformation.userAddress = action.payload;
        },
        setStoreAddress: (state,action) => {
            state.deliveryInformation.storeAddress = action.payload;
        },
        setNote: (state, action) => {
            state.deliveryInformation.note = action.payload;
        },
        setPaymentMethod: (state, action) => {
            const {onlinePayment, offlinePayment} = action.payload;
            state.deliveryInformation.paymentMethod = {
                ...state.deliveryInformation.paymentMethod,
                onlinePayment: onlinePayment,
                offlinePayment: offlinePayment
            }
        },
        setDeliveryMethod: (state, action) => {
            const {onlineReceiving, offlineReceiving} = action.payload;
            state.deliveryInformation.deliveryMethod = {
                ...state.deliveryInformation.deliveryMethod,
                onlineReceiving: onlineReceiving,
                offlineReceiving: offlineReceiving,
            };
        },
    }
})

export const {setName, setPhoneNumber, setUserAddress, setStoreAddress, setNote,  setPaymentMethod, setDeliveryMethod} = paymentSlice.actions;

export default paymentSlice.reducer;