import { useState } from "react"
import type { EStatus } from "../constants/enums"

type Props = {
  status: EStatus
  onDropOrder: (orderId: string, newStatus: EStatus) => void
}


export const useDragAndDrop = ({ status, onDropOrder }: Props) => {
  const [isActive, setIsActive] = useState(false)

  const createElementForDragImage = (e: React.DragEvent) => {
    const target = e.currentTarget as HTMLElement
    const dragImage = target.cloneNode(true) as HTMLElement
    dragImage.style.position = "absolute"
    dragImage.style.width = "240px"
    document.body.appendChild(dragImage)

    e.dataTransfer.setDragImage(dragImage, 0, 0)
    setTimeout(() => {
      document.body.removeChild(dragImage)
    }, 0)
  }

  const handleDragStart = (e: React.DragEvent, orderId: string) => {
    e.dataTransfer.setData("orderId", orderId)
    createElementForDragImage(e)
  }

  const handleDropEnd = (e: React.DragEvent) => {
    e.preventDefault()
    const orderId = e.dataTransfer.getData("orderId")
    if (orderId) onDropOrder(orderId, status)

    setIsActive(false)
  }

  const handleOnDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsActive(true)
  }

  const handleOnDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsActive(false)
  }

  return {
    isActive,
    handleDragStart,
    handleDropEnd,
    handleOnDragOver,
    handleOnDragLeave
  }
} 