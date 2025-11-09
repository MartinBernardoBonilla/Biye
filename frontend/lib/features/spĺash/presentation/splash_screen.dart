import 'package:flutter/material.dart';
import 'package:biye/features/home/presentation/home_screen.dart'; // Importa la pantalla de inicio
// Necesario para el efecto de desenfoque, aunque no lo usemos en este archivo, es una buena práctica tenerlo si se usa en la aplicación

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  // Un valor de opacidad que irá de 0 a 1
  double _opacity = 0.5;
  // Un valor de escala que irá de 0.5 a 1.0
  double _scale = 0.2;

  @override
  void initState() {
    super.initState();
    // Inicia la animación después de una pequeña demora
    Future.delayed(const Duration(milliseconds: 500), () {
      setState(() {
        _opacity = 1.0;
        _scale = 1.0;
      });
    });

    // Navega a la pantalla de inicio después de 3 segundos
    Future.delayed(const Duration(seconds: 3), () {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (context) => const HomeScreen()),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // Un fondo con gradiente para un mejor efecto
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Colors.yellow, Colors.lightBlueAccent],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: Center(
          child: TweenAnimationBuilder(
            tween: Tween<double>(begin: 0.5, end: 1.0),
            duration: const Duration(milliseconds: 1500),
            curve: Curves.easeOutCubic,
            builder: (context, scale, child) {
              return TweenAnimationBuilder(
                tween: Tween<double>(begin: 0.0, end: 1.0),
                duration: const Duration(milliseconds: 1500),
                curve: Curves.easeOut,
                builder: (context, opacity, child) {
                  return Opacity(
                    opacity: opacity,
                    child: Transform.scale(
                      scale: scale,
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          // El logo animado
                          const Icon(
                            Icons.monetization_on,
                            size: 100.0,
                            color: Colors.white,
                          ),
                          const SizedBox(height: 20),
                          // El nombre de la aplicación animado
                          const Text(
                            'Biye',
                            style: TextStyle(
                              fontSize: 50,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                },
              );
            },
          ),
        ),
      ),
    );
  }
}
