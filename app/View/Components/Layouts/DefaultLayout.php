<?php

namespace App\View\Components\Layouts;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class DefaultLayout extends Component
{
    /**
     * Create a new component instance.
     */
    public $title;
    public $page;
    public function __construct($title, $page)
    {
        $this->title = $title;
        $this->page = $page;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.layouts.default', ['page' => $this->page]);
    }
}
