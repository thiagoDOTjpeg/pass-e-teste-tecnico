import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import type {FilterStatus} from "@/pages/Dashboard";

interface TodoFiltersProps {
    value: FilterStatus;
    onValueChange: (val: FilterStatus) => void;
}

export function TodoFilters({ value, onValueChange }: TodoFiltersProps) {
    return (
        <div className="mb-8 flex items-center justify-end gap-4 border-b pb-6">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Filtrar por:
      </span>
            <Select value={value} onValueChange={onValueChange}>
                <SelectTrigger className="w-45 h-9">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Todas as tarefas</SelectItem>
                    <SelectItem value="pending">Pendentes</SelectItem>
                    <SelectItem value="completed">Concluídas</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}