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
        Schema::create('images', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('path');
            // add class maybe?
            $table->timestamps();
        });

        // User
        Schema::create('user_images', function (Blueprint $table) {
            $table->foreignId('image_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
        });

        // Products
        Schema::create('product_images', function (Blueprint $table) {
            $table->foreignId('image_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
        });
        // Categories
        Schema::create('category_images', function (Blueprint $table) {
            $table->foreignId('image_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
        });
        // Brand
        Schema::create('brand_images', function (Blueprint $table) {
            $table->foreignId('image_id')->constrained()->onDelete('cascade');
            $table->foreignId('brand_id')->constrained()->onDelete('cascade');
        });
        // Products
        Schema::create('promo_images', function (Blueprint $table) {
            $table->foreignId('image_id')->constrained()->onDelete('cascade');
            $table->foreignId('promo_id')->constrained()->onDelete('cascade');
        });

        // Comments
        Schema::create('rating_images', function (Blueprint $table) {
            $table->foreignId('rating_id')->references('order_id')->on('ratings')->onDelete('cascade');
            $table->foreignId('image_id')->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_images');
        Schema::dropIfExists('product_images');
        Schema::dropIfExists('promo_images');
        Schema::dropIfExists('category_images');
        Schema::dropIfExists('brand_images');
        Schema::dropIfExists('rating_images');
        Schema::dropIfExists('images');
    }
};
