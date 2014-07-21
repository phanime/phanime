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
			$animes_before = Anime::with('genres', 'episodes')->where('featured', '=', 1)->get();
			$animes = [];

			foreach($animes_before as $animeb) {
				$anime = $animeb->toArray();
				$anime['episodes'] = $animeb->episodes->lists('id');
				$anime['genres'] = $animeb->genres->lists('id');
				$animes[] = $anime;
			}

		} else if (array_key_exists('slug', $inputs)) {

			$animes_before = Anime::with('genres', 'episodes')->where('slug', '=', $inputs['slug'])->take(1)->get();
			$animes = [];

			foreach($animes_before as $animeb) {
				$anime = $animeb->toArray();
				$anime['episodes'] = $animeb->episodes->lists('id');
				$anime['genres'] = $animeb->genres->lists('id');
				$animes[] = $anime;
			}

		} else if (array_key_exists('search', $inputs)) {

			$animes = Anime::where('title', 'like', '%' . $inputs['search'] . '%')->get();

		} else {
			$animes = Anime::orderby('title', 'asc')->get();
			$animes = $animes->toArray();
		}


		// Unserialize any strings
		for ($i = 0; $i < sizeof($animes); $i++) {
			$animes[$i]['version'] = unserialize($animes[$i]['version']);
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
		$genres = $anime->genres;
		$anime = $anime->toArray();


		// Unserialize any strings
		$anime['version'] = unserialize($anime['version']);

		$episodes = $episodes->toArray();
		$genres = $genres->toArray();

		// Encode the episodes into anime array how Ember.js likes it
		$anime['episodes'] = array();
		foreach($episodes as $episode) {
			$anime['episodes'][] = $episode['id'];
		}

		// Encode the genres into anime array how ember.js likes it 
		$anime['genres'] = array();
		foreach($genres as $genre) {
			$anime['genres'][] = $genre['id'];
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

		//Log::info(print_r($inputs, true));


		// Assume trusted member is doing an update, and let them update any property on the anime model
		$anime->title = $inputs['title'];
		$anime->slug = $inputs['slug'];
		$anime->cover_image = $inputs['cover_image'];
		$anime->type = $inputs['type'];
		$anime->status = $inputs['status'];
		$anime->start_date = $inputs['start_date'];
		$anime->end_date = $inputs['end_date'];
		$anime->version = serialize($inputs['version']); // This is the stupidest thing i'll do so far, promise
		$anime->age_rating = $inputs['age_rating'];
		$anime->description = $inputs['description'];
		$anime->season_number = $inputs['season_number'];
		$anime->total_episodes = $inputs['total_episodes'];
		$anime->episode_duration = $inputs['episode_duration'];
		$anime->main_alternative_title = $inputs['main_alternative_title'];
		$anime->alternative_titles = $inputs['alternative_titles'];
		$anime->featured = $inputs['featured'];

		// TODO
		// Run anime rating algorithm here.

		$anime->save();

		// Get the updated anime 
		$anime = Anime::find($id);
		$episodes = $anime->episodes;
		$anime = $anime->toArray();

		// Unserialize array 
		$anime['version'] = unserialize($anime['version']);

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
