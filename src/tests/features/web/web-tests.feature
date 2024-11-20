@wiki_pokemon
Feature: Búsqueda y validación de Pokemon en Wikipedia

  Scenario: Búsqueda, validación y descarga de datos para todos los Pokemon
    Given la clave secreta encriptada
    When se realiza una búsqueda en Wikipedia para el Pokemon 
    And se loguea el nombre del dibujante
    And se descarga la imagen de la página de Wikipedia
    Then se valida que la imagen descargada sea menor a 500000 bytes

