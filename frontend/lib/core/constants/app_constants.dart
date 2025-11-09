import 'package:flutter/foundation.dart' show kIsWeb;

class AppConstants {
  static const String appName = 'Biye';
  static const String baseUrl = 'http://10.0.2.2:5000/api/v1';

  static String get apiBaseUrl {
    // Para emuladores de Android, usa 10.0.2.2.
    if (kIsWeb) {
      // Usa localhost para la web
      return 'http://localhost:5000/api/v1';
    }
    // Usa 10.0.2.2 para el emulador de Android
    return 'http://10.0.2.2:5000/api/v1';
  }
}
