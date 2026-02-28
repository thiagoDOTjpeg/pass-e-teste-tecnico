import { Head } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import type { SyntheticEvent } from "react";
import DeleteTodoConfirmDialog from "@/components/dialog/DeleteTodoConfirmDialog";
import {TodoFilters} from "@/components/todo/TodoFilters";
import {TodoForm} from "@/components/todo/TodoForm";
import {TodoList} from "@/components/todo/TodoList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type {Todo} from "@/types";
import type {PaginatedResponse, PaginationInfo} from "@/types/pagination";
import {TodoPagination} from "@/components/todo/TodoPagination";
import AppLayout from "@/layout/AppLayout";

export default function Dashboard() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [perPage, setPerPage] = useState("10");
  const [onlyCompleted, setOnlyCompleted] = useState(false);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (): Promise<void> => {
      try {
        const response = await axios.get<PaginatedResponse<Todo>>(`/api/todos?perPage=${perPage}&page=${currentPage}&completed=${onlyCompleted}`, { signal: controller.signal });
        setTodos(response.data.data);
        setPagination(response.data);
      } catch (error){
        if(axios.isCancel(error)) return;

        alert("Ocorreu um erro inesperado ao buscar as tarefas");
      } finally {
        setIsLoading(false);
      }
    }
    void fetchData();

    return () => {
      controller.abort();
    }
  }, [currentPage, perPage, onlyCompleted]);

  const handlePerPageChange = (val: string) => {
    setPerPage(val);
    setCurrentPage(1);
  };

  const handleAddTodo = async (title: string) => {
    try {
      const response = await axios.post<Todo>("/api/todos", {
        title,
        completed: false
      });

      if (currentPage === 1) {
        setTodos((prevState) => {
          const updatedList = [response.data, ...prevState];

          if (updatedList.length > Number(perPage)) {
            return updatedList.slice(0, Number(perPage));
          }

          return updatedList;
        });
      } else {
        setCurrentPage(1);
      }
    } catch {
      alert("Ocorreu um erro ao salvar sua tarefa");
    }
  };

  const handleToggleTodo = async (id: number, currentStatus: boolean) => {
    try {
      await axios.put(`/api/todos/${id}`, { completed: !currentStatus });
      setTodos(
        todos.map((t) =>
          t.id === id ? { ...t, completed: !currentStatus } : t,
        ),
      );
    } catch {
      console.error("Erro ao atualizar status");
    }
  };

  const handleConfirmDelete = async () => {
    if (!todoToDelete) return;

    setIsDeleteLoading(true);
    try {
      await axios.delete(`/api/todos/${todoToDelete.id}`);
      setTodos(todos.filter(t => t.id !== todoToDelete.id));
      setTodoToDelete(null);
    } catch {
      alert("Erro ao apagar");
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return (
    <div>
      <Head title="Dashboard - To-Do List" />
      <div className="flex h-full flex-1 flex-col gap-4 py-12">
        <div className="mx-auto w-full max-w-4xl">
          <Card className="py-12 px-16">
            <CardHeader className="py-2">
              <CardTitle>Minhas Tarefas</CardTitle>
            </CardHeader>
            <CardContent>
              <TodoForm onAdd={handleAddTodo} />

              <TodoFilters
                  checked={onlyCompleted}
                  onCheckedChange={(val) => { setOnlyCompleted(val); setCurrentPage(1); }}
              />

              <TodoList
                  todos={todos}
                  isLoading={isLoading}
                  onToggle={handleToggleTodo}
                  onDeleteRequest={setTodoToDelete}
              />

              <TodoPagination
                  pagination={pagination}
                  currentPage={currentPage}
                  perPage={perPage}
                  onPageChange={setCurrentPage}
                  onPerPageChange={handlePerPageChange}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <DeleteTodoConfirmDialog
          open={!!todoToDelete}
          onOpenChange={(open) => !open && setTodoToDelete(null)}
          onConfirm={handleConfirmDelete}
          todoTitle={todoToDelete?.title || ""}
          loading={isDeleteLoading}
      />
    </div>
  );
}

Dashboard.layout = (page: React.ReactNode) => <AppLayout children={page} />;
