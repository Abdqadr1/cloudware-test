<?php

use App\Http\Controllers\MyController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/notepad', [MyController::class, 'getNotes'])->name('notepad');
Route::post('/notepad', [MyController::class, 'addNote'])->name('add-note');
Route::delete('/notepad/{id}', [MyController::class, 'deleteNote'])->name('delete-note');

Route::get('/weather', [MyController::class, 'weather'])->name('weather');

Route::view('/alarm', 'layouts.alarm')->name('alarm');
Route::view('/bank', 'layouts.bank')->name('bank');
