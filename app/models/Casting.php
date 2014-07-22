<?php

class Casting extends Eloquent {


	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'castings';

	// Relationships

	public function anime()
	{
		return $this->belongsTo('Anime', 'anime_id', 'id');
	}	


}
