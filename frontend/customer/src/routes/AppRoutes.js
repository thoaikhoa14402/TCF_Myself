import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../layouts/Layout";
import AuthenLayout from "../layouts/AuthenLayout/AuthenLayout";
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import VoucherPage from "../pages/VoucherPage";
import StoresPage from "../pages/StoresPage";
import ContactPage from "../pages/ContactPage";
import LoginPage from "../pages/AuthenticationPages/LoginPage";
import RegisterPage from "../pages/AuthenticationPages/RegisterPage";
import ForgotPasswordPage from "../pages/AuthenticationPages/ForgotPasswordPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import SuccessRegisterForm from "../components/Authentication/Register/SuccessRegisterForm";
import SuccessChangePassword from "../components/Authentication/ForgotPassword/SuccessChangePassword";
import ConfirmLetter from "../components/Authentication/ForgotPassword/ConfirmLetter";
import NewPassword from "../components/Authentication/ForgotPassword/NewPassword";

// react query
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const AppRoutes = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* Public Routes */}
        <Route element={<Layout />}>
          <Route path="/home-page" exact element={<HomePage />} />
          <Route path="/products-page" element={<ProductsPage />}>
            <Route path=":category" element={<></>}></Route>
          </Route>
          <Route path = "/payment-page" element = {<PaymentPage/>}/>
          <Route path="/vouchers" element={<VoucherPage />} />
          <Route path="/stores" element={<StoresPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          {/* Authentication Routes */}
          <Route path="/account" element={<AuthenLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            {/* test success register form */}
            <Route
              path="success-register-form"
              element={<SuccessRegisterForm />}
            />
            {/* test confirm letter form */}
            <Route path="new-password" element={<NewPassword />} />
            {/* test new password form */}
            <Route path="confirm-letter" element={<ConfirmLetter />} />
            {/* test success change password form */}
            <Route
              path="success-change-password-form"
              element={<SuccessChangePassword />}
            />
          </Route>
        </Route>
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<>Hello World</>}></Route>
        </Route>
        {/* All paths */}
        <Route path="*" element={<Navigate to="/home-page" />} />
      </Routes>
    </QueryClientProvider>
  );
};

export default AppRoutes;
