<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAnimeTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('anime', function(Blueprint $table)
		{
			$table->bigIncrements('id');
			$table->integer('user_id')->unsigned()->nullable();
			$table->string('anime_title');
			$table->string('anime_slug');
			$table->string('anime_cover_image')->nullable();
			$table->string('anime_type')->nullable();
			$table->string('anime_status')->nullable();
			$table->date('anime_start_date')->nullable();
			$table->date('anime_end_date')->nullable();
			$table->string('anime_version')->nullable();
			$table->string('age_rating')->nullable();
			$table->text('anime_description')->nullable();
			$table->integer('anime_season_number')->unsigned()->nullable();
			$table->integer('anime_total_episodes')->unsigned()->nullable();
			$table->integer('anime_episode_duration')->unsigned()->nullable();
			$table->string('anime_main_alternative_title')->nullable();
			$table->string('anime_alternative_titles')->nullable();
			$table->boolean('anime_featured')->nullable();
			$table->decimal('anime_rating', 6, 4)->nullable();
			$table->integer('anime_rating_count')->nullable();
			$table->integer('anime_rating_updated_at')->nullable();
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
		Schema::table('anime', function(Blueprint $table)
		{
			//
		});
	}

}
