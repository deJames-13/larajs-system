<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Queue\SerializesModels;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Contracts\Queue\ShouldQueue;

class OrderStatusNotifier extends Mailable implements ShouldQueue // for asynch emailing
{
    use Queueable, SerializesModels;


    public $orderId;
    public $status = '';
    public $fullname = '';
    public $shippingAddress = '';
    public $shippingType = '';
    public $shippingCost = '';
    public $createdAt = '';
    public $paidDate = '';
    public $subtotal = 0;
    public $total = 0;
    public function __construct($order)
    {
        // Refresh the model to ensure it has the latest data
        $order->refresh();
        $order->load(['products', 'customer', 'customer.info']);
        Debugbar::info($order);


        $this->orderId = $order->id;
        $this->status = $order->status;
        $this->fullname = $order->customer->info->fullname();
        $this->shippingAddress = $order->shipping_address;
        $this->shippingType = $order->shipping_type;
        $this->shippingCost = $order->shipping_cost;

        $this->subtotal = $order->products->sum(fn ($product) => $product->pivot->quantity * $product->price);
        $this->total = $this->subtotal + $this->shippingCost;

        $this->createdAt = $order->created_at;
        $this->paidDate = $order->paid_date;
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
                'shippingAddress' => $this->shippingAddress,
                'createdAt' => $this->createdAt,
                'paidDate' => $this->paidDate,
                'shippingType' => $this->shippingType,
                'shippingCost' => number_format($this->shippingCost, 2, '.', ','),
                'subtotal' => number_format($this->subtotal, 2, '.', ','),
                'total' => number_format($this->total, 2, '.', ','),
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
