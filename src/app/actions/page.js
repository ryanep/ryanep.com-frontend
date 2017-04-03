import fetch from 'isomorphic-fetch';
import * as api from '../constants/api';
import * as types from '../constants/action-types';

export function pageIsLoading(isLoading) {
	return {
		type: types.PAGE_IS_LOADING,
		isLoading: isLoading
	};
}

export function fetchPageSuccess(data) {
	return {
		type: types.PAGE_FETCH_SUCCESS,
		data: data
	};
}

export function fetchPageData(slug) {
	return (dispatch) => {
		dispatch(pageIsLoading(true));

		fetch(`${api.apiURL}/pages/?page=${slug}`, {
			method: 'get',
			headers: new Headers({
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			})
		})
		.then(handleErrors)
		.then(data => {
			console.log(data);
			dispatch(fetchPageSuccess(data.data));
			dispatch(pageIsLoading(false));
		})
		.catch(() => {
			throw new Error('Error whilst fetching data');
		});

	};
}

function handleErrors(response) {
    if (response.status >= 400) {
        throw new Error('Bad response from server');
    }
    return response.json();
}