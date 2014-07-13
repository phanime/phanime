<?php

class AnimeController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$inputs = Input::all();
		$animes = Anime::all();

		if (array_key_exists('featured', $inputs) && $inputs['featured'] == true) {
			$animes = Anime::where('anime_featured', '=', 1)->get();
			$animes = $animes->toArray();
		} else if (array_key_exists('anime_slug', $inputs)) {

			$animes_before = Anime::with('episodes')->where('anime_slug', '=', $inputs['anime_slug'])->take(1)->get();
			$animes = [];

			foreach($animes_before as $animeb) {
				$anime = $animeb->toArray();
				$anime['episodes'] = $animeb->episodes->lists('id');
				$animes[] = $anime;
			}

		} else {
			$animes = Anime::all();
			$animes = $animes->toArray();
		}


		// Unserialize any strings
		for ($i = 0; $i < sizeof($animes); $i++) {
			$animes[$i]['anime_version'] = unserialize($animes[$i]['anime_version']);
		}

		return Response::json(array(
			'animes' => $animes),
			200
		);
	}


	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}


	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$anime = Anime::find($id);
		$episodes = $anime->episodes;
		$anime = $anime->toArray();


		// Unserialize any strings
		$anime['anime_version'] = unserialize($anime['anime_version']);

		$episodes = $episodes->toArray();

		// Encode the episodes into anime array how Ember.js likes it
		$anime['episodes'] = array();
		foreach($episodes as $episode) {
			$anime['episodes'][] = $episode['id'];
		}

		return Response::json(array(
			'anime' => $anime
			),
			200
		);

	}


	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		// Get all necessary data
		$anime = Anime::find($id);
		$inputs = Input::get('anime');

		Log::info(print_r($inputs, true));


		// Assume trusted member is doing an update, and let them update any property on the anime model
		$anime->anime_title = $inputs['anime_title'];
		$anime->anime_slug = $inputs['anime_slug'];
		$anime->anime_cover_image = $inputs['anime_cover_image'];
		$anime->anime_type = $inputs['anime_type'];
		$anime->anime_status = $inputs['anime_status'];
		$anime->anime_start_date = $inputs['anime_start_date'];
		$anime->anime_end_date = $inputs['anime_end_date'];
		$anime->anime_version = serialize($inputs['anime_version']); // This is the stupidest thing i'll do so far, promise
		$anime->age_rating = $inputs['age_rating'];
		$anime->anime_description = $inputs['anime_description'];
		$anime->anime_season_number = $inputs['anime_season_number'];
		$anime->anime_total_episodes = $inputs['anime_total_episodes'];
		$anime->anime_episode_duration = $inputs['anime_episode_duration'];
		$anime->anime_main_alternative_title = $inputs['anime_main_alternative_title'];
		$anime->anime_alternative_titles = $inputs['anime_alternative_titles'];
		$anime->anime_featured = $inputs['anime_featured'];

		// TODO
		// Run anime rating algorithm here.

		$anime->save();

		// Get the updated anime 
		$anime = Anime::find($id);
		$episodes = $anime->episodes;
		$anime = $anime->toArray();

		// Unserialize array 
		$anime['anime_version'] = unserialize($anime['anime_version']);

		// Encode the episodes into anime array how Ember.js likes it
		$anime['episodes'] = array();
		foreach($episodes as $episode) {
			$anime['episodes'][] = $episode['id'];
		}		


		return Response::json(array(
			'anime' => $anime
			),
			200
		);		

	}


	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}


}
