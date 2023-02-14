Feature: Pokemon search

  Scenario: I visit the pokemon search page and see pokemons listed by default
    When I go to the pokemon search page
    Then I see pokemons listed on the page

  Scenario: I search for a pokemon by name
    When I go to the pokemon search page
    And I search for "pikachu"
    Then I see "pikachu" in the results
