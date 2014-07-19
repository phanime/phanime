<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProducersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('producers', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('producer_logo');
			$table->string('name');
			$table->string('slug');
			$table->string('description');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('producers', function(Blueprint $table)
		{
			//
		});
	}

}
