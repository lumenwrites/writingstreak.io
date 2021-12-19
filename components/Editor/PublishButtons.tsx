import axios from 'axios'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import domtoimage from 'retina-dom-to-image'
import { saveAs } from 'file-saver'
import { useEditorContext } from 'components/Editor/Editor'

export default function PublishButtons() {
  const { editorValues, setValue } = useEditorContext()
  return (
    <div className="publish-buttons">
      <div className="left">
        <div className="dropdown">
          <button className="btn menu-handle">
            <FontAwesomeIcon icon={['fas', 'cog']} />
          </button>
          <div className="menu up">
            <CaptureImages />
            <DeletePostButtons />
          </div>
        </div>
      </div>
      <div className="right">{editorValues.postSlug ? <UpdatePostButtons /> : <CreatePostButtons />}</div>
    </div>
  )
}

function CreatePostButtons() {
  const { editorValues, setValue } = useEditorContext()
  const router = useRouter()

  async function createPost() {
    const post = {
      title: editorValues.title,
      body: editorValues.html,
      description: descriptionFromHTML(editorValues.html),
      tags: editorValues.tags,
    }
    const { data } = await axios.post('/api/posts/create', post)
    console.log('Created Post', data)
    const day = {
      targetWordCount: editorValues.targetWordCount,
      wordCount: editorValues.wordCount,
      writingTime: editorValues.writingTime,
    }
    const { data: savedDay } = await axios.post('/api/stats/save-day', day)
    console.log('Saved stats', savedDay)
    router.push(`/post/${data.post.slug}/edit`)
  }
  return (
    <button className="btn btn-cta" onClick={createPost}>
      Create Post
    </button>
  )
}

function UpdatePostButtons() {
  const { editorValues, setValue, setValues } = useEditorContext()

  async function updatePost(published) {
    const updatedPost = {
      slug: editorValues.postSlug,
      title: editorValues.title,
      body: editorValues.html,
      description: descriptionFromHTML(editorValues.html),
      tags: editorValues.tags,
      published,
    }
    const { data: savedPost } = await axios.post('/api/posts/update', updatedPost)
    console.log('Updated Post', savedPost)
    const day = {
      targetWordCount: editorValues.targetWordCount,
      wordCount: editorValues.wordCount,
      writingTime: editorValues.writingTime,
    }
    const { data: savedDay } = await axios.post('/api/stats/save-day', day)
    console.log('Saved stats', savedDay)
  }

  async function togglePublished() {
    await updatePost(!editorValues.published)
    setValue('published', !editorValues.published)
  }
  return (
    <>
      <button className="btn btn-cta" onClick={togglePublished}>
        {editorValues.published ? 'Unpublish' : 'Publish'}
      </button>
      {editorValues.saved ? (
        <button className="btn btn-cta disabled" disabled>
          <FontAwesomeIcon icon={['fas', 'save']} />
          Saved
        </button>
      ) : (
        <button className="btn btn-cta" onClick={() => updatePost(editorValues.published)} id="save-post">
          <FontAwesomeIcon icon={['fas', 'save']} />
          Save Post
        </button>
      )}
    </>
  )
}

function DeletePostButtons() {
  const { editorValues, setValue, setValues } = useEditorContext()
  const router = useRouter()
  async function deletePost() {
    console.log('Deleting Post', editorValues.postSlug)
    const { data } = await axios.post('/api/posts/delete', { slug: editorValues.postSlug })
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

function CaptureImages() {
  const { editorValues, setValue, setValues } = useEditorContext()

  async function captureTwitterImage() {
    const positionImage = document.getElementById('position-image')
    const twitterImage = document.getElementById('render-image')
    positionImage.classList.add('capturing')
    const image = await domtoimage.toJpeg(twitterImage, { quality: 0.95 })
    positionImage.classList.remove('capturing')
    saveAs(image, `${editorValues.title}.jpg`)
  }
  async function captureSocialImage() {
    const positionImage = document.getElementById('position-image')
    const croppedImage = document.getElementById('cropped-image')
    positionImage.classList.add('capturing-cropped')
    const image = await domtoimage.toJpeg(croppedImage, { quality: 0.95 })
    positionImage.classList.remove('capturing-cropped')
    saveAs(image, `${editorValues.title} Social.jpg`)
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
