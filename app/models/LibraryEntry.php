<?php

class LibraryEntry extends Eloquent {


	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'library_entries';

	// Relationships

	public function anime()
	{
		return $this->belongsTo('Anime', 'anime_id', 'id');
	}

	public function user()
	{
		return $this->belongsTo('User', 'user_id', 'id');
	}	


}
