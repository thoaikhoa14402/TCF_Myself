import PaymentForm from "../../components/PaymentForm/Payment";
import styles from "./PaymentPage.module.css";
const PaymentPage = (props) => {
    return <div className= {styles.container}>
        <PaymentForm/>
    </div>
}

export default PaymentPage;