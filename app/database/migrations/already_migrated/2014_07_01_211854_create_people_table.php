<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePeopleTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('people', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('cover_photo');
			$table->string('first_name');
			$table->string('last_name');
			$table->string('given_name');
			$table->string('family_name');
			$table->string('gender');
			$table->date('birth_date');
			$table->string('website');
			$table->string('birth_place');
			$table->string('blood_type');
			$table->text('other_info');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('people', function(Blueprint $table)
		{
			//
		});
	}

}
