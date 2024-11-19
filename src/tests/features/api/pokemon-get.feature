@pokemon_get
Feature: Validación de la API Pokemon
  
  Validar API usando datos de un archivo Excel para asegurar que la información del Pokemon es correcta y que los tiempos de respuesta son aceptables

  Scenario: Validar Pokemon usando datos del archivo Excel
    Given la clave secreta encriptada
    And se leen los datos del archivo excel Datos-pruebas.xlsx
    When se realiza solicitudes GET al endpoint con ID o nombre del Pokemon
    Then se valida que la respuesta se correcta para el Pokemon
    And el tiempo de respuesta debe ser menor a 10s
    And se loguea la fecha y hora de finalización de la prueba