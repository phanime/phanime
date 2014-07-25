<?php

class StaffMember extends Eloquent {


	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'staff_members';

	// Relationships

	public function anime()
	{
		return $this->belongsTo('Anime', 'anime_id', 'id');
	}	


}
