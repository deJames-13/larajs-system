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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('sku_code')->unique();
            $table->text('description');
            $table->text('specifications');
            $table->decimal('price', 8, 2);
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('stocks', function (Blueprint $table) {
            $table->string('product_sku_code')->primary();
            $table->foreign('product_sku_code')->references('sku_code')->on('products')->onDelete('cascade');
            $table->integer('quantity')->default(0);
        });

        Schema::create('customer_products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->integer('quantity');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_products');
        Schema::dropIfExists('stocks');
        Schema::dropIfExists('products');
    }
};
