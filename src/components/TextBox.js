import React, {useEffect, useRef} from 'react'
import {gsap} from 'gsap'

const TextBox = ({children, btnClassName}) => {

  const textBoxRef = useRef()
  const footerHeight = '5rem'
  const collapsedHeight = 500  // px int

  // How much taller than the collapsed height does the
  // TextBox need to be to get a "Read More" button?
  const allowedExtraHeight = 200  // px int

  useEffect(() => {
    const textBox = textBoxRef.current
    // noinspection JSUnresolvedFunction
    const textBoxBtn = textBox.querySelector('.textbox__btn')
    // noinspection JSUnresolvedFunction
    const textBoxFooter = textBox.querySelector('.textbox__footer')
    // noinspection JSUnresolvedFunction
    const textBoxFade = textBox.querySelector('.textbox__fade')
    let isOpen = false

    const styleTextBox = () => {
      textBox.style.height = 'auto'
      if (textBox.scrollHeight - allowedExtraHeight < collapsedHeight) {
        textBoxFooter.style.display = 'none'
        isOpen = false
      } else {
        textBoxFooter.style.display = 'flex'
        if (isOpen) {
          gsap.set(textBox, {height: textBox.scrollHeight})
          textBoxFade.style.display = 'none'
          textBoxBtn.innerHTML = 'Collapse'
        } else {
          gsap.set(textBox, {height: collapsedHeight})
          textBoxFade.style.display = 'initial'
          textBoxBtn.innerHTML = 'Read More'
        }
      }
    }

    // Style the textbox appropriately after it loads
    styleTextBox()

    textBoxBtn.onclick = () => {
      if (isOpen) {
        // Collapse the box
        textBoxBtn.innerHTML = 'Read More'
        isOpen = false
        gsap.to(textBox, {height: collapsedHeight})
        textBoxFade.style.display = 'initial'
      } else {
        // Expand the box
        textBoxBtn.innerHTML = 'Collapse'
        isOpen = true
        gsap.to(textBox, {height: textBox.scrollHeight})
        textBoxFade.style.display = 'none'
      }
    }


    // Using the 'resize' event causes some funny behavior on mobile devices, since the address bar can pop in and
    // out causing the vertical height to change. Because of this, we only want to do things when the horizontal
    // width changes.
    let trackedTextBoxWidth = textBox.offsetWidth
    window.addEventListener('resize', () => {

      // If the width of the box changes...
      if (trackedTextBoxWidth !== textBox.offsetWidth) {
        trackedTextBoxWidth = textBox.offsetWidth
        styleTextBox()
      }
    })
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
      <div className='textbox__inner'>
        {children}
      </div>
      <div className='textbox__footer'>

        {/* A filler div in the DOM flow at the bottom of the TextBox */}
        <div style={{
          height: footerHeight,
          width: '100%',
        }}/>

        {/* The absolutely positioned element that stays on the bottom of the TextBox */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          bottom: '0',
          width: '100%',
        }}>
          <div
            className='textbox__fade'
            style={{
              height: '100px',
              width: '100%',
              background: 'linear-gradient(to bottom, #ffffff00, white)',
            }}/>
          <div style={{
            backgroundColor: 'white',
            width: '100%',
            height: footerHeight,
            textAlign: 'center',
            padding: '0.5rem 0 1rem',
          }}>
            <button className={`${btnClassName ? btnClassName : ''} textbox__btn`}>Read More</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextBox