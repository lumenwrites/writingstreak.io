import Image from 'next/image'

export default function Img(props) {
  return (
    <div>
      <Image {...props} src={props.thumbnail} width={320} height={180} layout="responsive" />
    </div>
  )
}
