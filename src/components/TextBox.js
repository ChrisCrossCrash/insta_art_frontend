import React, {useEffect, useRef} from 'react'
import {gsap} from 'gsap'

const TextBox = ({children, btnClassName}) => {

  const textBoxRef = useRef()

  useEffect(() => {
    const textBox = textBoxRef.current
    // noinspection JSUnresolvedFunction
    const textBoxBtn = textBox.querySelector('.textbox__btn')
    const textBoxBtnInitialText = textBoxBtn.innerHTML
    let isOpen = false
    let collapsedHeight = 300

    // Set the height when the page loads.
    gsap.set(textBox, {height: collapsedHeight})

    // Using the 'resize' event causes some funny behavior on mobile devices, since the address bar can pop in and
    // out causing the vertical height to change. Because of this, we only want to do things when the horizontal
    // width changes.
    let trackedWindowWidth = window.innerWidth
    window.addEventListener('resize', () => {
      if (trackedWindowWidth !== window.innerWidth) {
        // Recalculate the automatic height so that `textBox.scrollHeight
        // is NOT what gsap set it to previously.
        textBox.style.height = 'auto'
        if (isOpen) {
          gsap.set(textBox, {height: textBox.scrollHeight})
        } else {
          gsap.set(textBox, {height: collapsedHeight})
        }
      }
    })

    textBoxBtn.onclick = () => {
      if (isOpen) {
        // Collapse the box
        textBoxBtn.innerHTML = textBoxBtnInitialText
        isOpen = false
        gsap.to(textBox, {height: collapsedHeight})
      } else {
        // Expand the box
        textBoxBtn.innerHTML = 'Collapse'
        isOpen = true
        gsap.to(textBox, {height: textBox.scrollHeight})
      }
    }
  }, [])

  return (
    <div
      ref={textBoxRef}
      className='textbox'
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        minHeight: '300px',
      }}
    >
      <div className='textbox__inner' style={{paddingBottom: '3rem'}}>
        {children}
      </div>
      <div
        className='textbox__footer'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: '0',
          left: '0',
          height: '5rem',
          width: '100%',
          background: 'linear-gradient(to bottom, #ffffff00, white)',
        }}
      >
        <button className={`${btnClassName ? btnClassName : ''} textbox__btn`}>Read More</button>
      </div>
    </div>
  )
}

export default TextBox