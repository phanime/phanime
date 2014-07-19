<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePersonCharactersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('person_characters', function(Blueprint $table)
		{
			$table->integer('person_id')->unsigned();
			//$table->foreign('person_id')->references('id')->on('people');
			$table->integer('character_id')->unsigned();
			//$table->foreign('character_id')->references('id')->on('characters');
			$table->string('voice_acting_language');
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
