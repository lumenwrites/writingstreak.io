import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import domtoimage from 'retina-dom-to-image'
import { saveAs } from 'file-saver'

export default function PublishButtons({ title, editor, tags }) {
  async function createPost() {
    const post = {
      title: title,
      body: editor.getHTML(),
      tags: tags
    }
    console.log('submitting post', post)
    const { data } = await axios.post('/api/posts/create', post)
    console.log('Created Post', data)
    // router.push(`/post/${data.post.slug}`)
  }

  return (
    <div className="publish-buttons">
      <CaptureImages title={title}/>
      <button className="btn btn-cta" onClick={createPost}>
        <FontAwesomeIcon icon={['fas', 'save']} />
        Save
      </button>
      <button className="btn btn-cta">Publish</button>
    </div>
  )
}

function CaptureImages({title}) {
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
