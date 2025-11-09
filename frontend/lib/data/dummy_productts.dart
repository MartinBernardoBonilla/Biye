// lib/data/dummy_products.dart

class Product {
  final String id;
  final String title;
  final String description;
  final double price;
  final String imageUrl;

  Product({
    required this.id,
    required this.title,
    required this.description,
    required this.price,
    required this.imageUrl,
  });
}

final List<Product> dummyProducts = [
  Product(
    id: 'p1',
    title: 'Billetera de Cuero',
    description:
        'Billetera de cuero genuino, con varios compartimentos para tarjetas y billetes.',
    price: 49.99,
    imageUrl:
        'https://cdn.pixabay.com/photo/2016/09/01/10/58/wallet-1636283_1280.jpg',
  ),
  Product(
    id: 'p2',
    title: 'Bolsa de Lona',
    description: 'Bolsa espaciosa de lona, ideal para el uso diario.',
    price: 89.50,
    imageUrl:
        'https://cdn.pixabay.com/photo/2017/04/10/22/28/bag-2220790_1280.jpg',
  ),
  Product(
    id: 'p3',
    title: 'Cartera Elegante',
    description:
        'Cartera de mano de diseño moderno, perfecta para cualquier ocasión.',
    price: 120.00,
    imageUrl:
        'https://cdn.pixabay.com/photo/2016/03/27/19/33/handbag-1284209_1280.jpg',
  ),
];
