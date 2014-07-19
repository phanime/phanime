<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEpisodesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('episodes', function(Blueprint $table)
		{
			$table->bigIncrements('id');
			$table->integer('user_id')->unsigned()->nullable();
			$table->foreign('user_id')->references('id')->on('users');
			$table->integer('anime_id')->unsigned();
			//$table->foreign('anime_id')->references('id')->on('anime');
			$table->string('name');
			$table->boolean('episode_multiple')->nullable();
			$table->integer('episode_number')->nullable();
			$table->integer('episode_number_other')->nullable();
			$table->string('episode_title')->nullable();
			$table->date('air_date')->nullable();
			$table->boolean('already_aired')->nullable();
			$table->string('episode_version')->nullable();
			$table->timestamps();
			$table->integer('post_id')->unsigned();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('episodes', function(Blueprint $table)
		{
			//
		});
	}

}
