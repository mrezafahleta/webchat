<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;



Route::middleware('auth')->group(function () {
    Route::get('/', HomeController::class);
    Route::get('/chat/{user:username}', [ChatController::class, 'show'])->name('show.chat');
    Route::post('/chat/{user:username}', [ChatController::class, 'store'])->name('store.chat');
});

require __DIR__ . '/auth.php';
