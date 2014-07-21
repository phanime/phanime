<?php

class Producer extends Eloquent {


	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'producers';

	// Relationships

	public function anime()
	{
		return $this->belongsToMany('Anime', 'anime_producers', 'producer_id', 'anime_id');
	}	


}
