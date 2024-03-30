<?php

namespace App\Domains\Projects\Controllers;

class ProjectsController
{
    public function index()
    {
        return inertia('Projects/Index');
    }
}
