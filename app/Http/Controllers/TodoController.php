<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use App\Models\Todo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function destroy($id): JsonResponse
    {
        $todo = Todo::findOrFail($id);
        $todo->delete();

        return response()->json(null, 204);
    }

    public function show($id): JsonResponse
    {
        $todo = Todo::findOrFail($id);

        return response()->json($todo);
    }

    public function store(StoreTodoRequest $request): JsonResponse
    {

        $todo = Todo::create($request->validated());

        return response()->json($todo, 201);
    }

    public function index(Request $request): JsonResponse
    {
        $perPage = min($request->query('perPage', 15), 50);

        $todos = Todo::query()
            ->when($request->filled('completed'), function ($query) use ($request) {
                return $query->where('completed', $request->boolean('completed'));
            })
            ->latest()
            ->paginate($perPage);

        return response()->json($todos, 200);
    }

    public function update(UpdateTodoRequest $request, $id): JsonResponse
    {
        $todo = Todo::findOrFail($id);
        $todo->update($request->validated());

        return response()->json($todo);
    }
}
