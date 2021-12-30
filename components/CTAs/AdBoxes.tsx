import Image from 'next/image'

export default function AdBoxes() {
  return (
    <div className="showcase-boxes">
      <AdBox
        title="Join our Discord"
        description="Get to know other Writing Streak users, find writing buddies, form writing groups, exchange writing feedback and advice."
        href="https://discord.gg/Mc4HKUsuK9"
        image={'/showcase-boxes/discord.png'}
      />
      <AdBox
        title="Our Ultimate Writing Guide"
        description="This course that will guide you through your first 30 days of writing and help you to develop a writing habit."
        href="/course/novice-to-prolific"
        image={'/showcase-boxes/course.png'}
      />
      <AdBox
        title="Writing Streak on Twitter"
        description="Follow the twitter account where I share updates on this project as well as practical writing tips and advice."
        href="https://twitter.com/lumenwrites"
        image={'/showcase-boxes/twitter.png'}
      />
      {/* <AdBox
        title="Follow us on Twitter"
        description="Receive updates on this project and our best posts, as well as insightful ideas and actionable advice on building and growing your projects."
        href="https://twitter.com/lumenwrites"
        image={'/showcase-boxes/twitter.png'}
      /> */}
    </div>
  )
}

var AdBox = ({ title, description, href, image }) => {
  // showcase-box because when it's named ad-box it gets blocked by ad blockers
  return (
    <a className="card showcase-box" href={href} target="_blank" rel="noopener noreferrer">
      <div className="thumbnail-image">
        <Image src={image} width={320} height={180} layout="responsive" objectFit="cover" />
      </div>
      {/* <div className="image-wrapper">
        <div className="thumbnail" style={{ background: `url('${image}')` }} />
      </div> */}
      <section className="description">
        <div className="title">{title}</div>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </section>
    </a>
  )
}
