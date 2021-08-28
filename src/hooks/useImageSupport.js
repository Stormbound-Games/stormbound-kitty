import React from 'react'
import useLocalStorage from '~/hooks/useLocalStorage'

// Synchronous way (which is better to avoid extra HTTP requests)
const supportsWebpFormat = () => {
  const elem = document.createElement('canvas')

  if (elem.getContext && elem.getContext('2d')) {
    return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0
  }

  return false
}

const supportsAvifFormat = async () => {
  if (!window.createImageBitmap) return false

  const blob = await fetch(
    'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUEAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAF0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgS0AAAAAABNjb2xybmNseAACAAIAAIAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAGVtZGF0EgAKBzgAPtAgIAkyUBAAAPWc41TP///4gHBX9H8XVK7gGeDllq8TYARA+8Tfsv7L+zPE24eIoIzE0WhHbrqcrTK9VEgEG/hwgB5rdCbvP8g3KYPdV88CvPJnptgQ'
  ).then(r => r.blob())

  return createImageBitmap(blob).then(
    () => true,
    () => false
  )
}

const useImageSupport = () => {
  const [supportsAvif, setSupportsAvif] = useLocalStorage('sk.avif', false)
  const [supportsWebp, setSupportsWebp] = useLocalStorage('sk.webp', true)

  React.useEffect(() => {
    setSupportsWebp(supportsWebpFormat())
  }, [setSupportsWebp])

  React.useEffect(() => {
    if (!supportsAvif) supportsAvifFormat().then(setSupportsAvif)
  }, [supportsAvif, setSupportsAvif])

  return { supportsWebp, supportsAvif }
}

export default useImageSupport
