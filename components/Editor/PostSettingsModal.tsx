import axios from 'axios'
import { useRouter } from 'next/router'
import Modal from 'components/Elements/Modal'
import { useEditorContext } from 'components/Editor/Editor'
import { useState } from 'react'
import MessagePanel from 'components/Elements/MessagePanel'

export default function PostSettingsModal() {
  const { editorValues, setValue } = useEditorContext()
  const [saved, setSaved] = useState(false)
  const router = useRouter()
  function updateValue(key, value) {
    setValue(key, value)
    setSaved(false)
  }
  async function updatePost() {
    const updatedPost = {
      slug: editorValues.postSlug,
      updatedPostSlug: editorValues.updatedPostSlug,
      canonicalUrl: editorValues.canonicalUrl,
      socialTitle: editorValues.socialTitle,
      socialDescription: editorValues.socialDescription,
      description: editorValues.description,
    }
    const { data: res } = await axios.post('/api/posts/update', updatedPost)
    if (res.updatedPost.slug !== router.query.postSlug) {
      console.log('Updated post slug, redirecting to a new url', res.updatedPost.slug)
      window.location.href = `/post/${res.updatedPost.slug}/edit`
    }
    console.log('Updated Post', res.updatedPost)
    setSaved(true)
  }

  return (
    <Modal name={`post-settings`} className={'narrow post-settings'}>
      {/* <MessagePanel type='success' message={ saved ? 'Settings saved.' : ''}/> */}
      <h1>Post Settings</h1>
      <h4>Url and Description</h4>
      <p>Your post url will look like this:</p>
      <a href={`/post/${editorValues.updatedPostSlug}`} target="_blank" rel="noopener noreferrer">
        https://writingstreak.io/post/{editorValues.updatedPostSlug}
      </a>
      <input
        placeholder="Custom post url..."
        value={editorValues.updatedPostSlug || undefined}
        onChange={(e) => updateValue('updatedPostSlug', e.target.value)}
      />
      <p>Description for the community browse page:</p>
      <textarea
        placeholder="Custom description..."
        value={editorValues.description || ''}
        onChange={(e) => updateValue('description', e.target.value)}
      />
      <h4>Canonical Url</h4>
      <p>
        If you are publishing this post elsewhere (like your own blog), set a url here. It will be displayed in the post
        footer (sending you some traffic), and set as "canonical" (giving you a SEO boost).
      </p>
      <input
        placeholder="Canonical url..."
        value={editorValues.canonicalUrl || ''}
        onChange={(e) => updateValue('canonicalUrl', e.target.value)}
      />
      {/*       
      <hr />
      <h4>Social Media and SEO</h4>
      <p>Title and description of your post as they appear on social media and in search engines:</p>
      <input
        placeholder="Custom social media title..."
        value={editorValues.socialTitle || ''}
        onChange={(e) => setValue('socialTitle', e.target.value)}
      />
      <textarea
        placeholder="Custom social media description..."
        value={editorValues.socialDescription || ''}
        onChange={(e) => setValue('socialDescription', e.target.value)}
      />
      <p>
        (It's best to keep the title under 60 characters, and description under 140 chracters, otherwise they get
        truncated.)
      </p> */}
      <button className="btn btn-cta right" onClick={updatePost}>
        {saved ? 'Saved' : 'Save'}
      </button>
    </Modal>
  )
}
