import Image from 'next/image'

export default function ProjectCard({ title, href, img, children, tags }) {
  return (
    <div className="project image-wrapper-square">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <Image src={img} width={160} height={90} layout="responsive" objectFit="cover" />
      </a>
      <div className="description">
        <a href={href} target="_blank" rel="noopener noreferrer" className="title">
          <h2>{title}</h2>
        </a>
        {children}
      </div>
      {/* <div className="footer">
        <div className="tags">
          {tags?.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div> */}
    </div>
  )
}
