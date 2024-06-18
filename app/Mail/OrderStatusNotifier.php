<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Queue\SerializesModels;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Contracts\Queue\ShouldQueue;

class OrderStatusNotifier extends Mailable
{
    use Queueable, SerializesModels;


    public $orderId;
    public $status = '';
    public $fullname = '';
    public $subtotal = 0;
    public $total = 0;
    public function __construct($order)
    {
        Debugbar::info($order);
        $this->orderId = $order->id;
        $this->status = $order->status;
        $this->fullname = $order->customer->fullname;
        $this->subtotal = $order->total;
        $this->total = $order->total;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Order Status Notifier',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.order-status',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
