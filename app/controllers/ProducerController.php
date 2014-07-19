<?php

class ProducerController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$ids = Input::get('ids');

		if ($ids) {
			$producers = Producer::whereIn('id', $ids)->get();
		} else {
			$producers = Producer::all();
		}

		return Response::json(array(
			'producers' => $producers),
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
		$inputs = Input::get('producer');

		$producer = new Producer;

		$producer->name = $inputs['name'];
		$producer->slug = $inputs['slug'];
		$producer->description = $inputs['description'];
		$producer->producer_logo = $inputs['producer_logo'];

		$producer->save();
		
		$producer_new = Producer::find($producer->id);

		return Response::json(array(
			'producer' => $producer_new
			),
			200
		);

	}


	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$producer = Producer::find($id);

		return Response::json(array(
			'producer' => $producer
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
