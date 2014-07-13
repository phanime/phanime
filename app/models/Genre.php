<?php

class Genre extends Eloquent {


	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'genres';

	// Relationships

	public function animes()
	{
		return $this->belongsToMany('Anime', 'animes_genres', 'genre_id', 'anime_id');
	}	


}
