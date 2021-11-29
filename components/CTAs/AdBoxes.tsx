import Image from 'next/image'

export default function AdBoxes() {
  return (
    <div className="showcase-boxes">
      <AdBox
        title="Join the community of Makers"
        description="Startup founders, developers, designers, writers, people who use technology to build cool projects and turn them into profitable businesses."
        href="https://discord.gg/RS3PxFXBuz"
        image={'/showcase-boxes/discord.png'}
      />
      <AdBox
        title="Submit your Article"
        description="Learn more about writing for nexy - share your knowledge, spread your ideas, grow your audience."
        href="/write"
        image={'/showcase-boxes/write-for-us.png'}
      />
      <AdBox
        title="Your Project Here"
        description="Share your project with a community of smart people interested in startups and technology."
        href="/advertise"
        image={'/showcase-boxes/your-project-here.png'}
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
