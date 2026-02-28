import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { PaginationInfo } from "@/types/pagination";

interface TodoPaginationProps {
    pagination: PaginationInfo | null;
    currentPage: number;
    perPage: string;
    onPageChange: (page: number) => void;
    onPerPageChange: (val: string) => void;
}

export function TodoPagination({
                                   pagination,
                                   currentPage,
                                   perPage,
                                   onPageChange,
                                   onPerPageChange
                               }: TodoPaginationProps) {
    if (!pagination) return null;

    return (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-4">
            <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground whitespace-nowrap">Linhas por página</span>
                <Select value={perPage} onValueChange={onPerPageChange}>
                    <SelectTrigger className="w-20">
                        <SelectValue placeholder={perPage} />
                    </SelectTrigger>
                    <SelectContent side="top" position="popper" align="end">
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {pagination.last_page > 1 && (
                <Pagination className="mx-0 w-auto">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage > 1) onPageChange(currentPage - 1);
                                }}
                                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>

                        <PaginationItem>
              <span className="text-sm font-medium">
                Página {currentPage} de {pagination.last_page}
              </span>
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage < pagination.last_page) onPageChange(currentPage + 1);
                                }}
                                className={currentPage === pagination.last_page ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
}