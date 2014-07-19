<?php

class Genre extends Eloquent {


	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'genres';
	public $timestamps = false;

	// Relationships

	public function animes()
	{
		return $this->belongsToMany('Anime', 'anime_genres', 'genre_id', 'anime_id');
	}	


}
