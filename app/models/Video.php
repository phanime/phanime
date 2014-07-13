<?php

class Video extends Eloquent {


	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'videos';

	// Relationships

	public function episode()
	{
		return $this->belongsTo('Episode', 'episode_id', 'id');
	}

	public function user()
	{
		return $this->belongsTo('User', 'user_id', 'id');
	}	


}
