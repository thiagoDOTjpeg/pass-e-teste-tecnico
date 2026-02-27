<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return auth()->check()
        ? redirect()->route('dashboard')
        : Inertia::render('auth/login');
});

Route::middleware(['auth'])->group(function () {
    Route::inertia('/dashboard', 'dashboard')->name('dashboard');
});