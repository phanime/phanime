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
			$table->integer('anime_id')->unsigned()->nullable();
			$table->string('episode_name');
			$table->string('episode_multiple')->nullable();
			$table->integer('episode_number')->nullable();
			$table->integer('episode_number_other')->nullable();
			$table->string('episode_title')->nullable();
			$table->date('episode_air_date')->nullable();
			$table->string('episode_already_aired')->nullable();
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
