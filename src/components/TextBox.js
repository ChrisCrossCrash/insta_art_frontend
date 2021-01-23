import React, {useEffect} from 'react'
import {gsap} from 'gsap'

const TextBox = ({children, btnClassName}) => {

  useEffect(() => {
    const textBoxes = document.querySelectorAll('.textbox')

    // The inside of the loop must be wrapped in a closure to contain its scope.
    // Otherwise, all of the buttons will only open the last texBox
    let textBox
    for (textBox of textBoxes) {
      ((textBox) => {
        const textBoxBtn = textBox.querySelector('.textbox__btn')
        const textBoxBtnInitialText = textBoxBtn.innerHTML
        let isOpen = false
        let collapsedHeight = 300

        // Set the height when the page loads.
        gsap.set(textBox, {height: collapsedHeight})

        window.addEventListener('resize', () => {
          // Recalculate the automatic height so that `textBox.scrollHeight
          // is NOT what gsap set it to previously.
          textBox.style.height = 'auto'
          if (isOpen) {
            gsap.set(textBox, {height: textBox.scrollHeight})
          } else {
            gsap.set(textBox, {height: collapsedHeight})
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
      })(textBox)
    }
  }, [])

  return (
    <div
      className='textbox'
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        minHeight: '300px',
      }}
    >
      <div className='textbox__inner' style={{paddingBottom: '50px'}}>
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
          height: '100px',
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