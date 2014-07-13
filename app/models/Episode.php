<?php


class Episode extends Eloquent {


	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'episodes';


	// Relationships

	public function anime()
	{
		return $this->belongsTo('Anime', 'anime_id', 'id');
	}

	public function user()
	{
		return $this->belongsTo('User', 'user_id', 'id');
	}	

	public function videos()
	{
		return $this->hasMany('Video', 'episode_id', 'id');
	}

}
