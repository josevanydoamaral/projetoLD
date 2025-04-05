<?php

use App\Http\Controllers\ChatterBlastController;
use App\Http\Controllers\DreamWeaverController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


// CHATTERBLAST ROUTES
Route::post('/chat/conversation', [ChatterBlastController::class, 'startConversation']);
Route::post('/chat/conversation/{id}', [ChatterBlastController::class, 'continueConversation']);
Route::get('/index', [ChatterBlastController::class, 'index']);



// DREAMWEAVER ROUTES
Route::post('/image/generate', [DreamWeaverController::class, 'generate']);
Route::post('/image/zoom/in', [DreamWeaverController::class, 'zoomIn']);
Route::post('/image/zoom/out', [DreamWeaverController::class, 'zoomOut']);
Route::get('/status/{job_id}', [DreamWeaverController::class, 'status']);
Route::get('/result/{job_id}', [DreamWeaverController::class, 'result']);
