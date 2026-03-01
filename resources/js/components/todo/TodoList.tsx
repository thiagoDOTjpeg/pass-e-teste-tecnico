import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
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
                <div key={todo.id} className="flex items-center justify-between rounded-lg border p-4 shadow-sm transition-all hover:bg-accent/5">
                    <div className="flex items-center gap-3">
                        <Checkbox
                            checked={todo.completed}
                            onCheckedChange={() => onToggle(todo.id, todo.completed)}
                        />
                        <div className="flex flex-col">
                            <span className={todo.completed ? "text-muted-foreground line-through" : "font-medium"}>
                                {todo.title}
                            </span>

                            <div className="mt-1 flex flex-wrap gap-2">
                                <Badge variant="outline" className="h-5 px-1.5 text-[10px] font-normal text-muted-foreground">
                                    Criada {formatDistanceToNow(new Date(todo.created_at), { addSuffix: true, locale: ptBR })}
                                </Badge>

                                {todo.updated_at !== todo.created_at && (
                                    <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-normal">
                                        Editada {formatDistanceToNow(new Date(todo.updated_at), { addSuffix: true, locale: ptBR })}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteRequest(todo)}
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                        Excluir
                    </Button>
                </div>
            ))}
        </div>
    );
}