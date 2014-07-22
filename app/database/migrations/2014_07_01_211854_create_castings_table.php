<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCastingsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('castings', function(Blueprint $table)
		{
			$table->integer('person_id')->unsigned();
			//$table->foreign('person_id')->references('id')->on('people');
			$table->integer('character_id')->unsigned();
			//$table->foreign('character_id')->references('id')->on('characters');
			$table->integer('anime_id')->unsigned();
			//$table->foreign('anime_id')->references('id')->on('anime');
			$table->string('voice_acting_language');
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
		Schema::table('castings', function(Blueprint $table)
		{
			//
		});
	}

}
