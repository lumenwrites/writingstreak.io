import axios from 'axios'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import domtoimage from 'retina-dom-to-image'
import { saveAs } from 'file-saver'
import { useEditorInfo } from 'context/EditorContext'

export default function PublishButtons({ post, saved }) {
  return (
    <div className="publish-buttons">
      <div className="left">
        <div className="dropdown">
          <button className="btn menu-handle">
            <FontAwesomeIcon icon={['fas', 'cog']} />
          </button>
          <div className="menu">
            <CaptureImages />
            <DeletePostButtons post={post} />
          </div>
        </div>
      </div>
      <div className="right">
        {post ? (
          <UpdatePostButtons post={post} saved={saved} />
        ) : (
          <CreatePostButtons />
        )}
      </div>
    </div>
  )
}

function CreatePostButtons() {
  const { editorInfo, setEditorInfo } = useEditorInfo()
  const router = useRouter()
  async function createPost() {
    const post = {
      title: editorInfo.title,
      body: editorInfo.html,
      description: descriptionFromHTML(editorInfo.html),
      tags: editorInfo.tags,
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

function UpdatePostButtons({ post, saved }) {
  const { editorInfo, setEditorInfo } = useEditorInfo()
  async function updatePost(published) {
    const updatedPost = {
      slug: post.slug,
      title: editorInfo.title,
      body: editorInfo.html,
      description: descriptionFromHTML(editorInfo.html),
      tags: editorInfo.tags,
      published,
    }
    const { data: savedPost } = await axios.post('/api/posts/update', updatedPost)
    console.log('Updated Post', savedPost)
    const day = {
      targetWordCount: editorInfo.targetWordCount,
      wordCount: editorInfo.wordCount,
      writingTime: editorInfo.writingTime,
    }
    const { data: savedDay } = await axios.post('/api/stats/save-day', day)
    console.log('Saved stats', savedDay)
  }
  async function togglePublished() {
    // setEditorInfo((prev) => { })
    console.log('unpublish', editorInfo)
    await updatePost(!post.published)
    window.location.reload()
  }
  return (
    <>
      <button className="btn btn-cta" onClick={togglePublished}>
        {post.published ? 'Unpublish' : 'Publish'}
      </button>
      {saved ? (
        <button className="btn btn-cta disabled" disabled>
          <FontAwesomeIcon icon={['fas', 'save']} />
          Saved
        </button>
      ) : (
        <button className="btn btn-cta" onClick={() => updatePost(post.published)} id="save-post">
          <FontAwesomeIcon icon={['fas', 'save']} />
          Save Post
        </button>
      )}
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

// function Stats({ editor }) {
//   const wordCount = editor.state.doc.textContent.split(' ').length
//   const height = document.getElementById('twitter-image').clientHeight + 20 // +20 because on rendering theres extra padding
//   const imageSizeLeft = Math.floor((height / 1160) * 100)
//   return (
//     <>
//       <div className="btn">
//         <FontAwesomeIcon icon={['fas', 'pen-square']} />
//         {wordCount}
//       </div>
//       <div className="btn">
//         <FontAwesomeIcon icon={['fas', 'camera']} />
//         {imageSizeLeft}%
//       </div>
//     </>
//   )
// }

function CaptureImages() {
  const { editorInfo, setEditorInfo } = useEditorInfo()

  async function captureTwitterImage() {
    const positionImage = document.getElementById('position-image')
    const twitterImage = document.getElementById('render-image')
    positionImage.classList.add('capturing')
    const image = await domtoimage.toJpeg(twitterImage, { quality: 0.95 })
    positionImage.classList.remove('capturing')
    saveAs(image, `${editorInfo.title}.jpg`)
  }
  async function captureSocialImage() {
    const positionImage = document.getElementById('position-image')
    const croppedImage = document.getElementById('cropped-image')
    positionImage.classList.add('capturing-cropped')
    const image = await domtoimage.toJpeg(croppedImage, { quality: 0.95 })
    positionImage.classList.remove('capturing-cropped')
    saveAs(image, `${editorInfo.title} Social.jpg`)
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
