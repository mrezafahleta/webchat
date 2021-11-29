<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Chats;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function show(User $user)
    {
        $chats = Chats::where(
            fn ($q) => $q->where('sender_id', Auth::id())->where('recieve_id', $user->id)
        )->orWhere(
            fn ($q) => $q->where('sender_id', $user->id)->where('recieve_id', Auth::id())
        )->get();

        return inertia('Chats/Show', [
            'user' => $user,
            'chats' => $chats

        ]);
    }

    public function store(Request $request, User $user)
    {
        $request->validate([
            'message' => 'required'
        ]);

        $chat =  Auth::user()->chats()->create([
            // user id ini adalah wild card yg di dapatkan 
            'recieve_id' => $user->id,
            'message' => $request->message
        ]);

        broadcast(new MessageSent($chat))->toOthers();

        return back();
    }

    // public function showChat(User $user)
    // {

    //     return 
    // }
}
