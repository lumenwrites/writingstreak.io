// https://stripe.com/docs/stripe-js/react
// Accept payments: https://stripe.com/docs/payments/accept-a-payment-charges
// Stripe elements react: https://stripe.com/docs/stripe-js/react
import { CardElement, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

// import { useAuth } from 'context/AuthContext'
import { useModal } from 'context/ModalContext'
import { useNotification } from 'context/NotificationContext'

// import Error from 'components/Elements/Error'
import Modal from 'components/Elements/Modal'

export default function PurchaseModal() {
  const user = {}
  const post = {}
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { setNotification } = useNotification()
  const { toggleModal } = useModal()
  useEffect(() => {
    if (router.query.paymentSuccessful) {
      toggleModal('download-files')
      setNotification('Payment Successful! Asset files are sent to your email.')
    }
  }, [])

  const stripe = useStripe()
  const elements = useElements()
  // const { user } = useAuth()
  const [error, setError] = useState('')

  async function testSuccessfulPayment(event) {
    event.preventDefault()
    // Add the post to the user's library
    // const { data } = await axios.post('/api/payments/purchase-post', { slug: post.slug })
    window.location.href += '?paymentSuccessful=true'
  }
  const handleSubmit = async (event) => {
    event.preventDefault() // Block native form submission.
    if (!stripe || !elements) return // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
    setLoading(true)
    // Create payment intent
    const { data } = await axios.post('/api/payments/get-payment-intent', { slug: post.slug })
    if (data.error) return setError(data.error) // just in case, no idea when it would trigger
    // Use payment intent to charge the card
    const result = await stripe.confirmCardPayment(data.paymentIntentSecert, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: { email: user.email },
        metadata: {
          buyerEmail: user.email,
          postId: post.id,
        },
      },
    })
    if (result.error) {
      console.log(result.error.message)
      setError(result.error.message)
      return
    }
    // The payment has been processed!
    if (result.paymentIntent.status === 'succeeded') {
      console.log('Successful payment!')
      // Add the post to the user's library
      const { data } = await axios.post('/api/payments/purchase-post', { slug: post.slug })
      // Reload the page so that "Buy" button turns into the "Download" button.
      window.location.href += '?paymentSuccessful=true'
      // toggleModal("")
      // TODO: Show a success message to your customer
      // There's a risk of the customer closing the window before callback
      // execution. Set up a webhook or plugin to listen for the
      // payment_intent.succeeded event that handles any business critical
      // post-payment actions.
    }
  }

  return (
    <Modal name={`purchase`} className={'login-modal narrow'}>
      {/* <Error error={error} /> */}
      <h2>Adventure Writing Academy</h2>
      <form onSubmit={handleSubmit}>
      <input
          placeholder="Your email..."
          name="email"
          autoComplete="on"
          value={""}
          onChange={()=>{}}
        />
        <div className="stripe-card">
          <CardElement options={cardElementOptions} />
        </div>
        {loading ? (
          <div className="btn btn-large btn-cta btn-spinner">
            <div className="flex-center">
              <div className="spinner" />
            </div>
          </div>
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
