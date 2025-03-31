<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\View\View;

class ChatterBlastController extends Controller
{
    public function startConversation(): JsonResponse
    {
        $conversation = new Conversation();
        $conversation->user_id = 1;
        $conversation->save();

        $conversationID = json_encode([
            "conversationId" => $conversation->id
        ]);

        $response = Http::withHeaders([
            "Accept" => "application/json",
            "Content-Type" => "application/json"
        ])
        ->withBody($conversationID)
        ->post("127.0.0.1:9001/conversation");

        return response()->json([
            $response,
            "conversationID" => $conversation->id
        ]);
    }

    public function continueConversation(Request $request) : JsonResponse {
        $request->validate([
            'prompt' => 'required'
        ]);

        $prompt = json_encode([
            "prompt" => $request->prompt
        ]);


        $response = Http::withHeaders([
            "User-Agent" => "Thunder Client (https://www.thunderclient.com)",
            "Accept" => "text/plain",
        ])
        ->withBody($prompt, "text/plain")
        ->post("127.0.0.1:9001/conversation/$request->conversation_id");

        // sleep(2);

        // $promise2 = Http::withHeaders([
        //     "User-Agent" => "Thunder Client (https://www.thunderclient.com)",
        //     "Accept" => "application/json"
        // ])
        // ->get("127.0.0.1:9001/conversation/$request->conversation_id");
        return response()->json([
            "response" => $response
        ]);
    }
}
