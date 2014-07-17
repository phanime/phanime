<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/


Route::group(array('prefix' => 'api/v1'), function() {
	Route::resource('animes', 'AnimeController');
	Route::resource('users', 'UserController');
	Route::resource('episodes', 'EpisodeController');
	Route::resource('videos', 'VideoController');
	Route::resource('genres', 'GenreController');
	Route::resource('libraryEntries', 'LibraryEntryController');
	Route::post('session', 'UserController@authenticateUser');

	Route::post('oauth/token', function()
	{
		$response = AuthorizationServer::performAccessTokenFlow();
		$input = Input::all();

		if ($response->getStatusCode() === 200) {
			$response = json_decode($response->getContent());

			$response->user_id = Auth::getProvider()->retrieveByCredentials([
				'username' => $input['username']
			])->id;

			$response = Response::json($response);
		}

		return $response;
	});

});

Route::get('{ember?}', function() {
	return View::make('app');
})->where('ember', '.*');