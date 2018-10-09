import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', () => {

  describe('a number', () => {

    function increment(currentState) {
      return currentState + 1;
    }

    it('is immutable', () => {
      let state = 42;
      //the state dosent change here becuse the state is immutable
      let nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });

  });

  describe('A List', () => {

    //produces a new list that is the old list and the 
    //new movie combined
    function addMovie(currentState, movie) {
      return currentState.push(movie);
      //the old state dose not change
    }

    it('is immutable', () => {
      let state = List.of('Trainspotting', '28 Days Later');
      let nextState = addMovie(state, 'Sunshine');

      expect(nextState).to.equal(List.of(
        'Trainspotting',
        '28 Days Later',
        'Sunshine'
      ));
      expect(state).to.equal(List.of(
        'Trainspotting',
        '28 Days Later'
      ));
    });

  });

  describe('a tree', () => {

    //there is an easier way to 'reach into' the nested 
    //data to produce an updated value
    // function addMovie(currentState, movie) {
    //   return currentState.set(
    //     'movies',
    //     currentState.get('movies').push(movie)
    //   );
    // }

    function addMovie(currentState, movie) {
        return currentState.update('movies', movies => movies.push(movie));
      }

    it('is immutable', () => {
      let state = Map({
        movies: List.of('Trainspotting', '28 Days Later')
      });
      //the same behaviour as before, extended to show how 
      //it works with nested data structures.
      let nextState = addMovie(state, 'Sunshine');

      expect(nextState).to.equal(Map({
        movies: List.of(
          'Trainspotting',
          '28 Days Later',
          'Sunshine'
        )
      }));
      expect(state).to.equal(Map({
        movies: List.of(
          'Trainspotting',
          '28 Days Later'
        )
      }));
    });

  });

});