import type { SyntheticEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TodoFormProps {
    onAdd: (title: string) => Promise<void>;
}

export function TodoForm({ onAdd }: TodoFormProps) {
    const [value, setValue] = useState("");

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (!value.trim()) return;
        await onAdd(value);
        setValue("");
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 flex gap-4">
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="O que precisa ser feito?"
                className="flex-1"
            />
            <Button type="submit">Adicionar</Button>
        </form>
    );
}