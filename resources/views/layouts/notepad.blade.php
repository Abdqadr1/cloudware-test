@extends('layouts.app')

@section('content')
<div class="container">
    <form class="row g-3 mb-3 justify-content-center align-items-end" method="POST" action="{{route('add-note')}}">
        @csrf
        @method('post')
        
         @error('note')
            <div class="col-12 text-center text-danger">
                {{$message}}
            </div>
        @enderror
        <div class="col-auto col-md-9">
            <label for="note" class="visually-hidden">Note</label>
            <textarea name="note" type="text" class="form-control" id="note" placeholder="note"></textarea>
        </div>
        <div class="col-auto">
            <button type="submit" class="btn btn-secondary">Add Note</button>
        </div>
    </form>
    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Note</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody class="striped">
    
    @forelse ($notes as $note)
        <tr>
            <td>{{$note->id}}</td>
            <td>{{$note->note}}</td>
            <td>
                <form action="{{route('delete-note', $note->id)}}" method="post">
                    @csrf
                    @method('delete')
                    <button class="btn btn-danger" type="submit">delete</button>
                </form>
            </td>
        </tr>
    @empty
        <tr><td colspan="3" class="text-center">No note at the moment</td></tr>
    @endforelse
  </tbody>
</table>
</div>
@endsection
