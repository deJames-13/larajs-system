<?php

namespace App\View\Components\Layouts;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class AppLayout extends Component
{
    public $title;
    public $page;
    public $description;
    public $loading;

    public function __construct(
        $title = 'TuneTown',
        $description = 'Your music hub.',
        $page = ''
    ) {
        $this->title = $title;
        $this->description = $description;
        $this->page = $page;
        $this->loading = true;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.layouts.app');
    }
}
