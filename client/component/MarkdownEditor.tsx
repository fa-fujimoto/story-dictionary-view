// import React, { FC, FormEvent, useCallback, useContext, useEffect, useMemo, useState } from "react"
// import SimpleMDEEditor from "react-simplemde-editor"
// import CodeMirror from 'codemirror'
// import 'easymde/dist/easymde.min.css'
// import 'codemirror/addon/hint/show-hint'
// import 'codemirror/addon/hint/show-hint.css'
// import 'codemirror/addon/edit/closebrackets'
// import { ProjectContext } from "./../contexts/ProjectContextProvider"
// import { match } from "assert"
// import { IProjectResponse } from "client/repository/ProjectRepository"

// interface IMarkdownEditorProps {
//   project: IProjectResponse
//   value: string
//   onChange: (value: string) => void
// }

// type MarkdownModeState = {
//   inTermLink: boolean
//   inTermWord: boolean
//   afterTermLink: boolean

//   inColorWord: boolean
//   inColorCode: boolean
//   afterColorWord: boolean
//   selectColor: string
// }

// type originalSyntax = 'termLink' | 'textColor'

// const MarkdownEditor: FC<IMarkdownEditorProps> = ({project, value, onChange}) => {
//   const extendMode = useMemo<CodeMirror.Mode<MarkdownModeState>>(() => {
//     return {
//       token: (stream: CodeMirror.StringStream, state: MarkdownModeState) => {
//         if (stream.match('!{')) {
//           state.inTermLink = true
//           return 'term-link'
//         }
//         if (state.inTermLink) {
//           if (stream.match('}')) {
//             state.inTermLink = false
//             state.afterTermLink = true
//             return 'term-link'
//           } else {
//             stream.eat(/./)
//             return 'term-link-string'
//           }
//         }
//         if (state.afterTermLink) {
//           if (!state.inTermWord) {
//             if (stream.match('(')) {
//               if (stream.match(/.*\)/, false)) {
//                 state.inTermWord = true
//                 return 'term-word'
//               } else {
//                 state.afterTermLink = false
//                 return null
//               }
//             } else {
//               state.afterTermLink = false
//             }
//           }

//           if (state.inTermWord) {
//             if (stream.match(')')) {
//               state.inTermWord = false
//               state.afterTermLink = false
//               return 'term-word'
//             } else {
//               stream.eat(/./)
//               return 'term-word-string'
//             }
//           }
//         }

//         if (stream.match(/^(;;)(#[a-fA-F0-9]{1,6}|[a-zA-Z]+)\s.*;;/, false)) {
//           stream.match(/^;;/)
//           state.inColorWord = true
//           return 'formating formating-color color'
//         }

//         if (state.inColorWord) {
//           if (!state.selectColor && stream.match(/^(#[a-fA-F0-9]{1,6}|[a-zA-Z]+)\s/, false)) {
//             const color = stream.match(/^(#[a-fA-F0-9]{1,6}|[a-zA-Z]+)\s/)
//             state.selectColor = color[1][0] === '#' ? color[1].slice(1) : color[1]

//             return `colorcode colorcode-${state.selectColor}`
//           }

//           if (state.selectColor) {
//             if (stream.match(';;')) {
//               state.inColorWord = false
//               state.selectColor = ''
//               return 'formating formating-color color'
//             } else {
//               stream.eat(/./)
//               return `colorword colorword-${state.selectColor}`
//             }
//           }
//         }
//         stream.next()
//         return null
//       },
//       startState: () => {
//         return {
//           inTermLink: false,
//           inTermWord: false,
//           afterTermLink: false,

//           inColorWord: false,
//           inColorCode: false,
//           afterColorWord: false,
//           selectColor: '',
//         }
//       },
//     }
//   }, [])

//   const updateInsideTermLinkBlanketData = useCallback((
//     instance: CodeMirror.Editor,
//     selectionPos: CodeMirror.Position,
//   ): void => {
//     const {ch, line} = selectionPos
//     const value = instance.getLine(line)
//     const branketPos = {start: -1, end: -1}

//     console.log(instance.getTokenTypeAt(selectionPos))

//     branketPos.start = value.lastIndexOf('!{', ch)

//     if (branketPos.start < 0 || branketPos.start + 2 > ch || branketPos.start < value.lastIndexOf('}', ch - 2)) {
//       return
//     }

//     branketPos.end = value.indexOf('}', ch)

//     if (branketPos.end < 0 || value.indexOf('!{', ch) > branketPos.end) {
//       return
//     }

//     const termValue = value.substr(branketPos.start + 2, branketPos.end - branketPos.start - 2).split('/')

//     const folderItems = getFolderItems(termValue[0])

//     if (folderItems?.find(item => item.term_id === termValue[1])) {
//       return
//     }

//     CodeMirror.showHint(instance, () => {
//       if (folderItems) {
//         const folderNameLength = termValue[0].length + 1
//         const suggestTerm = folderItems.filter(item => {
//           return item.term_id.indexOf(termValue[1]) >= 0
//         }).map(item => item.term_id)

//         return ({
//           from: {...selectionPos, ch: folderNameLength + branketPos.start + 2},
//           to: {...selectionPos, ch: branketPos.end},
//           list: suggestTerm,
//         })
//       } else {
//         const suggestFolderName = ['words'].filter(item => {
//           return item.indexOf(termValue[0]) >= 0
//         })

//         return ({
//           from: {...selectionPos, ch: branketPos.start + 2},
//           to: {...selectionPos, ch: branketPos.end},
//           list: suggestFolderName,
//         })
//       }
//     })
//   }, [])

//   const getFolderItems = useCallback((folderName: string) => {
//     switch (folderName) {
//     case 'words':
//       return project.words
//     default:
//       return
//     }
//   }, [project])

//   function getState(
//     instance: CodeMirror.Editor,
//     pos?: CodeMirror.Position
//   ): {[key in originalSyntax]?: boolean} {
//     pos = pos || instance.getCursor('start')
//     const stat = instance.getTokenAt(pos)
//     if (!stat.type) return {}

//     const ret: {[key in originalSyntax]?: boolean} = {}

//     stat.type.split(' ').forEach(type => {
//       if (type === 'colorcode' || type === 'formating-color') {
//         ret.textColor = true
//       } else if (type === 'term-word-string') {
//         ret.termLink = true
//       }
//     })

//     return ret
//   }


//   function toggleBlock(
//     instance: CodeMirror.Editor,
//     type: originalSyntax,
//     start_chars: string,
//     end_chars?: string
//   ) {
//     end_chars = (typeof end_chars === 'undefined') ? start_chars : end_chars
//     const stat = getState(instance)

//     let text
//     let start = start_chars
//     let end = end_chars

//     const startPoint = instance.getCursor('start')
//     const endPoint = instance.getCursor('end')

//     let wordValueLength = 0

//     if (stat[type]) {
//       text = instance.getLine(startPoint.line)
//       start = text.slice(0, startPoint.ch)
//       end = text.slice(startPoint.ch)

//       if (type == 'termLink') {
//         const startRegExp = /!\{([\w\d_/]*)(?![\s\S]*(!\{))\}\(/
//         const matchWord = start.match(startRegExp)

//         wordValueLength = matchWord ? matchWord[1].length : 0

//         start = start.replace(startRegExp, '')
//         end = end.replace(/\)/, '')
//       }
//       instance.replaceRange(start + end, {
//         line: startPoint.line,
//         ch: 0,
//       }, {
//         line: startPoint.line,
//         ch: 99999999999999,
//       })

//       if (type == 'termLink') {
//         startPoint.ch -= 2 + wordValueLength
//         if (startPoint !== endPoint) {
//           endPoint.ch -= 2 + wordValueLength
//         }
//       }
//     } else {
//       text = instance.getSelection()
//       // if (type == 'bold') {
//       //   text = text.split('**').join('');
//       //   text = text.split('__').join('');
//       // } else if (type == 'italic') {
//       //   text = text.split('*').join('');
//       //   text = text.split('_').join('');
//       // } else if (type == 'strikethrough') {
//       //   text = text.split('~~').join('');
//       // }
//       instance.replaceSelection(start + text + end)

//       startPoint.ch += start_chars.length
//       endPoint.ch = startPoint.ch + text.length
//     }

//     instance.setSelection(startPoint, endPoint)
//     instance.focus()
//   }

//   const replaceSelection = useCallback((
//     instance: CodeMirror.Editor,
//     active: boolean | undefined,
//     startEnd: [string, string],
//     params?: string
//   ) => {
//     let text = ''
//     let [start, end] = startEnd

//     const startPoint = instance.getCursor('start'),
//       endPoint = instance.getCursor('end')
//     if (params) {
//       start = start.replace('#params#', params)  // url is in start for upload-image
//       end = end.replace('#params#', params)
//     }

//     if (active) {
//       text = instance.getLine(startPoint.line)
//       start = text.slice(0, startPoint.ch)
//       end = text.slice(startPoint.ch)

//       instance.replaceRange(start + end, {
//         line: startPoint.line,
//         ch: 0,
//       })
//     } else {
//       text = instance.getSelection()
//       instance.replaceSelection(start + text + end)

//       startPoint.ch += start.length
//       if (startPoint !== endPoint) {
//         endPoint.ch += start.length
//       }
//     }
//     instance.setSelection(startPoint, endPoint)
//     instance.focus()
//   }, [])

//   const drawColor = useCallback((instance: CodeMirror.Editor) => {
//     const state = getState(instance)
//     replaceSelection(instance, state.textColor, [';;#params# ', ';;'], '#000')
//   }, [replaceSelection])

//   const drawTermLink = useCallback((instance: CodeMirror.Editor) => {
//     const state = getState(instance)
//     replaceSelection(instance, state.termLink, ['!{}(', ')'])
//   }, [replaceSelection])

//   const handleMoveCursol = useCallback((instance: CodeMirror.Editor) => {
//     const doc = instance.getDoc()
//     const selectionPos = doc.getCursor()

//     console.log(
//       instance.hasFocus()
//     )

//     updateInsideTermLinkBlanketData(instance, selectionPos)
//   }, [])

//   return (
//     <div>
//       <SimpleMDEEditor
//         getMdeInstance={instance => {
//           instance.codemirror.setOption('autoCloseBrackets', true)
//         }}
//         value={value}
//         onChange={onChange}
//         events={{
//           cursorActivity: handleMoveCursol,
//         }}
//         options={{
//           overlayMode: {
//             mode: extendMode,
//           },
//           spellChecker: false,
//           shortcuts: {
//             drawColor: 'Ctrl-E',
//             drawTermLink: 'Ctrl-,',
//           },
//           toolbar: [
//             {
//               name: "drawColor",
//               action: instance => drawColor(instance.codemirror),
//               className: "fa fa-tint",
//               title: "Color",
//             },
//             'bold',
//             'italic',
//             'heading',
//             '|',
//             'quote',
//             'unordered-list',
//             'ordered-list',
//             '|',
//             {
//               name: 'drawTermLink',
//               action: (instance) => drawTermLink(instance.codemirror),
//               className: 'fa fa-anchor',
//               title: 'Term Link',
//             },
//             'link',
//             'image',
//             '|',
//             'guide',
//             {
//               name: "others",
//               className: "fa fa-blind",
//               title: "others buttons",
//               children: [
//                 {
//                   name: "image",
//                   action: (instance) => {console.log(instance)},
//                   className: "fa fa-picture-o",
//                   title: "Image",
//                 },
//                 {
//                   name: "quote",
//                   action: (instance) => {console.log(instance)},
//                   className: "fa fa-percent",
//                   title: "Quote",
//                 },
//                 {
//                   name: "link",
//                   action: (instance) => {console.log(instance)},
//                   className: "fa fa-link",
//                   title: "Link",
//                 },
//               ],
//             },
//           ],
//         }
//         }
//       />
//     </div>
//   )
// }

// export default MarkdownEditor