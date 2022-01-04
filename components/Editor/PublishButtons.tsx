import axios from 'axios'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import domtoimage from 'retina-dom-to-image'
import { saveAs } from 'file-saver'
import { useEditorContext } from 'components/Editor/Editor'
import Link from 'components/Elements/Link'
import { useAuth } from 'context/AuthContext'
import Modal from 'components/Elements/Modal'
import { useModal } from 'context/ModalContext'
import PostSettingsModal from './PostSettingsModal'
import Router from 'next/router'

export default function PublishButtons() {
  const { editorValues, setValue } = useEditorContext()
  return (
    <>
      <div className="publish-buttons">
        <div className="left">
          {editorValues.postSlug && (
            <div className="dropdown">
              <button className="btn menu-handle">
                <FontAwesomeIcon icon={['fas', 'cog']} />
              </button>
              <div className="menu up">
                <PostSettings />
                <CaptureImages />
                <DeletePostButtons />
              </div>
            </div>
          )}
        </div>
        <div className="right">
          {/* {!editorValues.saved && <span>Unsaved Changes</span>} */}
          {editorValues.postSlug ? <UpdatePostButtons /> : <CreatePostButtons />}
        </div>
        <div className="clearfix" />
      </div>
      <PostSettingsModal />
      <DeletePostModal />
    </>
  )
}

function CreatePostButtons() {
  const { editorValues, setValue } = useEditorContext()
  const router = useRouter()

  async function createPost() {
    const post = {
      title: editorValues.title,
      body: editorValues.editor.getHTML(),
      description: descriptionFromHTML(editorValues.editor.getHTML()),
      tags: editorValues.tags,
    }
    console.log('Creating post', post)
    const { data } = await axios.post('/api/posts/create', post)
    console.log('Created Post', data)
    const day = {
      targetWordcount: editorValues.targetWordcount,
      wordCount: editorValues.wordCount,
      writingTime: editorValues.writingTime,
    }
    const { data: savedDay } = await axios.post('/api/stats/save-day', day)
    console.log('Saved stats', savedDay)
    // router.push(`/post/${data.post.slug}/edit`)
    console.log('Not using router')
    window.onbeforeunload = null
    window.location.href = `/post/${data.post.slug}/edit`
    setValue('saved', true)
  }
  return (
    <button className="btn btn-cta" onClick={createPost} id="save-post">
      <FontAwesomeIcon icon={['fas', 'save']} />
      Save Draft
    </button>
  )
}

function UpdatePostButtons() {
  const { user } = useAuth()
  const { editorValues, setValue, setValues } = useEditorContext()

  async function updatePost(published) {
    const updatedPost = {
      slug: editorValues.postSlug,
      title: editorValues.title,
      body: editorValues.editor.getHTML(),
      tags: editorValues.tags,
      published,
    }
    const { data: savedPost } = await axios.post('/api/posts/update', updatedPost)
    console.log('Updated Post', savedPost)
    const day = {
      targetWordcount: editorValues.targetWordcount,
      wordCount: editorValues.wordCount,
      writingTime: editorValues.writingTime,
    }
    const { data: savedDay } = await axios.post('/api/stats/save-day', day)
    console.log('Saved stats', savedDay)
    setValue('saved', true)
  }
  async function togglePublished() {
    await updatePost(!editorValues.published)
    setValue('published', !editorValues.published)
  }
  return (
    <>
      {editorValues.published ? (
        <>
          <button className="btn" onClick={togglePublished}>
            Unpublish
          </button>
          <a className="btn" href={`/post/${editorValues.postSlug}`} target="_blank" rel="noopener noreferrer">
            View
          </a>
        </>
      ) : user.subscriptionStatus === 'FREE' ? (
        <a className="btn" href="/api/payments/create-checkout-session">
          Upgrade account to publish on our community
        </a>
      ) : (
        <button className="btn" onClick={togglePublished}>
          Publish
        </button>
      )}

      {editorValues.saved ? (
        <button className="btn disabled" disabled>
          <FontAwesomeIcon icon={['fas', 'save']} />
          Saved
        </button>
      ) : (
        <button className="btn" onClick={() => updatePost(editorValues.published)} id="save-post">
          <FontAwesomeIcon icon={['fas', 'save']} />
          Save Post
        </button>
      )}
    </>
  )
}

function PostSettings() {
  const { toggleModal } = useModal()
  return (
    <button className="btn item" onClick={() => toggleModal('post-settings')}>
      <FontAwesomeIcon icon={['fas', 'cog']} />
      Post Settings
    </button>
  )
}

function DeletePostButtons() {
  const { toggleModal } = useModal()
  return (
    <button className="btn item" onClick={() => toggleModal('delete-post')}>
      <FontAwesomeIcon icon={['fas', 'trash-alt']} />
      Delete Post
    </button>
  )
}

function DeletePostModal() {
  const { toggleModal } = useModal()
  const { user } = useAuth()
  const { editorValues, setValue, setValues } = useEditorContext()
  const router = useRouter()
  async function deletePost() {
    console.log('Deleting Post', editorValues.postSlug)
    const { data } = await axios.post('/api/posts/delete', { slug: editorValues.postSlug })
    console.log('Deleted Post', data)
    toggleModal('')
    router.push(`/@${user.username}`)
  }
  return (
    <Modal name={`delete-post`} className={'delete-modal narrow'}>
      <h1>Are you sure you want to delete the post?</h1>
      <div className="right">
        <button className="btn" onClick={() => toggleModal('')}>
          Cancel
        </button>
        <button className="btn btn-cta margin-left-5" onClick={deletePost}>
          Delete
        </button>
      </div>
    </Modal>
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
        Save as Image
      </button>
      {/* <button className="btn item" onClick={captureSocialImage}>
        <FontAwesomeIcon icon={['fas', 'camera']} />
        Social Image
      </button> */}
    </>
  )
}

export function descriptionFromHTML(html) {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = html
  const firstElement = wrapper.firstChild as HTMLElement
  let description = firstElement.innerText.substring(0, 140)
  return description
}
