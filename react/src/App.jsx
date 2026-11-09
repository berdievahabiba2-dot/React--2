
import React, { useEffect, useRef, useState } from "react"

import { useTodo } from "./store/Todo"

import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import { Plus, Trash2, Pencil, Check } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

const App = () => {

  const {data,getData,addData,deleteData,editData,postImg,deleteImage,handleCompleted,} = useTodo()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])

  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  const [editUser, setEditUser] = useState({
    id: 0,
    name: "",
    description: "",
  })
  const [selectedUser, setSelectedUser] = useState(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    getData()
  }, [getData])

  async function handleAdd(event) {
    event.preventDefault()
    await addData({
      name,
      description,
      images,
    })
    setName("")
    setDescription("")
    setImages([])
    setOpen(false)
  }

  async function handleEdit(event) {
    event.preventDefault()
    await editData(editUser)
    setEditOpen(false)
  }

  async function handleDelete(id) {
    await deleteData(id)
  }

  async function handleAddImage(event) {
    const files = event.target.files

    if (files.length > 0 && selectedUser) {
      await postImg(files, selectedUser.id)
    }
    event.target.value = ""
  }

  async function handleDeleteImage(imageId) {
    await deleteImage(imageId)
  }

  return (
    <div className="min-h-screen bg-background p-6">

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button><Plus className="mr-2 h-4 w-4" />Add ToDo</Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={handleAdd}>
            <DialogHeader>
              <DialogTitle>Add New ToDo</DialogTitle>
              <DialogDescription>
                Name, Description ва Images-ро пур кунед.
              </DialogDescription>
            </DialogHeader>

            <FieldGroup className="my-5">
              <Field>
                <Label>Name</Label>
                <Input placeholder="Enter name"value={name}onChange={(e) => setName(e.target.value)}required/>
              </Field>
              <Field>
                <Label>Description</Label>
                <Input placeholder="Enter description"value={description}onChange={(e) => setDescription(e.target.value)}required/>
              </Field>
              <Field>
                <Label>Images</Label>
                <Input type="file"accept="image/*"multipleonChange={(e) => setImages(e.target.files)}/>
              </Field>
            </FieldGroup>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <form onSubmit={handleEdit}>
            <DialogHeader>
              <DialogTitle>Edit ToDo</DialogTitle>
              <DialogDescription>
                Маълумоти ToDo-ро тағйир диҳед.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup className="my-5">
              <Field>
                <Label>Name</Label>
                <Input
                  value={editUser.name}
                  onChange={(e) =>
                    setEditUser({
                      ...editUser,
                      name: e.target.value,
                    })}required/>
              </Field>
              <Field>
                <Label>Description</Label>
                <Input
                  value={editUser.description}
                  onChange={(e) =>
                    setEditUser({
                      ...editUser,
                      description: e.target.value,
                    })}required/>
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Update</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <input ref={fileInputRef} type="file" accept="image/*" multiple hidden onChange={handleAddImage}/>

      <div className="mt-8 overflow-x-auto rounded-xl border">
        <Table>
          <TableCaption>Рӯйхати ToDo-ҳо</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Images</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="w-64">
                    {item.images?.length > 0 ? (
                      <Carousel className="w-full">
                        <CarouselContent>
                          {item.images.map((img, index) => (
                            <CarouselItem key={img.id ?? index}>
                              <Card>
                                <CardContent className="flex flex-col items-center gap-3 p-3">
                                  <img src={`https://to-dos-api.softclub.tj/images/${img.imageName}`}className="h-40 w-full rounded-lg object-cover"/>
                                  <Button type="button"variant="destructive"size="sm" onClick={() =>handleDeleteImage(img.id)}>
                                    <Trash2 className="mr-2 h-4 w-4" />Delete Image</Button>
                                </CardContent>
                              </Card>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        {item.images.length > 1 && (
                          <>
                            <CarouselPrevious />
                            <CarouselNext />
                          </>
                        )}
                      </Carousel>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Расм нест
                      </p>
                    )}
                    <Button type="button"variant="outline"className="mt-3 w-full"onClick={() => {
                        setSelectedUser(item)
                        fileInputRef.current?.click()}}>
                      <Plus className="mr-2 h-4 w-4" />Add Image</Button>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <span
                    className={item.isCompleted? "rounded-full bg-green-100 px-3 py-1 text-green-700": "rounded-full bg-red-100 px-3 py-1 text-red-700"}>
                    {item.isCompleted ? "Active" : "Inactive"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="destructive"size="sm"onClick={() => handleDelete(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline"size="sm" onClick={() => {
                        setEditUser({
                          id: item.id,
                          name: item.name,
                          description: item.description,
                        })
                        setEditOpen(true)}}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant={item.isCompleted ? "default" : "outline"}size="sm" onClick={() => handleCompleted(item.id)}><Check className="mr-1 h-4 w-4" />Completed</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
export default App