<?php

class LibraryEntryController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$ids = Input::get('ids');
		$userId = Input::get('userId');

		if ($userId) {
			$libraryEntries = LibraryEntry::where('user_id', '=', $userId)->get();
		} else if ($ids) {
			$libraryEntries = LibraryEntry::whereIn('id', $ids)->get();
		} else {
			$libraryEntries = LibraryEntry::all();
		}

		return Response::json(array(
			'libraryEntries' => $libraryEntries->toArray()),
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
		$inputs = Input::get('libraryEntry');
		$libraryEntry = new LibraryEntry;

		$libraryEntry->status = $inputs['status'];
		$libraryEntry->anime_id = $inputs['anime_id'];
		$libraryEntry->user_id = $inputs['user_id'];

		// Defaults
		$libraryEntry->rewatched_count = 0;
		$libraryEntry->rewatching = 0; // false

		// TODO
		// Determine episodes seen
		// if status is completed and anime is on-going
		

		$libraryEntry->save();
		$id = $libraryEntry->id;

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
		$libraryEntries = LibraryEntry::find($id);

		return Response::json(array(
			'libraryEntry' => $libraryEntries
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
		//
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
