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
			$table->integer('anime_id')->unsigned();
			$table->string('library_entry_anime_name');
			$table->integer('library_entry_episodes_seen')->unsigned()->nullable();
			$table->string('library_entry_status')->nullable();
			$table->string('library_entry_private')->nullable();
			$table->string('library_entry_watch_priority')->nullable();
			$table->integer('library_entry_score')->unsigned()->nullable();
			$table->string('library_entry_comments')->nullable();
			$table->integer('library_entry_rewatched_count')->unsigned();
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
