<?php

use App\Http\Controllers\TodoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/todos', [TodoController::class, 'store']);
Route::get('/todos', [TodoController::class, 'index']);
Route::delete('/todos/{id}', [TodoController::class, 'destroy']);
Route::get('/todos/{id}', [TodoController::class, 'show']);
Route::put('/todos/{id}', [TodoController::class, 'update']);
