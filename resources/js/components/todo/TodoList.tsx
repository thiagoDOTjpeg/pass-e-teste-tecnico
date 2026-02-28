import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Todo } from "@/types";

interface TodoListProps {
    todos: Todo[];
    isLoading: boolean;
    onToggle: (id: number, status: boolean) => void;
    onDeleteRequest: (todo: Todo) => void;
}

export function TodoList({ todos, isLoading, onToggle, onDeleteRequest }: TodoListProps) {
    if (isLoading) return <p className="text-center text-gray-500">Carregando tarefas...</p>;

    if (todos.length === 0) {
        return <p className="text-center text-sm text-gray-400">Nenhuma tarefa encontrada.</p>;
    }

    return (
        <div className="space-y-4">
            {todos.map((todo) => (
                <div key={todo.id} className="flex items-center justify-between rounded-lg border p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <Checkbox
                            checked={todo.completed}
                            onCheckedChange={() => onToggle(todo.id, todo.completed)}
                        />
                        <span className={todo.completed ? "text-gray-400 line-through" : ""}>
              {todo.title}
            </span>
                    </div>
                    <Button variant="destructive" size="sm" onClick={() => onDeleteRequest(todo)}>
                        Excluir
                    </Button>
                </div>
            ))}
        </div>
    );
}