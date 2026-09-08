'use client'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addTask, Task } from "./types/types"
import { useForm } from "react-hook-form"
import { Trash2, Check } from "lucide-react";

export default function Home() {

	const NEXT_PUBLIC_BASE_URL=process.env.NEXT_PUBLIC_BASE_URL	
	const getTasks = async (): Promise<Task[]> => {
		console.log(NEXT_PUBLIC_BASE_URL)
		const res: Response = await fetch(`${NEXT_PUBLIC_BASE_URL}/task`)
		if (!res.ok) throw new Error("Something when wrong!")
		return res.json()
	}

	const addTasks = async (data: addTask): Promise<Task> => {
		const res: Response = await fetch(`${NEXT_PUBLIC_BASE_URL}/task`, {
			method: "POST",
			headers: {"Content-type": "application/json"},
			body: JSON.stringify(data)
		})
		if (!res.ok) throw new Error("Something when wrong!")
		return res.json()
	} 

	const deleteTask = async (id: string): Promise<void> => {
		const res: Response = await fetch(`${NEXT_PUBLIC_BASE_URL}/task/${id}`, {
			method: "DELETE"
		})
		if (!res.ok) throw new Error("Something when wrong!")
	}

	const markTask = async (id: string): Promise<Task> => {
		const res: Response = await fetch(`${NEXT_PUBLIC_BASE_URL}/task/${id}/done`, {
			method: "PATCH"
		})
		if (!res.ok) throw new Error("Something when wrong!")
		return res.json()
	}

	const { register, handleSubmit, reset } = useForm<addTask>();

	const {data} = useQuery({
		queryKey: ["tasks"],
		queryFn: getTasks
	})

	const queryClient = useQueryClient()

	const {mutate: mustateAdd} = useMutation({
		mutationFn: addTasks,
		onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
	})

	const {mutate: mustateDelete} = useMutation({
		mutationFn: deleteTask,
		onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
	})

	const {mutate: mutateUpdate} = useMutation({
		mutationFn: markTask,
		onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
	})

	const onSubmit = (data: addTask) => {
		mustateAdd(data)
		reset()
	}

	const onDelete = (id: string) => {
		mustateDelete(id)
	}

	const onMarkComplete = (id: string) => {
		mutateUpdate(id)
	}

	if (!data)
		return <p>{data}</p>


	return (
		<div className="max-w-md mx-auto mt-10 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
  <h1 className="text-lg font-semibold tracking-tight text-neutral-900 mb-6">
    Task List
  </h1>

  <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 mb-6">
    <input
      {...register("name")}
	  aria-label="input-task"
      placeholder="Add a new task..."
      className="flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      type="submit"
      className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition"
    >
      Add
    </button>
  </form>

  <div className="space-y-2">
    {!(data.length === 0) ?data.map((task, index) => (
      <div
        key={index}
        className="flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-3 hover:bg-neutral-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-neutral-900">
            {task.name}
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              task.status === "Todo"
                ? "bg-amber-100 text-amber-800"
                : "bg-emerald-100 text-emerald-800"
            }`}
          >
            {task.status}
          </span>
        </div>

        <div className="flex gap-1.5">
          {task.status === "Todo" && (
            <button
              onClick={() => onMarkComplete(task.id)}
              className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition"
            >
              <Check className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => onDelete(task.id)}
            className="flex h-8 w-8 items-center justify-center rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    )) : <p className="flex p-3 items-center justify-center rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition">You Have No Tasks Yet!</p>}
  </div>
</div>
	);
}


