<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAnimeProducersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('anime_producers', function(Blueprint $table)
		{
			$table->integer('anime_id')->unsigned();
			//$table->foreign('anime_id')->references('id')->on('anime');
			$table->integer('producer_id')->unsigned();
			//$table->foreign('producer_id')->references('id')->on('producers');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('anime_producers', function(Blueprint $table)
		{
			//
		});
	}

}
