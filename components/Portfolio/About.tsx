import Link from 'components/Elements/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function About() {
  return (
    <div className="about-bg">
      <div className="about">
        <div className="wrapper">
          <h2>About</h2>
          <p>
            I am a full-stack web developer specializing in building interactive websites and applications using the
            modern technologies (React, Next.js, Node, GraphQL).
          </p>
          <p>
            I have designed, built, and launched multiple personal projects currently used by thousands of people, so I
            know how to take responsibility for successfully building and delivering a product. I can find ways to
            contribute value to your company, resourcefully overcome obstacles, and solve technical problems without the
            need for supervision. I enjoy teaching and helping other people as well.
          </p>
          <p>
            I am experienced in (and passionate about) all parts of the web development process - generating ideas,
            establishing business objectives, making good technical decisions, designing and developing the prototype,
            managing and building the product, launching and marketing.
          </p>
          <p>
            I am looking for opportunities to work on meaningful projects in a small team of friendly and intelligent
            people, improve my skills, grow as a developer, and build some cool stuff with you!
          </p>
          <p>
            If you&apos;re interested in working with me, shoot me an email: <b>lumenwrites@gmail.com</b>
          </p>
          <p>(I can only accept work at a company that is able to sponsor a UK/US/Canadian work visa.)</p>
          <div className="social-icons">
            <a href="https://github.com/lumenwrites" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={['fab', 'github']} />
              GitHub
            </a>
            <Link href="/files/Vladislav%20Podchufarov%20CV.pdf" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={['fas', 'poll-h']} />
              Resume
            </Link>
            {/* <a href="https://www.linkedin.com/in/lumenwrites" className="fab fa-linkedin-in cv" target="_blank"></a> */}
            {/* <a href="https://angel.co/u/lumenwrites" className="fab fa-angellist cv" target="_blank"></a> */}
          </div>
        </div>
      </div>
    </div>
  )
}
