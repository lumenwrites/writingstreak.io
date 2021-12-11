import axios from 'axios'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import domtoimage from 'retina-dom-to-image'
import { saveAs } from 'file-saver'

export default function PublishButtons({ post, title, editor, tags }) {
  if (!editor) return null
  return (
    <div className="publish-buttons">
      {/* <CaptureImages title={title} />
      <Stats editor={editor} />
      <button className="btn btn-cta">
        <FontAwesomeIcon icon={['fas', 'cog']} />
      </button> */}
      {post ? (
        <UpdatePostButtons post={post} title={title} editor={editor} tags={tags} />
      ) : (
        <CreatePostButtons title={title} editor={editor} tags={tags} />
      )}
    </div>
  )
}
function UpdatePostButtons({ post, title, editor, tags }) {
  async function updatePost(published) {
    const updatedPost = {
      slug: post.slug,
      title: title,
      body: editor.getHTML(),
      tags: tags,
      published,
    }
    const { data } = await axios.post('/api/posts/update', updatedPost)
    console.log('Updated Post', updatedPost)
    // router.push(`/post/${data.post.slug}`)
  }
  async function togglePublished() {
    await updatePost(!post.published)
    window.location.reload()
  }
  return (
    <>
      <button className="btn btn-cta" onClick={togglePublished}>
        {post.published ? 'Unpublish' : 'Publish'}
      </button>
      <button className="btn btn-cta" onClick={updatePost}>
        <FontAwesomeIcon icon={['fas', 'save']} />
        Save Post
      </button>
    </>
  )
}

function CreatePostButtons({ title, editor, tags }) {
  const router = useRouter()
  async function createPost() {
    const post = {
      title: title,
      body: editor.getHTML(),
      tags: tags,
    }
    const { data } = await axios.post('/api/posts/create', post)
    console.log('Created Post', data)
    router.push(`/post/${data.post.slug}/edit`)
  }
  return (
    <button className="btn btn-cta" onClick={createPost}>
      Create Post
    </button>
  )
}

function Stats({ editor }) {
  const wordCount = editor.state.doc.textContent.split(' ').length
  const height = document.getElementById('twitter-image').clientHeight + 20 // +20 because on rendering theres extra padding
  const imageSizeLeft = Math.floor((height / 1160) * 100)
  return (
    <>
      <div className="btn">
        <FontAwesomeIcon icon={['fas', 'pen-square']} />
        {wordCount}
      </div>
      <div className="btn">
        <FontAwesomeIcon icon={['fas', 'camera']} />
        {imageSizeLeft}%
      </div>
    </>
  )
}

function CaptureImages({ title }) {
  async function captureTwitterImage() {
    const positionImage = document.getElementById('position-image')
    const twitterImage = document.getElementById('twitter-image')
    positionImage.classList.add('capturing')
    const image = await domtoimage.toJpeg(twitterImage, { quality: 0.95 })
    positionImage.classList.remove('capturing')
    saveAs(image, `${title}.jpg`)
  }
  async function captureSocialImage() {
    const positionImage = document.getElementById('position-image')
    const croppedImage = document.getElementById('cropped-image')
    positionImage.classList.add('capturing-cropped')
    const image = await domtoimage.toJpeg(croppedImage, { quality: 0.95 })
    positionImage.classList.remove('capturing-cropped')
    saveAs(image, `${title} Social.jpg`)
  }
  return (
    <>
      <button className="btn btn-cta" onClick={captureTwitterImage}>
        <FontAwesomeIcon icon={['fas', 'camera']} />
        Save Twitter Image
      </button>
      <button className="btn btn-cta" onClick={captureSocialImage}>
        <FontAwesomeIcon icon={['fas', 'camera']} />
        Save Social Image
      </button>
    </>
  )
}
