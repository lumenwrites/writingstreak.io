import { useEffect, useRef } from 'react';
import Router from 'next/router';

// - Hook enables or disables the alert based on the variable I pass to it.
// - saved is turned off when title, text, or tags change.
// saved is turned on when the publish buttons save the post.
// - Create post (and maybe delete and change slug) needs to redirect without a warning,
// so I manually set onbeforeunload to null.
export function useUnsavedChangesWarning(shouldWarn) {
  const message = "Changes you made may not be saved."

  useEffect(() => {
    function unsavedAlert(e) {
      if (shouldWarn) {
        const event = e || window.event
        event.preventDefault()
        // For IE and Firefox prior to version 4
        if (e) e.returnValue = message
        return message
      }
    }
    window.onbeforeunload = unsavedAlert
    return () => {
      window.onbeforeunload = null
    }
  }, [shouldWarn])
}


// export function useUnsavedChangesWarning(shouldWarn) {
//   const message = "Changes you made may not be saved."

//   useEffect(() => {
//     function unsavedAlert(e) {
//       if (shouldWarn) {
//         const event = e || window.event
//         event.preventDefault()
//         // For IE and Firefox prior to version 4
//         if (e) e.returnValue = message
//         return message
//       }
//     }
//     window.addEventListener("beforeunload", unsavedAlert)

//     const routeChangeStart = url => {
//       // confirm is what triggers the dialogue
//       if (Router.asPath !== url && shouldWarn && !confirm(message)) {
//         // Cancel routeChange event by erroring
//         // See https://github.com/zeit/next.js/issues/2476
//         // https://github.com/vercel/next.js/discussions/12348#discussioncomment-8089
//         Router.events.emit('routeChangeError')
//         Router.replace(Router, Router.asPath, { shallow: true })
//         throw 'Abort route change. Please ignore this error.'
//       }
//     }
//     Router.events.on('routeChangeStart', routeChangeStart)
//     return () => {
//       window.removeEventListener("beforeunload", unsavedAlert)
//       Router.events.off('routeChangeStart', routeChangeStart)
//     }
//   }, [shouldWarn])
// }



export function useWarnIfUnsavedChanges(unsavedChanges: boolean) {
  const message = 'Changes you made may not be saved.';

  useEffect(() => {
    // https://stackoverflow.com/questions/63064778/next-js-warn-user-for-unsaved-form-before-route-change
    const routeChangeStart = url => {
      if (Router.asPath !== url && unsavedChanges && !confirm(message)) {
        Router.events.emit('routeChangeError');
        Router.replace(Router, Router.asPath);
        throw 'Abort route change. Please ignore this error.';
      }
    };

    const beforeunload = e => {
      if (unsavedChanges) {
        e.preventDefault();
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', beforeunload);
    Router.events.on('routeChangeStart', routeChangeStart);

    return () => {
      window.removeEventListener('beforeunload', beforeunload);
      Router.events.off('routeChangeStart', routeChangeStart);
    };
  }, [unsavedChanges]);
};


// https://github.com/vercel/next.js/discussions/32231#discussioncomment-1766746
// export const useWarnIfUnsavedChanges = (shouldWarn) => {
//   const message = "Changes you made may not be saved.";

//   useEffect(() => {
//     let isWarned = false;

//     const routeChangeStart = (url) => {
//       if (Router.asPath !== url && shouldWarn && !isWarned) {
//         isWarned = true;
//         if (window.confirm(message)) {
//           Router.push(url);
//         } else {
//           isWarned = false;
//           Router.events.emit("routeChangeError");

//           // HACK
//           const state = lastHistoryState.current;
//           if (state != null && history.state != null && state.idx !== history.state.idx) {
//             history.go(state.idx < history.state.idx ? -1 : 1);
//           }

//           // eslint-disable-next-line no-throw-literal
//           throw "Abort route change. Please ignore this error.";
//         }
//       }
//     };

//     const beforeUnload = (e) => {
//       if (shouldWarn && !isWarned) {
//         const event = e || window.event;
//         event.returnValue = message;
//         return message;
//       }
//       return null;
//     };

//     Router.events.on("routeChangeStart", routeChangeStart);
//     window.addEventListener("beforeunload", beforeUnload);

//     return () => {
//       Router.events.off("routeChangeStart", routeChangeStart);
//       window.removeEventListener("beforeunload", beforeUnload);
//     };
//   }, [message, shouldWarn]);
// };

/* https://stackoverflow.com/questions/10311341*/
// export function unsavedAlert(e) {
//   e = e || window.event
//   // For IE and Firefox prior to version 4
//   if (e) {
//     e.returnValue = 'Changes you made may not be saved.'
//   }
//   // For Safari
//   return 'Changes you made may not be saved.'
// }
