<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class Card extends Component
{
    public $title;
    public $content;
    public function __construct($title = 'Card Title', $content = '')
    {
        $this->title = $title;
        $this->content = $content;
    }
    public function attributes()
    {
        return $this->attributes->merge(['class' => 'card bg-base-100 shadow-xl']);
    }
    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.card.index');
    }
}
