import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

  return (
    <Modal name={`purchase`} className={'login-modal narrow'}>
      <h1>Purchase</h1>
      <a className="btn btn-cta" href="/api/payments/create-checkout-session">
        <FontAwesomeIcon icon={['fas', 'arrow-circle-up']} />
        Upgrade ($20/mo)
      </a>
      <a className="btn btn-cta" href="/api/payments/create-customer-portal-session">
        Manage my Subscription
      </a>
    </Modal>
  )
}
