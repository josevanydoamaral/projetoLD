<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class DreamWeaverController extends Controller
{
    protected $response;

    public function generate(Request $request) {
        $request->validate([
            "text_prompt" => 'required'
        ]);

        $headers = [
            "Accept" => "application/json"
        ];

        $body = json_encode([
            "text_prompt" => $request->text_prompt
        ]);

        $this->response = Http::withHeaders($headers)
        ->withBody($body)                          
        ->post("http://127.0.0.1:9002/generate");

        return $this->response;
    }

    public function status($job_id) {

        $headers = [
            "Accept" => "application/json"
        ];
        
        $this->response = Http::withHeaders($headers)
        ->get("http://127.0.0.1:9002/status/$job_id");
        
        return $this->response;
    }

    public function result($job_id) {
        $headers = [
            "Accept" => "application/json"
        ];

        $this->response = Http::withHeaders($headers)
        ->get("http://127.0.0.1:9002/result/$job_id");
        
        return $this->response;
    }

    public function upscale(Request $request) {
        $request->validate([
            "resource_id" => 'required'
        ]);

        $headers = [
            "Accept" => "application/json"
        ];

        $body = json_encode([
            "resource_id" => $request->resource_id
        ]);

        $this->response = Http::withHeaders($headers)
        ->withBody($body)                          
        ->post("http://127.0.0.1:9002/upscale");

        return $this->response;
    }

    public function zoomIn(Request $request) {
        $request->validate([
            "resource_id" => 'required'
        ]);

        $headers = [
            "Accept" => "application/json"
        ];

        $body = json_encode([
            "resource_id" => $request->resource_id
        ]);

        $this->response = Http::withHeaders($headers)
        ->withBody($body)                          
        ->post("http://127.0.0.1:9002/zoom/in");

        return $this->response;
    }

    public function zoomOut(Request $request) {
        $request->validate([
            "resource_id" => 'required'
        ]);

        $headers = [
            "Accept" => "application/json"
        ];

        $body = json_encode([
            "resource_id" => $request->resource_id
        ]);

        $this->response = Http::withHeaders($headers)
        ->withBody($body)                          
        ->post("http://127.0.0.1:9002/zoom/in");

        return $this->response;
    }

}
