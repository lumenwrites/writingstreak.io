import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'

// import { getAllTags } from 'pages/api/posts/get-all-tags'
import useForm from 'hooks/useForm'
// import useUploadFiles from 'hooks/useUploadFiles'

import Layout from 'components/Layout/Layout'
import TagsInput from 'components/Posts/TagsInput'
import MessagePanel from 'components/Elements/MessagePanel'

export default function PostCreate() {
  const router = useRouter()
  const emptyInputs = { title: '', body: '' }
  const { inputs, handleChange, setValue, clearForm } = useForm(emptyInputs)
  const [status, setStatus] = useState({ state: '', message: '' })
  const [tags, setTags] = useState([{ name: 'Writing', slug: 'writing' }])

  async function handleSubmit() {
    const { title, body } = inputs
    const post = { title, body, tags }
    console.log('submitting post', post)
    const { data } = await axios.post('/api/posts/create', post)
    if (data.error) return setStatus({ state: 'error', message: 'Error occurred.' })
    setStatus({ state: '', message: '' })
    clearForm()
    console.log('Created Post', data)
    router.push(`/post/${data.post.slug}`)
  }
  return (
    <Layout>
      <div className="edit">
        <h1>Create Post</h1>
        <MessagePanel type={status.state} message={status.message} />
        <input placeholder="Post Title" name="title" value={inputs.title} onChange={handleChange} />
        <textarea placeholder="Post Description..." name="body" value={inputs.body} onChange={handleChange} />
        <TagsInput allTags={allTags} tags={tags} setTags={setTags} />
        <div className="buttons">
          <div className="right">
            <button type="button" className="btn btn-cta" onClick={handleSubmit}>
              Create
            </button>
          </div>
          <div className="clearfix" />
        </div>
      </div>
    </Layout>
  )
}

const allTags = [
  {
    name: 'Writing',
    slug: 'writing',
  },
  {
    name: 'Startup',
    slug: 'startup',
  },
  {
    name: 'Creativity',
    slug: 'creativity',
  },
]
