export default function ImageCaptureWrappers({ children }) {
  return (
    <div className="position-image capturing1" id="position-image">
      <div className="cropped-image" id="cropped-image">
        <div className="twitter-image" id="twitter-image">
          {children}
        </div>
      </div>
    </div>
  )
}
