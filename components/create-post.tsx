"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Crop, ImageIcon, Maximize2, PenSquare, RotateCcw, X, ZoomIn, ZoomOut } from "lucide-react"
import Image from "next/image"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CreatePost() {
  const [open, setOpen] = useState(false)
  const [content, setContent] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleSubmit = () => {
    // Here you would handle the post submission with image
    console.log("Post submitted:", { content, image })
    setContent("")
    setImage(null)
    setOpen(false)
    resetImageEditing()
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file to a server
      // For now, we'll create a local URL for preview
      const imageUrl = URL.createObjectURL(file)
      setImage(imageUrl)
    }
  }

  const removeImage = () => {
    setImage(null)
    resetImageEditing()
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const resetImageEditing = () => {
    setIsEditing(false)
    setZoom(1)
    setRotation(0)
  }

  const startEditing = () => {
    setIsEditing(true)
  }

  const applyImageEdits = useCallback(() => {
    if (!imageRef.current || !canvasRef.current || !image) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const img = imageRef.current
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Apply transformations
    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate((rotation * Math.PI) / 180)
    ctx.scale(zoom, zoom)
    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2)
    ctx.restore()

    // Convert to data URL
    const dataUrl = canvas.toDataURL("image/jpeg", 0.85)
    setImage(dataUrl)

    // Reset editing state
    setIsEditing(false)
    setZoom(1)
    setRotation(0)
  }, [image, zoom, rotation])

  const rotateImage = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 3))
  }

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5))
  }

  const resetZoom = () => {
    setZoom(1)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full justify-start gap-2">
            <PenSquare className="h-5 w-5" />
            Create Post
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px] bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
          <DialogHeader>
            <DialogTitle>Create a new post</DialogTitle>
            <DialogDescription>Share your thoughts with your fellow students</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              placeholder="What's on your mind?"
              className="min-h-[150px] resize-none bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            {image && !isEditing && (
              <div className="relative">
                <div className="relative aspect-video w-full overflow-hidden rounded-md">
                  <Image src={image || "/placeholder.svg"} alt="Uploaded image" fill className="object-cover" />
                </div>
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-sm"
                    onClick={startEditing}
                  >
                    <Crop className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-sm"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {image && isEditing && (
              <div className="space-y-4">
                <div className="relative aspect-video w-full overflow-hidden rounded-md bg-gray-100 dark:bg-gray-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      ref={imageRef}
                      src={image || "/placeholder.svg"}
                      alt="Edit preview"
                      className="max-h-full max-w-full transition-transform"
                      style={{
                        transform: `rotate(${rotation}deg) scale(${zoom})`,
                      }}
                    />
                  </div>
                </div>

                <Tabs defaultValue="transform" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="transform">Transform</TabsTrigger>
                    <TabsTrigger value="adjust">Adjust</TabsTrigger>
                  </TabsList>
                  <TabsContent value="transform" className="space-y-4 pt-4">
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm" onClick={rotateImage}>
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Rotate
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={zoomOut}>
                          <ZoomOut className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={resetZoom}>
                          <Maximize2 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={zoomIn}>
                          <ZoomIn className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Zoom</span>
                        <span className="text-sm">{Math.round(zoom * 100)}%</span>
                      </div>
                      <Slider
                        value={[zoom * 100]}
                        min={50}
                        max={300}
                        step={5}
                        onValueChange={(value) => setZoom(value[0] / 100)}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="adjust" className="pt-4">
                    <div className="flex h-20 items-center justify-center text-gray-500 dark:text-gray-400">
                      Advanced adjustments would go here
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={applyImageEdits}>Apply</Button>
                </div>
              </div>
            )}

            {!isEditing && (
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImageIcon className="h-4 w-4" />
                  Add Image
                </Button>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Supported formats: JPG, PNG, GIF (max 5MB)
                </span>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false)
                resetImageEditing()
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!content.trim() && !image}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} className="hidden" />
    </>
  )
}
