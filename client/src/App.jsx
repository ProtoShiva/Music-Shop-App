import React from "react"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import LoginPage from "./pages/LoginPage/LoginPage"
import RegisterPage from "./pages/RegisterPage/RegisterPage"
import HomePage from "./pages/HomePage/HomePage"
import ProductPage from "./pages/ProductPage/ProductPage"
import { UserContextProvider } from "./context/UserContext.jsx"
import MyCartPage from "./pages/MyCartPage/MyCartPage.jsx"
import CheckOutPage from "./pages/CheckOutPage/CheckOutPage.jsx"
import SuccessPage from "./pages/SuccessPage/SuccessPage.jsx"
import InvoicePage from "./pages/InvoicePage/InvoicePage.jsx"
import FinalinvoicePage from "./pages/FinalInvoicePage/FinalinvoicePage.jsx"
import PrivateRoute from "./components/PrivateRoute.jsx"

const App = () => {
  return (
    <>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/sign-in" element={<LoginPage />} />
            <Route path="/ProductPage/:id" element={<ProductPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/mycart" element={<MyCartPage />} />
              <Route path="/checkout" element={<CheckOutPage />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/invoices" element={<InvoicePage />} />
              <Route path="/finalInvoice/:id" element={<FinalinvoicePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </>
  )
}

export default App
