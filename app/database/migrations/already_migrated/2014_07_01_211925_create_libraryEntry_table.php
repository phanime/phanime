<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatelibraryEntryTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('library_entries', function(Blueprint $table)
		{
			$table->bigIncrements('id');
			$table->integer('user_id')->unsigned();
			$table->foreign('user_id')->references('id')->on('users');
			$table->integer('anime_id')->unsigned();
			//$table->foreign('anime_id')->references('id')->on('anime');
			$table->string('anime_name');
			$table->integer('episodes_seen')->unsigned()->nullable();
			$table->string('status')->nullable();
			$table->boolean('private')->nullable();
			$table->string('watch_priority')->nullable();
			$table->integer('score')->unsigned()->nullable();
			$table->string('comments')->nullable();
			$table->integer('rewatched_count')->unsigned();
			$table->boolean('rewatching');
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
		Schema::table('library_entries', function(Blueprint $table)
		{
			//
		});
	}

}
