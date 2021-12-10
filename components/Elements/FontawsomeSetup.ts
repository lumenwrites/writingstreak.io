// https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react
import { library } from "@fortawesome/fontawesome-svg-core"

// Import everything (significantly increases bundle size)
// import { fas } from "@fortawesome/free-solid-svg-icons"
// import { far } from "@fortawesome/free-regular-svg-icons"
// import { fab } from "@fortawesome/free-brands-svg-icons"
// library.add(fas, far, fab)

import {
  faGoogle,
  faTwitter,
  faYoutube,
  faDiscord,
  faSlackHash,
  faHotjar
} from "@fortawesome/free-brands-svg-icons"
import {
  faBell,
  faCalendar as farCalendar,
} from "@fortawesome/free-regular-svg-icons"
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
  faArrowDown,
  faEye,
  faComments,
  faCommentAlt,
  faTrashAlt,
  faChevronUp,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faDownload,
  faBox,
  faBoxOpen,
  faInfoCircle,
  faSignInAlt,
  faArrowRight,
  faCaretDown,
  faCaretRight,
  faPlusSquare,
  faMinusSquare,
  faThumbsUp,
  faThumbsDown,
  faHeart,
  faHashtag,
  faTag,
  faClock,
  faSearch,
  faCalendar,
  faCalendarAlt,
  faCalendarDay,
  faCalendarWeek,
  faGlobeAmericas,
  faEnvelope,
  // Editor icons
  faHeading,
  faQuoteRight,
  faCode,
  faList,
  faParagraph,
  faImage,
  faBold,
  faItalic,
  faUnderline,
  faHighlighter,
  faPen,
  faAlignLeft,
  faAlignCenter,
  faAlignJustify,
  faLink,
  faCamera,
  faSave,
  faPlus,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons"

library.add(
  // Post Footer Icons
  faUser,
  faArrowUp,
  faCommentAlt,
  // Subnav Sorting
  faHotjar,
  faClock,
  faSearch,
  // Pagination
  faChevronLeft,
  faChevronRight,
  // Subscribe box
  // faYoutube,
  faDiscord,
  faTwitter,
  // User Profile
  faGlobeAmericas,
  faEnvelope,

  // Header icons
  // faSignInAlt,
  // faSignOutAlt,

  // Comments
  faPlusSquare,
  faMinusSquare,

  // Editor icons
  faHeading,
  faQuoteRight,
  faCode,
  faImage,
  faBold,
  faItalic,
  faUnderline,
  faHighlighter,
  faLink,
  faCamera,
  faSave,
  faPlus, // floating menu
  faTimes, //delete tag
  faEllipsisH,
)
