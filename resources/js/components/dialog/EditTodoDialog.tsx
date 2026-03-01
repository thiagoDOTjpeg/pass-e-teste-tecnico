import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Todo } from "@/types";

interface EditTodoDialogProps {
    todo: Todo | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: (id: number, newTitle: string) => Promise<void>;
    loading: boolean;
}

export default function EditTodoDialog({ todo, open, onOpenChange, onConfirm, loading }: EditTodoDialogProps) {
    const [title, setTitle] = useState(todo?.title || "");

    const handleSave = async () => {
        if (!todo || !title.trim() || title === todo.title) {
            onOpenChange(false);
            return;
        }
        await onConfirm(todo.id, title);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Tarefa</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <Label htmlFor="title">Título</Label>
                    <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-2"
                        maxLength={120}
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                    <Button onClick={handleSave} disabled={loading || !title.trim()}>
                        {loading ? "Salvando..." : "Salvar alterações"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}