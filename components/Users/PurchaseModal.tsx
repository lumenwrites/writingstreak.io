// https://stripe.com/docs/stripe-js/react
// Accept payments: https://stripe.com/docs/payments/accept-a-payment-charges
// Stripe elements react: https://stripe.com/docs/stripe-js/react
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import { useModal } from 'context/ModalContext'
import { useNotification } from 'context/NotificationContext'

import Link from 'components/Elements/Link'
import Spinner from 'components/Elements/Spinner'
import MessagePanel from 'components/Elements/MessagePanel'
import Modal from 'components/Elements/Modal'

export default function PurchaseModal() {
  const router = useRouter()
  const stripe = useStripe()
  const elements = useElements()
  const { toggleModal } = useModal()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ state: '', message: '' })

  async function testSuccessfulPayment(event) {
    event.preventDefault()
    setStatus({ state: 'loading', message: '' })
    const { data } = await axios.post('/api/payments/get-payment-intent', { email })
    console.log('data', data)
    // setStatus({ state: 'loading', message: '' })
    // window.location.href += '?paymentSuccessful=true'
  }
  const handleSubmit = async (event) => {
    event.preventDefault() // Block native form submission.
    if (!stripe || !elements) return // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
    // Create payment intent
    const { data } = await axios.post('/api/payments/get-payment-intent')
    if (data.error) return setStatus({ state: 'error', message: data.error })
    // Use payment intent to charge the card
    const result = await stripe.confirmCardPayment(data.paymentIntentSecert, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: { email },
        metadata: { email },
      },
    })
    if (result.error) {
      console.log(result.error.message)
      setStatus({ state: 'error', message: result.error.message })
      return
    }
    // The payment has been processed!
    if (result.paymentIntent.status === 'succeeded') {
      console.log('Successful payment!')
      setStatus({ state: 'success', message: `` })
      // Add user's email to the database
      // Show them "Thank you for your purchase" with a button taking them to the course
      // Save a login cookie
    }
  }
  if (status.state === 'success') {
    return (
      <Modal name={`purchase`} className={'login-modal narrow'}>
        <h2>Purchase Successful!</h2>
        <p>Thank you for buying this course!</p>
        <Link href={`/section-slug/initial-setup`} className="btn btn-cta-landing" onClick={()=> toggleModal("")}>
          Start Learning!
        </Link>
      </Modal>
    )
  }
  return (
    <Modal name={`purchase`} className={'login-modal narrow'}>
      <h2>Adventure Writing Academy</h2>
      <MessagePanel type={status.state} message={status.message} />
      <form onSubmit={testSuccessfulPayment}>
        <input
          placeholder="Your email..."
          name="email"
          autoComplete="on"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          disabled={status.state === 'loading'}
        />
        <div className="stripe-card">
          <CardElement options={cardElementOptions} />
        </div>
        {status.state === 'loading' ? (
          <button className="btn btn-cta btn-large disabled" disabled>
            <Spinner />
          </button>
        ) : (
          <button className="btn btn-cta btn-large" type="submit" disabled={!stripe}>
            Start Learning Now! ($20)
          </button>
        )}
      </form>
    </Modal>
  )
}

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      // color: 'white',
      // backgroundColor: '#181d29',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      padding: '12px',
      lineHeight: '32px',
      border: '1px solid red',
      '::placeholder': {
        // color: '#464c61',
      },
    },
    complete: {
      fontSize: '16px',
      color: 'white',
      // backgroundColor: '#181d29',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      padding: '12px',
      lineHeight: '32px',
    },
    invalid: {
      color: '#f02849',
      iconColor: '#f02849',
    },
  },
}
