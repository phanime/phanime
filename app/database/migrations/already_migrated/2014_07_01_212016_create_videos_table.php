<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVideosTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('videos', function(Blueprint $table)
		{
			$table->bigIncrements('id');
			$table->integer('user_id')->unsigned()->nullable();
			$table->integer('episode_id')->unsigned()->nullable();
			$table->string('video_name');
			$table->string('video_id');
			$table->string('video_version')->nullable();
			$table->string('video_host');
			$table->integer('video_display_order')->unsigned()->nullable();
			$table->string('video_quality')->nullable();
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
		Schema::table('videos', function(Blueprint $table)
		{
			//
		});
	}

}
