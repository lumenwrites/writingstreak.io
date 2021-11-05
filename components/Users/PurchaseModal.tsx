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
import config from 'config.json'

import { useModal } from 'context/ModalContext'
import Modal from 'components/Elements/Modal'
import Link from 'components/Elements/Link'
import SpinnerButton from 'components/Elements/SpinnerButton'
import MessagePanel from 'components/Elements/MessagePanel'
import * as fbq from 'backend/fpixel'

export default function PurchaseModal({ successLink }) {
  const router = useRouter()
  const stripe = useStripe()
  const elements = useElements()
  const { toggleModal } = useModal()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ state: '', message: '' })
  const plausible = usePlausible()
  const [discount, setDiscount] = useState({ status: '', code: '' })
  function discountChange(e) {
    setDiscount((prev) => {
      const code = e.target.value
      let status = ''
      if (code.length) {
        status = ['free', 'halfprice2021'].includes(code) ? 'success' : 'fail'
      }
      return { status, code }
    })
  }
  const handleSubmit = async (event) => {
    event.preventDefault() // Block native form submission.
    if (!stripe || !elements) return // Stripe.js has not loaded yet.
    setStatus({ state: 'loading', message: '' })
    // Analytics
    plausible('puchaseAttempt')
    fbq.event('Purchase', { currency: 'USD', value: 40 })
    // Check whether the user with this email has already made a purchase.
    const { data: emailCheck } = await axios.post('/api/payments/check-valid-email', { email })
    if (emailCheck.error) return setStatus({ state: 'error', message: emailCheck.error })
    if (discount.code === 'free') {
      const { data } = await axios.post('/api/payments/purchase-successful', { email, discountCode: discount.code }) // Add user's email to the database
      Cookies.set('token', data.token) // Save a login cookie
      setStatus({ state: 'success', message: `` }) // Show them "Thank you for your purchase" modal
      return
    }
    // Create payment intent
    const { data } = await axios.post('/api/payments/get-payment-intent', { email, discountCode: discount.code })
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
      const { data } = await axios.post('/api/payments/purchase-successful', { email, discountCode: discount.code }) // Add user's email to the database
      Cookies.set('token', data.token) // Save a login cookie
      setStatus({ state: 'success', message: `` }) // Show them "Thank you for your purchase" modal
    }
  }

  if (status.state === 'success') {
    return (
      <Modal name={`purchase`} className={'purchase-modal narrow'}>
        <h2>Purchase Successful!</h2>
        <p>Thank you for buying this course!</p>
        <a href={successLink} className="btn btn-cta-landing" onClick={() => toggleModal('')}>
          Go To Course
          <FontAwesomeIcon icon={['fas', 'arrow-right']} />
        </a>
      </Modal>
    )
  }
  let price = config.price
  if (discount.code === 'free') price = 0
  if (discount.code === 'halfprice2021') price /= 2
  return (
    <Modal name={`purchase`} className={'purchase-modal narrow'}>
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
        <input
          placeholder="Discount code..."
          name="discount"
          className={`discount ${discount.status}`}
          value={discount.code}
          onChange={discountChange}
          disabled={status.state === 'loading'}
        />
        {discount.code !== 'free' && (
          <div className="stripe-card">
            <CardElement options={cardElementOptions} />
          </div>
        )}
        <SpinnerButton isloading={status.state === 'loading'} type="submit" disabled={!stripe}>
          Start Learning Now! (${price})
        </SpinnerButton>
        <div className="disclaimer">
          <p>Secure payments powered by Stripe. 30-day money back guarantee.</p>
        </div>
      </form>
      <DiscountOffers />
    </Modal>
  )
}

function DiscountOffers() {
  return (
    <div className="discount-offers">
      <hr />
      <h3>Get this Course at Half Prcie</h3>
      <p>
        To get a 50% discount code for this course - share it on social media, and send a link to your post to{' '}
        <b>lumenwrites@gmail.com</b>
      </p>
      <p>In return, I will send you a discount code you can use to get this course at half price.</p>
      <hr />
      <h3>Get this Course for Free</h3>
      <div className="disclaimer">(limited-time offer)</div>
      <p>I will grant you free access to this course if you proimse to:</p>
      <ul>
        <li>Complete this course to the best of your ability.</li>
        <li>Send me some constructive and thoughtful feedback.</li>
        <li>Write an honest review of this course on your blog.</li>
        <li>Share it on social media.</li>
      </ul>
      <p>
        Send an email to <b>lumenwrites@gmail.com</b> if you&apos;re interested!
      </p>
    </div>
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
