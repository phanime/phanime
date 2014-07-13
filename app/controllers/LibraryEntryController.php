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

		if ($ids) {
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
