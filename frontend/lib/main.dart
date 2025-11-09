// lib/main.dart
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:biye/features/cart/presentation/bloc/cart_bloc.dart';
import 'package:biye/features/cart/presentation/bloc/cart_event.dart';
import 'package:biye/features/home/presentation/home_screen.dart';
import 'package:biye/core/utils/deep_link_handler.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Inicializar Firebase
  //await Firebase.initializeApp();

  // Inicializar deep links
  DeepLinkHandler.initialize();

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        // CartBloc básico (por ahora, hasta crear EnhancedCartBloc)
        BlocProvider<CartBloc>(create: (context) => CartBloc()),
        // AuthBloc - comentado hasta que esté listo
        // BlocProvider<AuthBloc>(
        //   create: (context) => AuthBloc()..add(AuthStarted()),
        // ),
      ],
      child: MaterialApp(
        title: 'Biye',
        theme: ThemeData(primarySwatch: Colors.blue, useMaterial3: true),
        home: const MyHomePage(),
        onGenerateRoute: (RouteSettings settings) {
          if (settings.name?.startsWith('biye://') == true) {
            final paymentResult = DeepLinkHandler.parsePaymentResult(
              settings.name!,
            );
            return MaterialPageRoute(
              builder: (context) => PaymentResultScreen(result: paymentResult),
            );
          }
          return null;
        },
      ),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  void initState() {
    super.initState();

    // Configurar el callback para deep links
    DeepLinkHandler.setOnDeepLinkCallback((String deepLink) {
      final paymentResult = DeepLinkHandler.parsePaymentResult(deepLink);

      // Navegar a la pantalla de resultado de pago
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => PaymentResultScreen(result: paymentResult),
        ),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return const HomeScreen();
  }
}

// Pantalla para mostrar el resultado del pago
class PaymentResultScreen extends StatelessWidget {
  final PaymentResult result;

  const PaymentResultScreen({super.key, required this.result});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Resultado del Pago'),
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
      ),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(_getResultIcon(), size: 80, color: _getResultColor()),
            const SizedBox(height: 24),
            Text(
              _getResultTitle(),
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: _getResultColor(),
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 16),
            Text(
              _getResultMessage(),
              style: const TextStyle(fontSize: 16, color: Colors.grey),
              textAlign: TextAlign.center,
            ),
            if (result.paymentId != null) ...[
              const SizedBox(height: 24),
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.grey[100],
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  'ID de Pago: ${result.paymentId}',
                  style: const TextStyle(
                    fontSize: 14,
                    fontFamily: 'monospace',
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
            ],
            const SizedBox(height: 32),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {
                  // Regresar al home y limpiar el carrito si fue exitoso
                  if (result.isSuccess) {
                    context.read<CartBloc>().add(ClearCart());
                  }
                  Navigator.popUntil(context, (route) => route.isFirst);
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: _getResultColor(),
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                child: const Text(
                  'Continuar Comprando',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
                ),
              ),
            ),
            const SizedBox(height: 16),
            if (!result.isSuccess) ...[
              SizedBox(
                width: double.infinity,
                child: OutlinedButton(
                  onPressed: () {
                    Navigator.pop(context);
                  },
                  style: OutlinedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    side: BorderSide(color: _getResultColor()),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  child: Text(
                    'Intentar de Nuevo',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      color: _getResultColor(),
                    ),
                  ),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  IconData _getResultIcon() {
    switch (result.status) {
      case PaymentResultStatus.success:
        return Icons.check_circle;
      case PaymentResultStatus.failure:
        return Icons.error;
      case PaymentResultStatus.pending:
        return Icons.schedule;
      default:
        return Icons.help;
    }
  }

  Color _getResultColor() {
    switch (result.status) {
      case PaymentResultStatus.success:
        return Colors.green;
      case PaymentResultStatus.failure:
        return Colors.red;
      case PaymentResultStatus.pending:
        return Colors.orange;
      default:
        return Colors.grey;
    }
  }

  String _getResultTitle() {
    switch (result.status) {
      case PaymentResultStatus.success:
        return '¡Pago Exitoso!';
      case PaymentResultStatus.failure:
        return 'Pago Rechazado';
      case PaymentResultStatus.pending:
        return 'Pago Pendiente';
      default:
        return 'Estado Desconocido';
    }
  }

  String _getResultMessage() {
    switch (result.status) {
      case PaymentResultStatus.success:
        return 'Tu pago ha sido procesado correctamente. '
            'Recibirás un email de confirmación en breve.';
      case PaymentResultStatus.failure:
        return 'No se pudo procesar tu pago. '
            'Por favor, verifica tus datos e intenta nuevamente.';
      case PaymentResultStatus.pending:
        return 'Tu pago está siendo procesado. '
            'Te notificaremos cuando se complete.';
      default:
        return 'Ocurrió un error inesperado.';
    }
  }
}
