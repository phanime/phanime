<?php

class Character extends Eloquent {


	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'characters';

	// Relationships

	public function anime()
	{
		return $this->belongsToMany('Anime', 'anime_characters', 'character_id', 'anime_id');
	}	

	public function castings()
	{
		return $this->hasMany('Casting', 'character_id', 'id');
	}

}
