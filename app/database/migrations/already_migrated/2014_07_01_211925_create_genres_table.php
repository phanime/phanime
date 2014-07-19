<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGenresTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('genres', function(Blueprint $table)
		{
			$table->Increments('id');
			$table->string('name');
			$table->string('slug');
			$table->string('description')->nullable();
			$table->integer('anime_count')->unsigned();
			$table->integer('term_id')->unsigned();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('genres', function(Blueprint $table)
		{
			//
		});
	}

}
