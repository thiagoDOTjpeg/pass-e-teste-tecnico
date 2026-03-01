import { Head } from "@inertiajs/react";
import axios from "axios";
import type {ReactNode} from "react";
import { useEffect, useState} from "react";
import {toast} from "sonner";
import DeleteTodoConfirmDialog from "@/components/dialog/DeleteTodoConfirmDialog";
import {TodoFilters} from "@/components/todo/TodoFilters";
import {TodoForm} from "@/components/todo/TodoForm";
import {TodoList} from "@/components/todo/TodoList";
import {TodoPagination} from "@/components/todo/TodoPagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layout/AppLayout";
import type {Todo} from "@/types";
import type {PaginatedResponse, PaginationInfo} from "@/types/pagination";

export type FilterStatus = "all" | "completed" | "pending";

export default function Dashboard() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [perPage, setPerPage] = useState("10");
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "pending">("all");
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (): Promise<void> => {
      try {
        let url = `/api/todos?perPage=${perPage}&page=${currentPage}`;

        if (filterStatus === "completed") url += "&completed=true";
        if (filterStatus === "pending") url += "&completed=false";

        const response = await axios.get<PaginatedResponse<Todo>>(url, {
          signal: controller.signal
        });

        setTodos(response.data.data);
        setPagination(response.data);
      } catch (error) {
        if (axios.isCancel(error)) return;
        toast.error("Erro ao buscar tarefas");
      } finally {
        setIsLoading(false);
      }
    }
    void fetchData();

    return () => {
      controller.abort();
    }
  }, [currentPage, perPage, filterStatus]);

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
      toast("Tarefa adicionada com sucesso")
    } catch {
      toast("Ocorreu um erro ao salvar sua tarefa");
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
      toast("Tarefa atualizda com sucesso")
    } catch {
      toast("Erro ao atualizar status");
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
      toast("Erro ao apagar tarefa");
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
                  value={filterStatus}
                  onValueChange={(val: FilterStatus) => {
                    setFilterStatus(val);
                    setCurrentPage(1);
                  }}
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

Dashboard.layout = (page: ReactNode) => <AppLayout children={page} />;
