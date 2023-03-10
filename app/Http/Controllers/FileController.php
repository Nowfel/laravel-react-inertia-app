<?php

namespace App\Http\Controllers;

use App\Models\File;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\StoreFileRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\UpdateFileRequest;
use App\Http\Resources\FileResourceCollection;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        return Inertia::render('Files/Index');
    }


    public function getFiles()
    {

        $userFiles = new FileResourceCollection(auth()->user()->files()->get());
        return Inertia::render('Files/ReadFile', [
            'files' => $userFiles
        ]);
        // return response()->json($userFiles);

    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request
        $validatedData = $request->validate([
            'file' => 'required|mimes:jpeg,png,jpg,pdf,docx|max:2048',
        ]);

        // Get the file from the request
        $file = $request->file('file');

        // Generate a unique file name
        $filename = uniqid() . '.' . $file->getClientOriginalExtension();

        // Store the file on the disk
        Storage::disk('public')->putFileAs('uploads', $file, $filename);

        // Create a new file upload record
        $fileUpload = new File();
        $fileUpload->filename = $filename;
        $fileUpload->url = $filename;
        $fileUpload->user_id = auth()->user()->id;
        $fileUpload->save();

        // Return a response with the file URL
        $url = Storage::disk('public')->url($filename);
        $data = ['url' => $url, 'filename' => $filename];
        return response()->json($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(File $file)
    {
        return Inertia::render('Files/ReadFile');
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $file = File::find($id);
        Storage::delete('public/uploads/' . $file->filename);
        $file->delete();
    }
}
