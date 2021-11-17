import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Skills() {
  return (
    <div className="skills">
      <div className="wrapper">
        <div className="skill">
          <FontAwesomeIcon className="skill-icon" icon={['fas', 'laptop-code']} />
          <h2>Frontend</h2>
          HTML/CSS/JS, TypeScript, React/Redux, jQuery, Sass, Bootstrap/Foundation, UI/UX Design in Figma.
        </div>
        <div className="skill">
          <FontAwesomeIcon className="skill-icon" icon={['fas', 'server']} />
          <h2>Backend</h2>
          Next.js, Node/Express, Python/Django, REST APIs, GraphQL, Apollo, Nexus, <br/>
          Prisma, SQL, MongoDB, Postgres.
        </div>
        <div className="skill">
          <FontAwesomeIcon className="skill-icon" icon={['fas', 'tools']} />
          <h2>Tools</h2>
          AWS, Vercel, Digital Ocean, Linux, <br/>
          Git, Webpack, Docker, Nginx, <br/>
          Stripe, Sendgrid.
          {/* Jest/Enzyme. Python, Java, SQL. */}
        </div>
        <div className="skill">
          <FontAwesomeIcon className="skill-icon" icon={['fas', 'lightbulb']} />
          <h2>Other</h2>
          2D and 3D Art and Graphic Design,
          Technical Writing, Internet Marketing,
          Machine Learning Libraries
        {/* (scikit-learn, pandas, keras, etc.) */}
          {/* Product management, Business skills */}
        </div>
      </div>
    </div>
  )
}
