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

        Schema::create('promos', function (Blueprint $table) {
            $promo_for = ['product', 'order', 'shipping'];
            $promo_types = ['percentage', 'fixed'];

            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->integer('discount');
            $table->enum('promo_type', $promo_types)->default('percentage');
            $table->enum('promo_for', $promo_for)->default('product');

            $table->text('description')->nullable();
            $table->dateTime('start_date')->nullable();
            $table->dateTime('end_date')->nullable();
            $table->string('image')->nullable();

            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('promo_products', function (Blueprint $table) {
            $table->foreignId('promo_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promo_products');
        Schema::dropIfExists('promos');
    }
};
