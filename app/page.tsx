'use client'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addTask, Task } from "./types/types"
import { useForm } from "react-hook-form"

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
		<div>
			<h1>Task List</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input {...register("name")} />
				<button type="submit">Add Task</button>
			</form>
			<ul>
					{data.map((task, index) => {
						return 	<li key={index}>
							<p>{task.name} | {task.status}</p>
							<button onClick={() => onDelete(task.id)}>Delete</button>
							{task.status === "Todo" && <button onClick={() => onMarkComplete(task.id)}>Mark Completed</button>}
						</li>
					})}
				</ul>
		</div>
	);
}


