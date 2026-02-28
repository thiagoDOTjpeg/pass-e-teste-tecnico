import { Head } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import type { SyntheticEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Switch} from "@/components/ui/switch";
import type {Todo} from "@/types";
import type {PaginatedResponse, PaginationInfo} from "@/types/pagination";
import DeleteTodoConfirmDialog from "@/components/dialog/delete-todo-confirm-dialog";

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

  const handleAddTodo = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<Todo>("/api/todos", { title: newTodo, completed: false });
      setTodos((prevState) => [response.data, ...prevState]);
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
              <form onSubmit={handleAddTodo} className="mb-6 flex gap-4">
                <Input
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="O que precisa ser feito?"
                  className="flex-1"
                />
                <Button type="submit">Adicionar</Button>
              </form>

              <div className="mb-12 flex items-center justify-end gap-2 border-b pb-8">
                <div className="flex items-center space-x-2 bg-secondary/50 px-3 py-1.5 rounded-full border">
                  <Switch
                      id="completed-filter"
                      checked={onlyCompleted}
                      onCheckedChange={(val) => {
                        setOnlyCompleted(val);
                        setCurrentPage(1);
                      }}
                  />
                  <Label htmlFor="completed-filter" className="text-xs font-medium cursor-pointer">
                    Ver apenas concluídas
                  </Label>
                </div>
              </div>

              {isLoading ? (
                <p className="text-center text-gray-500">
                  Carregando tarefas...
                </p>
              ) : (
                <div className="space-y-4">
                  {todos.length === 0 && (
                    <p className="text-center text-sm text-gray-400">
                      Nenhuma tarefa pendente.
                    </p>
                  )}
                  {todos.map((todo) => (
                    <div
                      key={todo.id}
                      className="flex items-center justify-between rounded-lg border p-4 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={todo.completed}
                          onCheckedChange={() =>
                            handleToggleTodo(todo.id, todo.completed)
                          }
                        />
                        <span
                          className={
                            todo.completed ? "text-gray-400 line-through" : ""
                          }
                        >
                          {todo.title}
                        </span>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setTodoToDelete(todo)}
                      >
                        Excluir
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-4">

                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground whitespace-nowrap">Linhas por página</span>
                  <Select value={perPage} onValueChange={handlePerPageChange}>
                    <SelectTrigger className="w-17.5">
                      <SelectValue placeholder={perPage} />
                    </SelectTrigger>
                    <SelectContent side="top" position="popper" align="end" >
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {pagination && pagination.last_page > 1 && (
                    <Pagination className="mx-0 w-auto">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                              href="#"
                              onClick={(e) => { e.preventDefault(); if (currentPage > 1) setCurrentPage(currentPage - 1); }}
                              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          />
                        </PaginationItem>
                        <PaginationItem>
                          <span className="text-sm font-medium">
                            {currentPage} / {pagination.last_page}
                          </span>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext
                              href="#"
                              onClick={(e) => { e.preventDefault(); if (currentPage < pagination.last_page) setCurrentPage(currentPage + 1); }}
                              className={currentPage === pagination.last_page ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                )}
              </div>
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
