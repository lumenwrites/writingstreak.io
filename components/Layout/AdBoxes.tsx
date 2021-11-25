import Image from 'next/image'

export default function AdBoxes() {
  return (
    <div className="post-grid showcase-boxes">
      <AdBox
        title="Prompts App"
        description="A large collection of prompts that will help you to write or improvise adventures. Adventure ideas, antagonists, settings, challenges - everything you need!"
        href="https://perchance.org/adventure-prompts"
        image={'/img/writing-desk.jpg'}
      />
      <AdBox
        title="Adventure Writing Academy"
        description="Learn to Create Awesome Adventures for Tabletop Roleplaying Games! Read the course that summarizes everything I have learned about creating adventures."
        href="/course/first-person-shooter"
        image={'/img/valley.jpg'}
      />
      <AdBox
        title="Adventure Writers&apos; Room"
        description="Join our Discord community! We are a group of people who love creating adventures for tabletop roleplaying games, we help each other to brainstorm ideas and create stories for our players to enjoy."
        href="https://discord.gg/JZmXfWD85D"
        image={'/img/logo-book.png'}
      />
    </div>
  )
}

var AdBox = ({ title, description, href, image }) => {
  // showcase-box because when it's named ad-box it gets blocked by ad blockers
  return (
    <a className="card showcase-box" href={href} target="_blank" rel="noopener noreferrer">
      
      <Image src={image} width={320} height={180} layout="responsive" objectFit="cover" />
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
