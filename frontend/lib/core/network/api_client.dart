import 'package:http/http.dart' as http;
import '../../../../core/constants/app_constants.dart';
import 'dart:convert';

// Cliente HTTP para todas las llamadas a la API.
class ApiClient {
  final http.Client _client = http.Client();
  final String _baseUrl = AppConstants.apiBaseUrl;

  Future<Map<String, dynamic>> post(String path, dynamic body) async {
    final uri = Uri.parse('$_baseUrl/$path');
    final response = await _client.post(
      uri,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(body),
    );

    if (response.statusCode == 200 || response.statusCode == 201) {
      return jsonDecode(response.body);
    } else {
      // Puedes manejar diferentes códigos de estado aquí
      throw Exception(
        'Failed to load data with status code: ${response.statusCode}',
      );
    }
  }
}
