<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('username')->unique();
			$table->string('email')->unique();
			$table->string('gender');
			$table->string('custom_title');
			$table->string('password');
			$table->string('user_state');
			$table->integer('primary_role_id')->unsigned();
			$table->integer('register_date')->unsigned();
			$table->integer('last_activity')->unsigned();
			$table->integer('anime_library_watched_minutes')->unsigned();
			$table->integer('anime_library_count')->unsigned();
			$table->integer('user_id_old')->unsigned();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('users', function(Blueprint $table)
		{
			//
		});
	}

}
