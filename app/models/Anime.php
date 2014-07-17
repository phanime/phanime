<?php



class Anime extends Eloquent {



	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'anime';

	// Relationships

	public function episodes()
	{
		return $this->hasMany('Episode', 'anime_id', 'id');
	}

	public function user()
	{
		return $this->belongsTo('User', 'user_id', 'id');
	}	

	public function videos()
	{
		return $this->hasManyThrough('Video', 'Episode', 'anime_id', 'episode_id');
	}

	public function genres()
	{
		return $this->belongsToMany('Genre', 'anime_genres', 'anime_id', 'genre_id');
	}	

}
