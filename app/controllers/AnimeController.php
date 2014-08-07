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

			$animes_before = Anime::with('genres', 'episodes', 'castings', 'staffMembers')->where('slug', '=', $inputs['slug'])->take(1)->get();
			$animes = [];

			foreach($animes_before as $animeb) {
				$anime = $animeb->toArray();
				$anime['episodes'] = $animeb->episodes->lists('id');
				$anime['genres'] = $animeb->genres->lists('id');
				$anime['castings'] = $animeb->castings->lists('id');
				$anime['staff_members'] = $animeb->staffMembers->lists('id');
				$animes[] = $anime;
			}

		} else if (array_key_exists('query', $inputs)) {

			$animes = Anime::where('canonical_title', 'like', '%' . $inputs['query'] . '%')->get();

		} else {
			$animes = Anime::orderby('canonical_title', 'asc')->get();
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
		$inputs = Input::get('anime');

		$anime = new Anime;


		// Assume trusted member is doing an update, and let them update any property on the anime model
		$anime->canonical_title = $inputs['canonical_title'];
		$anime->romaji_title = $inputs['romaji_title'];
		$anime->english_title = $inputs['english_title'];
		$anime->japanese_title = $inputs['japanese_title'];
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
		$anime->title_synonyms = $inputs['title_synonyms'];


		$anime->save();

		$anime->genres()->sync($inputs['genres']);

		$id = $anime->id;

		return $this->show($id);		
	}


	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{

		$animebs = Anime::with('genres', 'episodes', 'castings', 'staffMembers')->where('id', '=', $id)->take(1)->get();
		$anime = $animebs->toArray();

		// It's only going to loop once, so we do a break right at the end (Although probably unncessary)
		foreach($animebs as $animeb) {
			$anime = $animeb->toArray();
			$anime['episodes'] = $animeb->episodes->lists('id');
			$anime['genres'] = $animeb->genres->lists('id');
			$anime['castings'] = $animeb->castings->lists('id');
			$anime['staff_members'] = $animeb->staffMembers->lists('id');


			$anime['version'] = unserialize($animeb->version);

			break;
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
		$anime->canonical_title = $inputs['canonical_title'];
		$anime->romaji_title = $inputs['romaji_title'];
		$anime->english_title = $inputs['english_title'];
		$anime->japanese_title = $inputs['japanese_title'];
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
		$anime->title_synonyms = $inputs['title_synonyms'];
		$anime->featured = $inputs['featured'];

		// TODO
		// Run anime rating algorithm here.

		$anime->save();

		$anime->genres()->sync($inputs['genres']);


		return $this->show($id);	
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
