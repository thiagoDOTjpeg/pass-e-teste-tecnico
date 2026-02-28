import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface TodoFiltersProps {
    checked: boolean;
    onCheckedChange: (val: boolean) => void;
}

export function TodoFilters({ checked, onCheckedChange }: TodoFiltersProps) {
    return (
        <div className="mb-12 flex items-center justify-end gap-2 border-b pb-8">
            <div className="flex items-center space-x-2 bg-secondary/50 px-3 py-1.5 rounded-full border">
                <Switch
                    id="completed-filter"
                    checked={checked}
                    onCheckedChange={onCheckedChange}
                />
                <Label htmlFor="completed-filter" className="text-xs font-medium cursor-pointer">
                    Ver apenas concluídas
                </Label>
            </div>
        </div>
    );
}