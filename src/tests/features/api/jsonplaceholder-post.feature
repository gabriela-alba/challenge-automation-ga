@jsonplaceholder_post
Feature: Validación del endpoint POST JSONPlaceholder

  Scenario: Validar el endpoint POST con datos de prueba
    Given la clave secreta encriptada
    When se realiza una solicitud POST al endpoint JSONPlaceholder con los siguientes datos
      | userId | title    | body     |
      | 1      | Challenge| Monnet   |
    Then se valida que el código de respuesta sea 201
    And se valida que los datos enviados coincidan con los de la respuesta
    And se loguea la fecha y hora de finalización de la prueba