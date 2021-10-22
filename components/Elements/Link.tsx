import Link from 'next/link'

export default function link({ ...props }) {
  return (
    <Link href={props.href} as={props.as}>
      <a className={props.className}  onClick={props.onClick}>
        {props.children}
      </a>
    </Link>
  )
}
