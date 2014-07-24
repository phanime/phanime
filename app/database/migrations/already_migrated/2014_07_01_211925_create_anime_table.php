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
			$table->foreign('user_id')->references('id')->on('users');
			$table->string('romaji_title')->unique();
			$table->string('english_title');
			$table->string('japanese_title');
			$table->string('slug')->unique();
			$table->string('cover_image')->nullable();
			$table->string('banner_image')->nullable();
			$table->string('type')->nullable();
			$table->string('status')->nullable();
			$table->date('start_date')->nullable();
			$table->date('end_date')->nullable();
			$table->string('version')->nullable();
			$table->string('age_rating')->nullable();
			$table->text('description')->nullable();
			$table->integer('season_number')->unsigned()->nullable();
			$table->integer('total_episodes')->unsigned()->nullable();
			$table->integer('episode_duration')->unsigned()->nullable();
			$table->string('title_synonyms')->nullable();
			$table->boolean('featured')->nullable();
			$table->decimal('rating', 6, 4)->nullable();
			$table->integer('rating_count')->nullable();
			$table->integer('rating_updated_at')->nullable();
			$table->integer('views')->nullable();
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
