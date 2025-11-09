import 'dart:convert';

// Modelo de datos que mapea la respuesta JSON de tu API de Node.js
class ProductModel {
  final String id;
  final String name;
  final String description;
  final String brand;
  final String category;
  final double price;
  final int countInStock;
  final String image;
  final double rating;
  final int numReviews;

  ProductModel({
    required this.id,
    required this.name,
    required this.description,
    required this.brand,
    required this.category,
    required this.price,
    required this.countInStock,
    required this.image,
    required this.rating,
    required this.numReviews,
  });

  // Factory constructor para crear un ProductModel desde un Map (JSON)
  factory ProductModel.fromJson(Map<String, dynamic> json) {
    return ProductModel(
      id: json['_id'] as String, // ID de MongoDB
      name: json['name'] as String,
      description: json['description'] as String,
      brand: json['brand'] as String,
      // Los precios y ratings son Numbers en Mongo, los convertimos a double en Dart
      price: (json['price'] as num).toDouble(),
      countInStock: json['countInStock'] as int,
      image:
          json['image'] as String? ??
          'https://placehold.co/600x400/CCCCCC/333333?text=Sin+Imagen',
      category: json['category'] as String,
      rating: (json['rating'] as num? ?? 0.0).toDouble(),
      numReviews: json['numReviews'] as int? ?? 0,
    );
  }
}
