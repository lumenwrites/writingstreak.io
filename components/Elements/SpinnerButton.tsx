export default function SpinnerButton(props) {
  const { isloading, children, type, disabled } = props
  if (isloading) {
    return (
      <button className={`${props.className} disabled`} disabled>
        <div className="spinner-wrapper">
          <div className="flex-center">
            <div className="spinner" />
          </div>
        </div>
      </button>
    )
  } else {
    return (
      <button className={`${props.className}`} type={type} disabled={disabled}>
        {children}
      </button>
    )
  }
}
