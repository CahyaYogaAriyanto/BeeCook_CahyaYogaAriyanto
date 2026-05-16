import { X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface UploadImageModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (file: File) => void
  loadingUpload: boolean
}

const UploadImageModal = ({ isOpen, onClose, onUpload,loadingUpload }: UploadImageModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    if(!isOpen){
      setSelectedFile(null)
      setPreview(null)
      setIsDragging(false)
    }
  }, [isOpen])

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleUpload = async () => {
    if (selectedFile) {
      const compressedFile = await compressImage(selectedFile)
      onUpload(compressedFile)
    }
  }
  const handleClose = () => {
    setSelectedFile(null)
    setPreview(null)
    setIsDragging(false)
    onClose()
  }
  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        const img = new Image()
        img.src = event.target?.result as string

        img.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')

          const MAX_WIDTH = 1280
          const scaleSize = MAX_WIDTH / img.width

          canvas.width = MAX_WIDTH
          canvas.height = img.height * scaleSize

          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)

          canvas.toBlob(
            (blob) => {
              if (!blob) return

              const compressedFile = new File(
                [blob],
                file.name,
                {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                }
              )
              resolve(compressedFile)
            },
            'image/jpeg',
            0.8
          )
        }
      }
    })
  }
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />
      <div 
        className="relative bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-8 pt-8 pb-6 shrink-0">
          <h2 className="text-3xl font-bold text-gray-800">Upload Gambar</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-xl hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>
        <div className="px-10 pb-6 overflow-y-auto flex-1">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all mb-6 ${
              isDragging 
                ? 'border-blue-400 bg-blue-50/50' 
                : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="relative ">
                <svg width="60" height="60" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="10" y="15" width="60" height="50" rx="8" stroke="#3B82F6" strokeWidth="2.5" fill="none"/>
                  <circle cx="28" cy="32" r="6" stroke="#3B82F6" strokeWidth="2.5" fill="none"/>
                  <path d="M15 55 L30 40 L45 55" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <path d="M40 50 L52 38 L65 51" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </div>
              
              <div>
                <p className="text-gray-600 text-base mb-1">
                  Drop your files here or{' '}
                  <span className="text-blue-500 font-semibold">browse</span>
                </p>
                <p className="text-sm text-gray-400">
                  Maximum size: 50MB
                </p>
              </div>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />
          <div className="mb-6">
            <p className="text-gray-600 font-medium mb-4 text-lg">Preview</p>
            <div className="bg-gray-50/50 rounded-2xl p-6 min-h-50 flex items-center justify-center border border-gray-100">
              {preview ? (
                <div className="w-full h-full flex items-center justify-center">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="max-w-full max-h-45 object-contain rounded-xl shadow-md"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto opacity-30">
                    <rect x="15" y="20" width="50" height="40" rx="6" fill="#9CA3AF"/>
                    <rect x="35" y="35" width="50" height="40" rx="6" fill="#6B7280"/>
                    <circle cx="45" cy="48" r="4" fill="#E5E7EB"/>
                    <path d="M40 65 L50 55 L60 65" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M55 62 L63 54 L70 61" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 px-8 pb-8 shrink-0 border-t border-gray-100 pt-6">
          <button
            onClick={handleClose}
            className="px-8 py-3 text-gray-600 hover:text-gray-800 font-semibold transition-colors rounded-xl hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!selectedFile || loadingUpload}
            className={`px-8 py-3 rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center min-w-30 ${
              selectedFile && !loadingUpload
                ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-200'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
            }`}
          >
            {loadingUpload ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              'Upload'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default UploadImageModal
