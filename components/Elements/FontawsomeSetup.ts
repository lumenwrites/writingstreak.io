// https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react
import { library } from "@fortawesome/fontawesome-svg-core"

// Import everything (significantly increases bundle size)
// import { fas } from "@fortawesome/free-solid-svg-icons"
// import { far } from "@fortawesome/free-regular-svg-icons"
// import { fab } from "@fortawesome/free-brands-svg-icons"
// library.add(fas, far, fab)

import { faGoogle, faTwitter, faYoutube, faDiscord } from "@fortawesome/free-brands-svg-icons"
import {
  faBars,
  faUpload,
  faUser,
  faCog,
  faSignOutAlt,
  faTimes,
  faBook,
  faEdit,
  faArrowUp,
  faEye,
  faComments,
  faImage,
  faTrashAlt,
  faChevronLeft,
  faChevronRight,
  faDownload,
  faBox,
  faBoxOpen,
  faInfoCircle,
  faSignInAlt,
  faArrowRight,
  faCaretDown,
  faCaretRight
} from "@fortawesome/free-solid-svg-icons"

library.add(
  faBars,
  faUpload,
  faUser,
  faCog,
  faSignOutAlt,
  faGoogle,
  faTimes,
  faBook,
  faEdit,
  faArrowUp,
  faEye,
  faComments,
  faImage,
  faTrashAlt,
  faChevronLeft,
  faChevronRight,
  faDownload,
  faBox,
  faBoxOpen,
  faInfoCircle,
  faSignInAlt,
  faYoutube,
  faDiscord,
  faTwitter,
  faArrowRight,
  faCaretDown,
  faCaretRight,
)
