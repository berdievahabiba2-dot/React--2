
import React, { useState } from "react";
import { useTodo } from "./store/Todo";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Plus,
  Pencil,
  Trash2,
  Users,
  BriefcaseBusiness,
  UserPlus,
  Search,
  X,
} from "lucide-react";

const App = () => {
  const { data, addUser, deleteUser, editUser } = useTodo();

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    job: "",
  });

  const handleAddOpen = () => {
    setEditId(null);
    setForm({ name: "", job: "" });
    setOpen(true);
  };

  const handleEditOpen = (user) => {
    setEditId(user.id);
    setForm({
      name: user.name,
      job: user.job,
    });
    setOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.job.trim()) return;
    if (editId !== null) {
      editUser({
        id: editId,
        name: form.name.trim(),
        job: form.job.trim(),
      });
    } else {
      addUser({
        name: form.name.trim(),
        job: form.job.trim(),
      });
    }

    setOpen(false);
    setForm({ name: "", job: "" });
    setEditId(null);
  };

  const filteredData = data.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.job.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-purple-100 p-4 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 sm:text-4xl">User Management</h1>
          </div>
          <Button onClick={handleAddOpen}className="h-11 gap-2 rounded-xl bg-indigo-600 px-5 text-white"><Plus size={19} />Add User</Button>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white bg-white shadow-xl shadow-indigo-100/50">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search size={18}className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
              <Input
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 rounded-xl border-slate-200 pl-10 focus-visible:ring-indigo-500"/>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table className="w-full table-fixed">
              <TableHeader>
                <TableRow className="border-b border-slate-100 bg-slate-50 hover:bg-slate-50">
                  <TableHead className="w-[35%] px-6 py-5 font-bold text-slate-600">Name</TableHead>
                  <TableHead className="w-[30%] px-6 py-5 font-bold text-slate-600">Job</TableHead>
                  <TableHead className="w-[35%] px-6 py-5 text-right font-bold text-slate-600">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((user) => (
                    <TableRow
                      key={user.id}
                      className="border-b border-slate-100 transition-colors hover:bg-indigo-50/50">
                      <TableCell className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 font-bold uppercase text-white shadow-sm">
                            {user.name.charAt(0)}
                          </div>
                          <span className="truncate font-semibold text-slate-700">
                            {user.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-5">
                        <span className="inline-flex max-w-full truncate rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600">{user.job}</span>
                      </TableCell>
                      <TableCell className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditOpen(user)}
                            className="h-9 gap-1.5 rounded-lg border-indigo-200 text-indigo-600">
                            <Pencil size={15} />
                            <span className="hidden sm:inline">Edit</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteUser(user.id)}
                            className="h-9 gap-1.5 rounded-lg shadow-sm transition hover:bg-red-700">
                            <Trash2 size={15} />
                            <span className="hidden sm:inline">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="h-48 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="mb-3 rounded-full bg-slate-100 p-4 text-slate-400">
                          <Users size={30} /></div>
                        <h3 className="font-semibold text-slate-700">No users found</h3>
                        <p className="mt-1 text-sm text-slate-400"> Try adding a new user or changing your search.</p>
                      </div>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-2xl border-0 bg-white p-6 shadow-2xl sm:max-w-[425px]">
          <DialogHeader>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              {editId !== null ? (
                <Pencil size={23} />
              ) : (
                <UserPlus size={23} />
              )}
            </div>
            <DialogTitle className="text-xl font-bold text-slate-800">
              {editId !== null ? "Edit User" : "Add New User"}
            </DialogTitle>
            <p className="text-sm text-slate-500">
              {editId !== null
                ? "Update the user's information."
                : "Fill in the information to add a new user."}
            </p>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="mt-4 space-y-5">

            <div className="space-y-2">
              <Label className="font-semibold text-slate-700"> Name</Label>
              <Input
                placeholder="Enter your name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="h-11 rounded-xl border-slate-200 focus-visible:ring-indigo-500" required/>
            </div>
            <div className="space-y-2">
              <Label className="font-semibold text-slate-700">Job</Label>
              <Input
                placeholder="Enter your job"
                value={form.job}
                onChange={(e) =>
                  setForm({ ...form, job: e.target.value })
                }
                className="h-11 rounded-xl border-slate-200 focus-visible:ring-indigo-500"required/>
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="h-11 flex-1 rounded-xl">
                <X size={17} />
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-11 flex-1 gap-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700">
                {editId !== null ? (
                  <>
                    <Pencil size={17} />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    Add User
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default App;