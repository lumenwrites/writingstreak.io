import axios from 'axios'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import domtoimage from 'retina-dom-to-image'
import { saveAs } from 'file-saver'

export default function PublishButtons({ post, title, editor, tags }) {
  if (!editor) return null
  return (
    <div className="publish-buttons">
      <div className="left">
        <div className="dropdown">
          <button className="btn menu-handle">
            <FontAwesomeIcon icon={['fas', 'cog']} />
          </button>
          <div className="menu">
            <CaptureImages title={title} />
            <DeletePostButtons post={post} />
          </div>
        </div>
      </div>
      <div className="right">
        {/* <Stats editor={editor} /> */}
        {post ? (
          <UpdatePostButtons post={post} title={title} editor={editor} tags={tags} />
        ) : (
          <CreatePostButtons title={title} editor={editor} tags={tags} />
        )}
      </div>
    </div>
  )
}

function CreatePostButtons({ title, editor, tags }) {
  const router = useRouter()
  async function createPost() {
    const post = {
      title: title,
      body: editor.getHTML(),
      description: descriptionFromHTML(editor.getHTML()),
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

function UpdatePostButtons({ post, title, editor, tags }) {
  async function updatePost(published) {
    const updatedPost = {
      slug: post.slug,
      title: title,
      body: editor.getHTML(),
      description: descriptionFromHTML(editor.getHTML()),
      tags: tags,
      published,
    }
    console.log('Updating Post', updatedPost)
    const { data } = await axios.post('/api/posts/update', updatedPost)
    console.log('Updated Post', data)
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
      <button className="btn btn-cta" onClick={() => updatePost(post.published)}>
        <FontAwesomeIcon icon={['fas', 'save']} />
        Save Post
      </button>
    </>
  )
}

function DeletePostButtons({ post }) {
  const router = useRouter()
  async function deletePost() {
    console.log('Deleting Post', post.slug)
    const { data } = await axios.post('/api/posts/delete', { slug: post.slug })
    console.log('Deleted Post', data)
    router.push(`/`)
  }
  return (
    <button className="btn item" onClick={deletePost}>
      <FontAwesomeIcon icon={['fas', 'trash-alt']} />
      Delete Post
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
      <button className="btn item" onClick={captureTwitterImage}>
        <FontAwesomeIcon icon={['fas', 'camera']} />
        Twitter Image
      </button>
      <button className="btn item" onClick={captureSocialImage}>
        <FontAwesomeIcon icon={['fas', 'camera']} />
        Social Image
      </button>
    </>
  )
}

function descriptionFromHTML(html) {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = html
  const firstElement = wrapper.firstChild as HTMLElement
  let description = firstElement.innerText.substring(0, 140)
  return description
}
