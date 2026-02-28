import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent, DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface DeleteTodoConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    todoTitle: string;
    loading?: boolean;
}

export default function DeleteTodoConfirmDialog({ open, onOpenChange, onConfirm, todoTitle, loading }: DeleteTodoConfirmDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Excluir Tarefa</DialogTitle>
                    <DialogDescription>
                        Tens certeza? A tarefa <strong>{todoTitle}</strong> será excluída permanentemente.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" disabled={loading}>Cancelar</Button>
                    </DialogClose>
                    <Button variant="destructive" onClick={onConfirm} disabled={loading}>
                        {loading ? "A excluir..." : "Confirmar"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}