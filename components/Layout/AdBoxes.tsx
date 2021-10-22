export default function AdBoxes() {
  return (
    <div className="post-grid">
      <AdBox
        title="Godot Assets"
        description="Buy and Sell Godot Assets at our Marketplace"
        href="https://godotassets.io"
        image={'https://godotassets.io/social.jpg'}
      />
      <AdBox
        title="Godot Assets"
        description="Buy and Sell Godot Assets at our Marketplace"
        href="https://godotassets.io"
        image={'https://godotassets.io/social.jpg'}
      />
      <AdBox
        title="Godot Assets"
        description="Buy and Sell Godot Assets at our Marketplace"
        href="https://godotassets.io"
        image={'https://godotassets.io/social.jpg'}
      />
    </div>
  )
}

var AdBox = ({ title, description, href, image }) => {
  return (
    <a className="post-card ad-box" href={href} target="_blank" rel="noopener noreferrer">
      <div className="image-wrapper">
        <div className="thumbnail" style={{ background: `url('${image}')` }} />
      </div>
      <section className="description">
        <div className="title">{title}</div>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </section>
    </a>
  )
}
