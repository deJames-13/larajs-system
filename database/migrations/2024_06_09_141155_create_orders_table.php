<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $shipping_types = ['standard', 'express', 'priority'];
        $shipping_costs = [50, 80, 150];
        $statuses = ['pending', 'processing', 'shipping', 'completed', 'cancelled'];


        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('shipping_address');
            $table->enum('shipping_type', ['standard', 'express', 'priority'])->default('standard');
            $table->integer('shipping_cost')->default(50);
            $table->enum('status', ['pending', 'processing', 'shipping', 'completed', 'cancelled'])->default('pending');
            $table->date('paid_date')->nullable();


            $table->timestamps();
            $table->softDeletes();
        });

        // pivot table for order and products
        Schema::create('order_products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->integer('quantity');
            $table->timestamps();
        });
        Schema::create('ratings', function (Blueprint $table) {
            $table->foreignId('order_id')->primary()->constrained()->onDelete('cascade');
            $table->tinyInteger('rating');
            $table->string('title')->nullable();
            $table->string('review')->nullable();
            $table->string('status')->nullable();
            $table->boolean('is_show_user')->nullable();
            $table->string('image_path')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ratings');
        Schema::dropIfExists('order_products');
        Schema::dropIfExists('orders');
    }
};
