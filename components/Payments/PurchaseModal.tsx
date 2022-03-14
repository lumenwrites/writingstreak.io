// https://stripe.com/docs/stripe-js/react
// Accept payments: https://stripe.com/docs/payments/accept-a-payment-charges
// Stripe elements react: https://stripe.com/docs/stripe-js/react
import { CardElement, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import { useAuth } from 'context/AuthContext'
import { useModal } from 'context/ModalContext'
import { useNotification } from 'context/NotificationContext'

import Modal from 'components/Elements/Modal'

// https://stripe.com/docs/stripe-js/react#elements-provider
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_CLIENT_SECRET)

export default function PurchaseModal() {
  const router = useRouter()
  const { toggleModal } = useModal()

  const options = {
    // passing the client secret obtained in step 2
    clientSecret: '{{CLIENT_SECRET}}',
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  }
  return null
  return (
    <Elements stripe={stripePromise} options={options}>
      <Modal name={`purchase`} className={'login-modal narrow'}>
        <h1>Purchase</h1>
        <PaymentForm />
      </Modal>
    </Elements>
  )
}

function PaymentForm() {
  const stripe = useStripe()
  const elements = useElements()

  const [status, setStatus] = useState({ state: '', message: '' })

  async function submitForm(event) {
    event.preventDefault()
    if (!stripe || !elements) return // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
    setStatus({ state: 'loading', message: '' })

    const { error } = await stripe.confirmPayment({
      elements, //`Elements` instance that was used to create the Payment Element
      confirmParams: { return_url: 'https://my-site.com/order/123/complete' },
    })
    if (error) return setStatus({ state: 'error', message: error.message })
    // Your customer will be redirected to your `return_url`. For some payment
    // methods like iDEAL, your customer will be redirected to an intermediate
    // site first to authorize the payment, then redirected to the `return_url`.
  }

  return (
    <>
      <PaymentElement />
      <button className="btn btn-cta" onClick={submitForm}>
        Checkout ($10/mo)
      </button>
    </>
  )
}
