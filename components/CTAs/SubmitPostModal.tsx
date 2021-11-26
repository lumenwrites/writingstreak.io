import Modal from 'components/Elements/Modal'

export default function SubmitPostModal() {
  return (
    <Modal name={`submit-post`} className={'login-modal narrow'}>
      <h2>Submit Post</h2>
      <p>
        This project is still in beta, and posting here is invite-only. If you have a post you think will be valuable to
        our community - send the link to <b>lumenwrites@gmail.com</b>
      </p>
      <h3>Why post here?</h3>
      <ul>
        <li>Engage with our awesome community, share your knowledge, receive feedback and advice.</li>
        <li>Showcase your projects and ideas, grow your audience.</li>
        <li>
          Crossposting is allowed. If you want to publish an article from your own website or a blog - it will have a
          prominent link to the original post (sending you some traffic), and a canonical url (giving you a SEO boost).
        </li>
        <li>
          The best posts are sent out to our newsletter and shared on our <a className="bold" href="https://twitter.com/lumenwrites">twitter account</a>.
        </li>
      </ul>
    </Modal>
  )
}
