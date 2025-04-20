'use client'

import PaymentNav from "./components/Nav";
import ProtectedRoute from "../Routes/ProtectedRoute";
import StripeForm from "./components/forms/Stripe";

const Payments = () => {

    const payments = (
        <>
           <ProtectedRoute>
            <StripeForm />
            <PaymentNav />
           </ProtectedRoute>
        </>
    )

    return payments;
}

export default Payments;