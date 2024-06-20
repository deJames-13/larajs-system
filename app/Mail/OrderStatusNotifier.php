<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Queue\SerializesModels;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Mail\Mailables\Envelope;
use App\Http\Resources\OrderResource;
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
        $order->load(['products', 'customer']);
        $orderResource = (new OrderResource($order))->toArray(request());

        $this->orderId = $orderResource['id'];
        $this->status = $orderResource['status'];
        $this->fullname = $orderResource['customer']['fullname'];
        $this->subtotal = $orderResource['total'];
        $this->total = $orderResource['total'];

        Debugbar::info([
            $orderResource
        ]);
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
            with: [
                'orderId' => $this->orderId,
                'status' => $this->status,
                'fullname' => $this->fullname,
                'subtotal' => $this->subtotal,
                'total' => $this->total,
            ],
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
