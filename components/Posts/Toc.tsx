function Toc({ toc }) {
  return (
    <div>
      <h5>On This Page</h5>
      {toc.map((item) => (
        <h4 key={item.slug} className={``}>
          <a href={`#${item.slug}`}>
            {item.title}
          </a>
        </h4>
      ))}
    </div>
  )
}

export default Toc
