interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fullScreen?: boolean
  text?: string
  variant?: 'spinner' | 'dots' | 'pulse'
}

const Loading = ({fullScreen = false, text, variant = 'spinner' }: LoadingProps) => {

  const renderSpinner = () => (
    <div className={`w-10 h-10 border-4 border-gray-200 border-t-[#E8B431] rounded-full animate-spin`} />
  )
  const renderDots = () => (
    <div className="flex gap-2">
      <div className={`w-10 h-10 bg-[#E8B431] rounded-full animate-bounce`} style={{ animationDelay: '0ms' }} />
      <div className={`w-10 h-10 bg-[#E8B431] rounded-full animate-bounce`} style={{ animationDelay: '150ms' }} />
      <div className={`w-10 h-10 bg-[#E8B431] rounded-full animate-bounce`} style={{ animationDelay: '300ms' }} />
    </div>
  )
  const renderPulse = () => (
    <div className={`w-10 h-10 bg-[#E8B431] rounded-full animate-pulse`} />
  )

  let loadingElement
  if (variant === 'dots') {
    loadingElement = renderDots()
  } else if (variant === 'pulse') {
    loadingElement = renderPulse()
  } else {
    loadingElement = renderSpinner()
  }
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      {loadingElement}
      {text && <p className="text-gray-600 font-medium text-sm md:text-base animate-pulse">{text}</p>}
    </div>
  )
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    )
  }
  return content
}

export default Loading
