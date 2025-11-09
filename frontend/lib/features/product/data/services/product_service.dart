import 'package:http/http.dart' as http;
import 'dart:convert';
import '../models/product_model.dart'; // Importación corregida a product_model.dart

// Servicio encargado de interactuar con la API de productos de Node.js
class ProductService {
  // CRÍTICO: Usa la misma URL base que configuraste en MercadoPagoService
  static const String _backendUrl =
      "https://shanae-shearless-rakishly.ngrok-free.dev";
  static const String _apiPath = "/api/v1/products";

  /// Obtiene la lista de todos los productos desde el backend.
  Future<List<ProductModel>> fetchProducts() async {
    try {
      final response = await http.get(
        Uri.parse("$_backendUrl$_apiPath"),
        headers: {'Content-Type': 'application/json'},
      );

      final responseData = json.decode(response.body);

      if (response.statusCode == 200 && responseData['success'] == true) {
        // La API de Node devuelve la lista en la clave 'data'
        final List<dynamic> productsJson = responseData['data'];

        // Mapea cada JSON a un objeto ProductModel
        return productsJson.map((json) => ProductModel.fromJson(json)).toList();
      } else {
        print(
          'Error del backend (${response.statusCode}): ${responseData['message']}',
        );
        // Devuelve una lista vacía en caso de error
        return [];
      }
    } catch (e) {
      print('Error de red al obtener productos: $e');
      return []; // Devuelve una lista vacía en caso de excepción de red
    }
  }

  // Aquí se agregarían otros métodos: fetchProductById, createProduct (protegida), etc.
}
