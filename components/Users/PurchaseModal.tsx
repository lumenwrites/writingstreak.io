// https://stripe.com/docs/stripe-js/react
// Accept payments: https://stripe.com/docs/payments/accept-a-payment-charges
// Stripe elements react: https://stripe.com/docs/stripe-js/react
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
// https://plausible.io/docs/nextjs-integration
import { usePlausible } from 'next-plausible'
import axios from 'axios'
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import toc from 'backend/json/adventure-academy/toc.json'
import config from 'config.json'

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
  const plausible = usePlausible()

  const handleSubmit = async (event) => {
    event.preventDefault() // Block native form submission.
    if (!stripe || !elements) return // Stripe.js has not loaded yet.
    setStatus({ state: 'loading', message: '' })
    plausible('puchaseAttempt')
    // Check whether the user with this email has already made a purchase.
    const { data: emailCheck } = await axios.post('/api/payments/check-valid-email', { email })
    if (emailCheck.error) return setStatus({ state: 'error', message: emailCheck.error })
    // Create payment intent
    const { data } = await axios.post('/api/payments/get-payment-intent', { email })
    if (data.error) return setStatus({ state: 'error', message: data.error })
    // Use payment intent to charge the card
    const paymentResponse = await stripe.confirmCardPayment(data.paymentIntentSecert, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: { email }, // This adds an email into the "customer" column in dashboard
      },
    })
    if (paymentResponse.error) return setStatus({ state: 'error', message: paymentResponse.error.message })
    if (paymentResponse.paymentIntent.status === 'succeeded') {
      const { data } = await axios.post('/api/payments/purchase-successful', { email }) // Add user's email to the database
      Cookies.set('token', data.token) // Save a login cookie
      setStatus({ state: 'success', message: `` }) // Show them "Thank you for your purchase" modal
    }
  }

  if (status.state === 'success') {
    const firstChapterUrl = `/${toc[0].slug}/${toc[0].chapters[0].slug}`
    return (
      <Modal name={`purchase`} className={'login-modal narrow'}>
        <h2>Purchase Successful!</h2>
        <p>Thank you for buying this course!</p>
        <a href={firstChapterUrl} className="btn btn-cta-landing" onClick={() => toggleModal('')}>
          Go To Course
          <FontAwesomeIcon icon={['fas', 'arrow-right']} />
        </a>
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
        <SpinnerButton isloading={status.state === 'loading'} type="submit" disabled={!stripe}>
          Start Learning Now! (${config.price})
        </SpinnerButton>
        <div className="disclaimer">
          <p>Secure payments powered by Stripe. 30-day money back guarantee.</p>
        </div>
      </form>
    </Modal>
  )
}

const cardElementOptions = {
  style: {
    base: {
      fontSize: '14px',
      color: '#3C4257',
      fontFamily: '"Open Sans","Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      padding: '12px',
      lineHeight: '32px',
      '::placeholder': {
        color: '#464c61',
      },
      // backgroundColor: '#181d29',
    },
    complete: {
      fontSize: '14px',
      color: '#3C4257',
      fontFamily: '"Open Sans","Helvetica Neue", Helvetica, sans-serif',
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
