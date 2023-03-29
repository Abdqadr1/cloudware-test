<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;

class MyController extends Controller
{
    //

    public function addNote(Request $request)
    {
        $this->validate($request, [
            'note' => 'required|unique:notes,note|max:5000'
        ], ['note.unique' => 'The note already exists']);
        $note = Note::create(['note' => $request->note]);

        return redirect(route('notepad'));
    }

    public function getNotes(Request $request)
    {
        $notes = Note::all();

        return view('layouts.notepad', ['notes' => $notes]);
    }

    public function deleteNote(Request $request)
    {
        $id = $request->route('id');

        Note::find($id)->delete();

        return redirect(route('notepad'));
    }


    public function weather(Request $request)
    {
        return view('layouts.weather');
    }
}
