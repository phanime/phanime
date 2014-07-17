<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAnimeGenresTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('anime_genres', function(Blueprint $table)
		{
			$table->integer('anime_id')->unsigned();
			$table->integer('genre_id')->unsigned();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('anime_genres', function(Blueprint $table)
		{
			//
		});
	}

}
