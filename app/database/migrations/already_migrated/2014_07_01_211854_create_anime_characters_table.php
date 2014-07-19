<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAnimeCharactersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('anime_characters', function(Blueprint $table)
		{
			$table->integer('anime_id')->unsigned();
			//$table->foreign('anime_id')->references('id')->on('anime');
			$table->integer('character_id')->unsigned();
			//$table->foreign('character_id')->references('id')->on('characters');
			$table->string('role');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('anime_people', function(Blueprint $table)
		{
			//
		});
	}

}
