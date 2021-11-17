import ProjectCard from './ProjectCard'

export default function Projects() {
  return (
    <div className="projects">
      <div className="wrapper">
        <ProjectCard
          title="Webdev Portfolio"
          href={'https://lumenwrites.dev'}
          img={'/projects/lumenwrites.dev.png'}
          tags={['react', 'redux', 'node', 'express']}
        >
          <p>My full webdev portfolio.</p>
        </ProjectCard>
        <ProjectCard
          title="Godot Academy"
          href={'https://godotacademy.io'}
          img={'/projects/godotacademy.png'}
          tags={['next.js (static generation)', 'mdx', 'vercel', 'stripe']}
        >
          <p>Godot Engine tutorials and courses.</p>
        </ProjectCard>
        <ProjectCard
          title="RPG Adventures"
          href={'https://rpgadventures.io'}
          img={'/projects/rpgadventures.jpg'}
          tags={['next.js (static generation)', 'mdx', 'vercel', 'stripe']}
        >
          <p>
            Adventures for table-top roleplaying games, and my{' '}
            <a href="https://rpgadventures.io/course/adventure-academy" target="_blank" rel="noopener noreferrer">
              adventure writing course
            </a>
            .
          </p>
        </ProjectCard>
        <ProjectCard
          title="Godot Assets"
          href={'https://godotassets.io'}
          img={'/projects/godotassets.jpg'}
          tags={['next.js', 'react', 'aws', 'prisma', 'vercel', 'stripe']}
        >
          <p>A marketplace for Godot assets.</p>
        </ProjectCard>
        <ProjectCard
          title="Digital Art"
          href={'http://artstation.com/lumenwrites'}
          img={'/projects/digital-art.png'}
          tags={['houdini', 'maya', 'photoshop', 'affinity']}
        >
          <p>Digital Art I&apos;m creating.</p>
        </ProjectCard>

        <ProjectCard
          title="Writing Streak"
          href={'https://writingstreak.io'}
          img={'/projects/writingstreak.png'}
          tags={['react', 'redux', 'node', 'express']}
        >
          <p>An app that helps writers to be more productive and develop a consistent writing habit.</p>
        </ProjectCard>
        <ProjectCard
          title="Nulis"
          href={'https://nulis.io'}
          img={'/projects/nulis.png'}
          tags={['react', 'redux', 'node', 'express']}
        >
          <p>A mind-mapping tool for writers, an app for collecting and organizing knowledge.</p>
        </ProjectCard>

        {/* <ProjectCard
          title="Digital Mind"
          href={'https://digitalmind.io'}
          img={'/projects/digitalmind.png'}
          tags={['next.js (static generation)', 'mdx', 'vercel', 'stripe']}
        >
          <p>My Machine Learning notes.</p>
        </ProjectCard> */}
      </div>
    </div>
  )
}
