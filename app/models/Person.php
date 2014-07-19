<?php

class Person extends Eloquent {


	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'people';

	// Relationships

	public function animes()
	{
		return $this->belongsToMany('Anime', 'anime_people', 'person_id', 'anime_id');
	}	


}
