
const CopyrightUpdate = () => {
  return (
    <>
{/* Ne pas mettre div car c'est un block element et là on met inline-block */}
    <span className='inline-block ml-2'>
      © {new Date().getFullYear()}
    </span>
    
    </>
  )
}

export default CopyrightUpdate