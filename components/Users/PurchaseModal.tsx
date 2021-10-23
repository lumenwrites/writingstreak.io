// https://stripe.com/docs/stripe-js/react
// Accept payments: https://stripe.com/docs/payments/accept-a-payment-charges
// Stripe elements react: https://stripe.com/docs/stripe-js/react
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from 'js-cookie'

import { useModal } from 'context/ModalContext'
import Modal from 'components/Elements/Modal'
import Link from 'components/Elements/Link'
import SpinnerButton from 'components/Elements/SpinnerButton'
import MessagePanel from 'components/Elements/MessagePanel'

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
    console.log('Successful payment!')
    // Add user's email to the database
    const { data } = await axios.post('/api/users/signup', { email })
    console.log('[PurchaseModal] Create user response', data)
    if (data.error) return setStatus({ state: 'error', message: data.error })
    // Save a login cookie
    Cookies.set('token', data.token)
    // Show them "Thank you for your purchase" with a button taking them to the course
    setStatus({ state: 'success', message: `` })
    // window.location.href += '?paymentSuccessful=true'
  }
  const handleSubmit = async (event) => {
    event.preventDefault() // Block native form submission.
    if (!stripe || !elements) return // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
    setStatus({ state: 'loading', message: '' })
    // Create payment intent
    const { data } = await axios.post('/api/payments/get-payment-intent', { email })
    if (data.error) return setStatus({ state: 'error', message: data.error })
    // Use payment intent to charge the card
    const paymentResponse = await stripe.confirmCardPayment(data.paymentIntentSecert, {
      payment_method: {
        card: elements.getElement(CardElement),
        // This adds an email into the "customer" column in the stripe payments dashboard
        // But to pass email to webhook you have to do this in metadata when creating payment intend on backend (I think)
        billing_details: { email },
      },
    })
    if (paymentResponse.error) return setStatus({ state: 'error', message: paymentResponse.error.message })
    // The payment has been processed!
    if (paymentResponse.paymentIntent.status === 'succeeded') {
      console.log('Successful payment!')
      // Add user's email to the database
      const { data } = await axios.post('/api/users/signup', { email })
      console.log('[PurchaseModal] Create user response', data)
      if (data.error) return setStatus({ state: 'error', message: data.error })
      // Save a login cookie
      Cookies.set('token', data.token)
      // Show them "Thank you for your purchase" with a button taking them to the course
      setStatus({ state: 'success', message: `` })
    }
  }
  if (status.state === 'success') {
    return (
      <Modal name={`purchase`} className={'login-modal narrow'}>
        <h2>Purchase Successful!</h2>
        <p>Thank you for buying this course!</p>
        <Link href={`/section-slug/initial-setup`} className="btn btn-cta-landing" onClick={() => toggleModal('')}>
          Start Learning!
        </Link>
      </Modal>
    )
  }
  return (
    <Modal name={`purchase`} className={'login-modal narrow'}>
      <h2>Adventure Writing Academy</h2>
      <MessagePanel type={status.state} message={status.message} />
      <form onSubmit={handleSubmit}>
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
        <SpinnerButton isLoading={status.state === 'loading'} type="submit" disabled={!stripe}>
          Start Learning Now! ($20)
        </SpinnerButton>
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
      '::placeholder': {
        // color: '#464c61',
      },
    },
    complete: {
      fontSize: '16px',
      // color: 'white',
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
